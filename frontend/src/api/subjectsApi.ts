import { SubjectModel } from "../model/SubjectModel";
import { DELETEHEADERS, GETHEADERS, HOSTNAME, POSTHEADERS, SUBJECTS, SUPERVISINGSUBJECTS, USERSUBJECTS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchSubjects() {
    return await fetch(HOSTNAME + SUBJECTS, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status))
        else
            return response.json()
    })
    .then((subjects: any[]) => {
        const returnedSubjects: SubjectModel[] = []
        for(const subject of subjects)
            returnedSubjects.push(new SubjectModel(subject))
    
        return returnedSubjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchSubject(id: number) {
    return await fetch(HOSTNAME + SUBJECTS + "/" + id, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((subjects: any[]) => {
        const returnedSubjects: SubjectModel[] = []
        for(const subject of subjects)
            returnedSubjects.push(new SubjectModel(subject))
    
        return returnedSubjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchUserSubjects(userID: number) {
    return await fetch(HOSTNAME + USERSUBJECTS + "/" + userID, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((userSubjects: any[]) => {
        const returnedSubjects: SubjectModel[] = []
        for(const subject of userSubjects)
            returnedSubjects.push(new SubjectModel(subject))
    
        return returnedSubjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchSupervisingSubjects(userID: number) {
    await fetch(HOSTNAME + SUPERVISINGSUBJECTS + "/" + userID, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((userSubjects: any[]) => {
        const returnedSubjects: SubjectModel[] = []
        for(const subject of userSubjects)
            returnedSubjects.push(new SubjectModel(subject))
    
        return returnedSubjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function postUserSubject(userID: number, subjectID: number) {
    await fetch(HOSTNAME + USERSUBJECTS, POSTHEADERS({userID, subjectID}))
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((value) => {
        return value
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function deleteUserSubject(userID: number, subjectID: number) {
    await fetch(HOSTNAME + USERSUBJECTS, DELETEHEADERS({userID, subjectID}))
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((value) => {
        return value
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}