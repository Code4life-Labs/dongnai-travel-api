import type { BaseMultipleQuery, BaseParams } from "../index.types";

export type MySQL_Course = {
  id: number;
  teacherId: number;
  name: string;
  price: number;
  periodDay: number;
};

export type MySQL_CourseResponseData = {
  id: number;
  teacher: MySQL_Teacher;
  name: string;
  price: number;
  periodDay: number;
};

export type MySQL_Teacher = {
  id: number;
  firstName: string;
  lastName: string;
};

///
/// DEFINE DATA STRUCTURE OF HTTP REQUEST
///
export type MySQL_CoursesQuery = BaseMultipleQuery;
export type MySQL_CoursesParams = BaseParams;

export type MySQL_TeachersQuery = BaseMultipleQuery;
export type MySQL_TeachersParams = BaseParams;