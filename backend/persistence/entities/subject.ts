export class Subject {
  id: number
  name: string
  description: string
  semester: number
  supervisorId: number 
  
  constructor(subject: any) {
    this.id = subject.id
    this.name = subject.name
    this.description = subject.description
    this.semester = subject.semester
    this.supervisorId = subject.supervisor_id
  }
}