import { IPostSubmission } from "../../interfaces/iSubmission";
import { User } from "../../model/user";
import { postSubmission } from "../fetchSubmissions";


interface prepareSubmissionInterface {
    user: User;
    pID: number;
    code: string;
  }

export async function prepareSubmission({user, pID, code}: prepareSubmissionInterface) {
    
    var date: Date | string = new Date()

    var year: number = date.getFullYear()
    var month: string = (date.getMonth() + 1).toString().padStart(2, '0')
    var day: string = date.getDate().toString().padStart(2, '0')
    
    var formattedDate: string = year + '-' + month + '-' + day

    var submission: IPostSubmission = {
        code: code,
        date: formattedDate,
        comment: "",
        submitee_id: user.id,
        project_id: pID
    }

    await postSubmission(submission)
}

