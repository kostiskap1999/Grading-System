import { ISubject } from "../interfaces/iSubject";
import { Subject } from "../model/subject";
import { GETHEADERS, HOSTNAME, SUBJECTS, SUPERVISINGSUBJECTS, USERSUBJECTS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchSubjects() {
    return await fetch(HOSTNAME + SUBJECTS, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status))
        else
            return response.json()
    })
    .then((subjects: ISubject[]) => {
        const returnedSubjects: Subject[] = []
        for(const subject of subjects)
            returnedSubjects.push(new Subject(subject))
    
        return returnedSubjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchSubject(id: number) {
    return await fetch(HOSTNAME + SUBJECTS + "/" + id, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status));
        else
            return response.json();
    })
    .then((subjects: ISubject[]) => {
        const returnedSubjects: Subject[] = []
        for(const subject of subjects)
            returnedSubjects.push(new Subject(subject))
    
        return returnedSubjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchUserSubjects(userID: number) {
    return await fetch(HOSTNAME + USERSUBJECTS + "/" + userID, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status));
        else
            return response.json();
    })
    .then((userSubjects: ISubject[]) => {
        const returnedSubjects: Subject[] = []
        for(const subject of userSubjects)
            returnedSubjects.push(new Subject(subject))
    
        return returnedSubjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchSupervisingSubjects(userID: number) {
    await fetch(HOSTNAME + SUPERVISINGSUBJECTS + "/" + userID, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status));
        else
            return response.json();
    })
    .then((userSubjects: ISubject[]) => {
        const returnedSubjects: Subject[] = []
        for(const subject of userSubjects)
            returnedSubjects.push(new Subject(subject))
    
        return returnedSubjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}
