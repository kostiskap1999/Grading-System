import { SubjectModel } from "../model/SubjectModel";
import { UserModel } from '../model/UserModel';
import { DELETEHEADERS, GETHEADERS, HOSTNAME, PATCHHEADERS, POSTHEADERS, SUBJECTS, SUBJECTUSERS, SUPERVISINGSUBJECTS, USERSUBJECTS } from "../parameters/database";
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
    })
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
    })
}

export async function postSubject(subject: SubjectModel) {
    return await fetch(HOSTNAME + SUBJECTS, POSTHEADERS(subject))
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
    })
}

export async function patchSubject(subject: SubjectModel) {
    return await fetch(HOSTNAME + SUBJECTS, PATCHHEADERS(subject))
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
    })
}

export async function deleteSubject(id: number) {
    return await fetch(HOSTNAME + SUBJECTS + "/" + id, DELETEHEADERS())
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
    })
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
    })
}

export async function postUserSubject(userId: number, subjectId: number) {
    return await fetch(HOSTNAME + USERSUBJECTS, POSTHEADERS({userId, subjectId}))
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
    })
}

export async function deleteUserSubject(userId: number, subjectId: number) {
    await fetch(HOSTNAME + USERSUBJECTS + "/" + userId + "/" + subjectId, DELETEHEADERS())
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
    })
}

export async function fetchSubjectUsers(subjectId: number) {
    return await fetch(HOSTNAME + SUBJECTUSERS + "/" + subjectId, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((subjectUsers: any[]) => {
        const returnedUsers: UserModel[] = []
        for(const user of subjectUsers)
            returnedUsers.push(new UserModel(user))
    
        return returnedUsers
    })
    .catch((error) => {
        errorHandling(error)
        return null
    })
}