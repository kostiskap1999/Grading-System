import { ITest } from "../interfaces/iTest";
import { Test } from "../model/test";
import { GETHEADERS, HOSTNAME, TESTS } from "../parameters/database";
import { errorHandling } from "../util/error";

import '../util/yymmdd';

export async function fetchTests(projectID: number) {
    return await fetch(HOSTNAME + TESTS + "/" + projectID, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((tests: ITest[]) => {
        const returnedTests: Test[] = []
        for(const test of tests)
            returnedTests.push(new Test(test))        
    
        return returnedTests
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}
