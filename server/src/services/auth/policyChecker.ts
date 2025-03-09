import fs from "fs";

// Import utils
import { StringUtils } from "src/utils/string";

let PolicyCollection: Record<string, any> = {};
type PolicyType = {
  type: string;
  actions: Array<string> | string;
  resources?: Array<string> | string;
};

if (Object.keys(PolicyCollection).length === 0) {
  PolicyCollection = JSON.parse(
    fs
      .readFileSync(StringUtils.getRootDirTo("secrets/policies.json"))
      .toString()
  );
}

export class PolicyCheker {
  checkPermission(role: string, resource: string, action: string) {
    if (!resource.includes(action.split(":")[0])) {
      console.warn("Resource and action are mismatch");
      return false;
    }

    let policies = PolicyCollection[role as keyof typeof PolicyCollection];

    let check = false,
      i = 0;
    for (const policy of policies) {
      if (
        // policy.resources is [...]
        (Array.isArray(policy.resources) && policy.resources.length > 0) ||
        // policy.resources isn't [""]
        (Array.isArray(policy.resources) &&
          policy.resources.length === 1 &&
          policy.resources[0] !== "") ||
        // policy.resources isn't "" or null or undefined
        policy.resources
      ) {
        check = this._checkResource(resource, policy);
        if (!check) {
          return check;
        }
      } else {
        if (policy.type === "allow") check = false;
        else check = true;
      }

      check = check && this._checkAction(action, policy);
      if (!check) return check;
      i++;
    }

    return check;
  }

  _checkResource(resource: string, policy: PolicyType) {
    // TO DO: check resource of user
    // Resource can be ["*"] or "*"
    // If type = deny, user isn't allowed access to entire resources
    // else if type = allow, user is allowed access to entire resources
    if (
      (Array.isArray(policy.resources) &&
        policy.resources.length === 1 &&
        policy.resources[0] === "*") ||
      policy.resources === "*"
    ) {
      if (policy.type === "deny") return false;
      return true;
    }

    // Resource is something else
    // TO DO: check resource
    let check = false;
    for (const _resource of policy.resources!) {
      // 1. _resource is expcilit
      if (_resource === resource) {
        check = true;
        break;
      }

      // 2. _resource is `resource:resouce_2:...:*` or maybe `*`
      // check if resource includes `_resource.substring(0, _resource.length - 2)`
      // if true, set check = true and break the loop
      // because that mean user is allowed to perform all resources to
      // this resources
      let // ["resource", "resource_1", "*"]
        allowedResources = _resource.split(":"),
        // ["resource", "resource_1", "resource_2"]
        requiredResources = resource.split(":"),
        i = 0;
      while (
        !check ||
        i < allowedResources.length ||
        i < requiredResources.length
      ) {
        if (
          allowedResources[i] === "*" ||
          (allowedResources[i] === requiredResources[i] &&
            (i < allowedResources.length || i < requiredResources.length))
        )
          check = true;
        else if (allowedResources[i] === requiredResources[i]) check = true;
        else if (allowedResources[i] !== requiredResources[i] && i === 0) break;
        else if (allowedResources[i] !== requiredResources[i] && i > 0) {
          check = false;
          break;
        }
        i++;
      }
    }

    if (policy.type === "deny") check = !check;

    return check;
  }

  _checkAction(action: string, policy: PolicyType) {
    // TO DO: check actions of user
    // Action can be ["*"] or "*"
    // If type = deny, user doesn't have any permissions
    // else if type = allow, user has entire permissions to do anything
    if (
      (Array.isArray(policy.actions) &&
        policy.actions.length === 1 &&
        policy.actions[0] === "*") ||
      policy.actions === "*"
    ) {
      if (policy.type === "deny") return false;
      else return true;
    }

    // Action is something else
    let check = false;
    for (const _action of policy.actions) {
      // 1. _action is expcilit
      if (_action === action) {
        check = true;
        break;
      }

      // 2. _action is resource:*
      // check if action includes `_action.substring(0, _action.length - 2)`
      // if true, set check = true and break the loop
      // because that mean user is allowed to perform all actions to
      // this resources
      else if (action.includes(_action.substring(0, _action.length - 2))) {
        check = true;
        break;
      }

      // 3. _action is resource:partOfAction*
      let [_, allowedActions] = _action.split(":");
      if (
        allowedActions[allowedActions.length - 1] === "*" ||
        allowedActions[0] === "*"
      ) {
        const partsOfAllowedAction = allowedActions.split("*");
        const partsOfRequiredAction = action.split(
          partsOfAllowedAction[0] || partsOfAllowedAction[1]
        );
        check = partsOfRequiredAction.length > 1;
        break;
      }

      // 4. _action is *, still happend
      // return `true` immediately
      if (_action === "*") return policy.type === "allow" && true;
    }

    // If check is true and policy type is deny
    // that mean user doesn't have any permission to do this action
    if (policy.type === "deny") return !check;

    return check;
  }
}
