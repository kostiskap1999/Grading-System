import { Submission } from "../model/submission";
import { GETHEADERS, HOSTNAME, SUBMISSIONS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchSubmissions() {
    const submissions: [] = await fetch(HOSTNAME + SUBMISSIONS, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    const returnedSubmissions: Submission[] = []
    for(const submission of submissions)
        returnedSubmissions.push(new Submission(submission))

    return returnedSubmissions
}
