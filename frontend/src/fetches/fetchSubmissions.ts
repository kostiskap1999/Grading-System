import { IPostSubmission, ISubmission } from "../interfaces/iSubmission";
import { Submission } from "../model/submission";
import { GETHEADERS, HOSTNAME, PATCHHEADERS, POSTHEADERS, SUBMISSIONS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchSubmissions(projectID: number) {
    return await fetch(HOSTNAME + SUBMISSIONS + "/" + projectID, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((submissions: ISubmission[]) => {
        const returnedSubmissions: Submission[] = []
        for(const submission of submissions)
            returnedSubmissions.push(new Submission(submission))
    
        return returnedSubmissions
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function postSubmission(submission: IPostSubmission) {
    const response: boolean | void = await fetch(HOSTNAME + SUBMISSIONS, POSTHEADERS(submission))
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status));
        else
            return response.ok;
    })
    .catch((error) => {
        errorHandling(error)
    });

    return response
}

export async function patchSubmission(submission: Submission) {
    const response: boolean | void = await fetch(HOSTNAME + SUBMISSIONS, PATCHHEADERS(submission))
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status));
        else
            return response.ok;
    })
    .catch((error) => {
        errorHandling(error)
    });

    return response
}