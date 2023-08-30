import { ISubjectExtraData } from "../interfaces/iSubject";
import { Subject } from "../model/subject";
import { errorHandling } from "../util/error";

export async function fetchSubjects() {
    const subjects: Subject[] = await fetch("mock/subjectsMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return subjects
}

export async function fetchSubjectsExtraData() {
    const subjectsExtraData: ISubjectExtraData[] = await fetch("mock/subjectsExtraDataMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return subjectsExtraData
}
