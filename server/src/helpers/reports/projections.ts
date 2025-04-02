// Import helpers
import { transformExcludedFieldsToStr } from "../other/field-transformers";

// Import types
import type { Query } from "mongoose";

export const ReportProjectionFields = {
  ExcludedFields: [""],
};

export function buildProjection(query: Query<any, any>) {
  // Populate types
  query.populate("reporter", "_id firstName lastName displayName avatar");
  query.populate("user");
  query.populate([
    {
      path: "place",
      populate: [
        {
          path: "types",
          select: "_id name value",
        },
      ],
    },
    {
      path: "blog",
      populate: [
        {
          path: "type",
          select: "_id name value",
        },
      ],
    },
  ]);
  query.populate("reason");
  query.populate("status");

  // Exclude some fields
  query.select("-description");

  return query;
}

export function buildFullProjection(query: Query<any, any>) {
  // Populate types
  query.populate("reporter", "_id firstName lastName displayName avatar");
  query.populate("user");
  query.populate([
    {
      path: "place",
      populate: [
        {
          path: "types",
          select: "_id name value",
        },
      ],
    },
    {
      path: "blog",
      populate: [
        {
          path: "type",
          select: "_id name value",
        },
      ],
    },
  ]);
  query.populate("reason");
  query.populate("status");

  // Exclude some fields
  query.select(
    transformExcludedFieldsToStr(ReportProjectionFields.ExcludedFields)
  );

  return query;
}

export function buildBriefProjection(query: Query<any, any>) {
  // Populate types
  query.populate("reporter", "_id firstName lastName displayName avatar");
  query.populate("user");
  query.populate([
    {
      path: "place",
      populate: [
        {
          path: "types",
          select: "_id name value",
        },
      ],
    },
    {
      path: "blog",
      populate: [
        {
          path: "type",
          select: "_id name value",
        },
      ],
    },
  ]);
  query.populate("reason");
  query.populate("status");

  // Exclude some fields
  // query.select(
  //   transformExcludedFieldsToStr(ReportProjectionFields.ExcludedFields)
  // );

  return query;
}
