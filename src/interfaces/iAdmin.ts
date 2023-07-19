import { Project } from "../model/project";
import { Subject } from "../model/subject";

export interface IAdmin {
    subjects: Subject[]
    projects: Project[]
}
