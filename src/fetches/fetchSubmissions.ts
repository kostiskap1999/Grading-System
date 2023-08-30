import { Submission } from "../model/submission";
import { errorHandling } from "../util/error";

export async function fetchSubmissions() {
    const submissions: Submission[] = await fetch("mock/submissionsMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return submissions
}
