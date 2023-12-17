export class Project {
  id: number
  name: string
  description: string
  deadline: Date
  
  constructor(project: any) {
    this.id = project.id
    this.name = project.name
    this.description = project.description
    this.deadline = project.deadline
  }
}