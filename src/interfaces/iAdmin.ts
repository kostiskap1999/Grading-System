import { IProfessor, IProfessorDefaults } from "./iProfessor";

export interface IAdmin extends IProfessor{}

export const IAdminDefaults = {...IProfessorDefaults}
