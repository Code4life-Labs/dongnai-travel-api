// Import types
import type { Policy, Policies } from "src/types/auth.types";

export class AuthChecker {
  policies!: Policies;
  settings!: any;

  constructor(policies: Policies, settings: any) {
    this.policies = policies;
    this.settings = settings;
  }

  checkUser(role: string) {
    return (
      role === this.settings.ROLES.USER ||
      this.checkEditor(role) ||
      this.checkAdmin(role)
    );
  }

  checkEditor(role: string) {
    return (
      role === this.settings.ROLES.EDITOR ||
      this.checkAdmin(role)
    );
  }

  checkAdmin(role: string) {
    return role === this.settings.ROLES.ADMIN;
  }

  /**
   * Check permission of a request depend on `resource` that this request want to
   * perform a `action` as `role` from corresponding policy. 
   * @param role 
   * @param resource 
   * @param action 
   * @returns 
   */
  checkPermission(role: string, resource: string, action: string) {
    if (!resource.includes(action.split(":")[0])) {
      console.warn("Resource and action are mismatch");
      return false;
    }

    let policies = this.policies[role];

    let check = false, i = 0;
    for(const policy of policies) {
      if (i === 0 && !this._checkResource(resource, policy)) {
        return check;
      }
      check = this._checkAction(action, policy);
      if (!check) return check;
      i++;
    }

    return check;
  }

  _checkResource(resource: string, policy: Policy) {
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
    for (const _resource of policy.resources) {
      // 1. _resource is expcilit
      if (_resource === resource) {
        check = true;
        break;
      };

      // 2. _resource is `resource:resouce_2:...:*` or maybe `*`
      // check if resource includes `_resource.substring(0, _resource.length - 2)`
      // if true, set check = true and break the loop
      // because that mean user is allowed to perform all resources to
      // this resources
      let
        // ["resource", "resource_1", "*"]
        allowedResources = _resource.split(":"),
        // ["resource", "resource_1", "resource_2"]
        requiredResources = resource.split(":"),
        i = 0;
      while (!check || i < allowedResources.length || i < requiredResources.length) {
        if (
          (allowedResources[i] === "*") ||
          (allowedResources[i] === requiredResources[i] && (i < allowedResources.length || i < requiredResources.length))
        )
          check = true;

        if (allowedResources[i] !== requiredResources[i])
          break;
        i++;
      }
    }

    if (policy.type === "deny") check = !check;

    return check;
  }

  _checkAction(action: string, policy: Policy) {
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
      };

      // 2. _action is resource:*
      // check if action includes `_action.substring(0, _action.length - 2)`
      // if true, set check = true and break the loop
      // because that mean user is allowed to perform all actions to
      // this resources
      if (action.includes(_action.substring(0, _action.length - 2))) {
        check = true;
        break;
      }

      // 3. _action is *, still happend
      // return `true` immediately
      if (_action === "*") return policy.type === "allow" && true;
    }

    // If check is true and policy type is deny
    // that mean user doesn't have any permission to do this action
    if (policy.type === "deny") return !check;

    return check;
  }
}