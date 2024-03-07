import { SubmissionModel } from "../model/SubmissionModel";
import { GETHEADERS, HOSTNAME, PUTHEADERS, POSTHEADERS, PROJECTUSERSUBMISSIONS, SUBMISSIONS, DELETEHEADERS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchSubmissions(projectId: number) {
    return await fetch(HOSTNAME + SUBMISSIONS + "/" + projectId, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((submissions: any[]) => {
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

export async function fetchProjectUserSubmission(projectId: number, userId: number) {
    return await fetch(HOSTNAME + SUBMISSIONS + "/" + projectId + "/" + userId, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((submission: any[]) => {
        if(submission[0])
            return new SubmissionModel(submission[0])
        else
            return null
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function postSubmission(submission: SubmissionModel) {
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
    const response: boolean | void = await fetch(HOSTNAME + SUBMISSIONS, PUTHEADERS(submission))
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

export async function deleteSubmission(id: number) {
    const response: boolean | void = await fetch(HOSTNAME + SUBMISSIONS + "/" + id, DELETEHEADERS())
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