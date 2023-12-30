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

export async function fetchUserSubjects(userId: number) {
    return await fetch(HOSTNAME + USERSUBJECTS + "/" + userId, GETHEADERS())
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

export async function fetchSupervisingSubjects(userId: number) {
    await fetch(HOSTNAME + SUPERVISINGSUBJECTS + "/" + userId, GETHEADERS())
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

export async function postUserSubject(userId: number, subjectId: number) {
    await fetch(HOSTNAME + USERSUBJECTS, POSTHEADERS({userId, subjectId}))
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

export async function deleteUserSubject(userId: number, subjectId: number) {
    await fetch(HOSTNAME + USERSUBJECTS, DELETEHEADERS({userId, subjectId}))
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