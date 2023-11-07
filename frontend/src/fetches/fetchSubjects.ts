import { Subject } from "../model/subject";
import { GETHEADERS, HOSTNAME, SUBJECTS, SUPERVISINGSUBJECTS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchSubjects() {
    const subjects: [] = await fetch(HOSTNAME + SUBJECTS, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    const returnedSubjects: Subject[] = []
    for(const subject of subjects)
        returnedSubjects.push(new Subject(subject))

    return returnedSubjects
}

export async function fetchUserSubjects(userID: number) {
    const userSubjects: [] = await fetch(HOSTNAME + SUBJECTS + "/" + userID, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });
    const returnedSubjects: Subject[] = []
    for(const subject of userSubjects)
        returnedSubjects.push(new Subject(subject))

    return returnedSubjects
}

export async function fetchSupervisingSubjects(userID: number) {
    const userSubjects: [] = await fetch(HOSTNAME + SUPERVISINGSUBJECTS + "/" + userID, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });
    const returnedSubjects: Subject[] = []
    for(const subject of userSubjects)
        returnedSubjects.push(new Subject(subject))

    return returnedSubjects
}
