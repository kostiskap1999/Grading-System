import { ISubmission } from "../interfaces/iSubmission";
import { SubmissionModel } from "../model/SubmissionModel";
import { GETHEADERS, HOSTNAME, PATCHHEADERS, POSTHEADERS, PROJECTUSERSUBMISSIONS, SUBMISSIONS } from "../parameters/database";
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
        const returnedSubmissions: SubmissionModel[] = []
        for(const submission of submissions)
            returnedSubmissions.push(new SubmissionModel(submission))
    
        return returnedSubmissions
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchProjectUserSubmission(projectID: number, userID: number) {
    return await fetch(HOSTNAME + SUBMISSIONS + "/" + projectID + "/" + userID, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((submission: ISubmission[]) => {
        return new SubmissionModel(submission[0])
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function postSubmission(submission: ISubmission) {
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

export async function patchSubmission(submission: SubmissionModel) {
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