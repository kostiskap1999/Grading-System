import { IStudent, IStudentDefaults } from "./iStudent";

export interface IProfessor extends IStudent{}

export const IProfessorDefaults = {...IStudentDefaults}
