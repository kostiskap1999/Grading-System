import { TestModel } from "../model/TestModel";
import { GETHEADERS, HOSTNAME, TESTS } from "../parameters/database";
import { errorHandling } from "../util/error";

import '../util/yymmdd';

export async function fetchTests(projectId: number) {
    return await fetch(HOSTNAME + TESTS + "/" + projectId, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((tests: any[]) => {
        const returnedTests: TestModel[] = []
        for(const test of tests)
            returnedTests.push(new TestModel(test))        
    
        return returnedTests
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}
