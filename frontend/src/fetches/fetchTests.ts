import { Test } from "../model/test";
import { GETHEADERS, HOSTNAME, TESTS } from "../parameters/database";
import { errorHandling } from "../util/error";

import '../util/yymmdd';

export async function fetchTests(projectID: number) {
    const tests: Test[] = await fetch(HOSTNAME + TESTS + "/" + projectID, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    const returnedTests: Test[] = []
    for(const test of tests)
        returnedTests.push(new Test(test))        

    return returnedTests
}
