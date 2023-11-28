var  config = require('../database/config');
const dbtoken = require('./token.js')
const util = require('util');

const query = util.promisify(config.query).bind(config);

const error = require('../errors/errorTypes');
const { errorHandling } = require('../errors/errorHandling');

async function getTests(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    var sqlSelect = `SELECT * FROM inputs_outputs_group WHERE project_id=${request.params.projectID};`;
    
    const testsGroupResult = await query(sqlSelect);
    
    const groupedJSON = [];

    if(testsGroupResult.length > 0){
      sqlSelect = `SELECT i.group_id, i.id AS input_id, i.name, i.code AS input_code, i.is_main_param AS input_is_main_param, o.id AS output_id, o.code AS output_code FROM inputs i LEFT JOIN outputs o ON i.group_id = o.group_id WHERE i.group_id IN (`;

      testsGroupResult.forEach((element, index) => {
        sqlSelect += element.id
        if(index != testsGroupResult.length-1){
          sqlSelect += `, `
        }
      });
      sqlSelect += `) ORDER BY i.group_id;`
      
      const testsResult = await query(sqlSelect)

      testsResult.sort((a, b) => a.group_id - b.group_id);

      let currentGroup = null;
      let currentGroupObject = null;

      var i = 0
      for (const testResult of testsResult) {
          if (testResult.group_id !== currentGroup) {
              currentGroupObject = {
                  main: testsGroupResult[i].main_function,
                  inputs: [],
                  output: {
                      id: testResult.output_id,
                      code: testResult.output_code,
                      group_id: testResult.group_id
                  }
              };
              groupedJSON.push(currentGroupObject);
              currentGroup = testResult.group_id;
          }

          currentGroupObject.inputs.push({
              id: testResult.input_id,
              name: testResult.name,
              code: testResult.input_code,
              is_main_param: testResult.input_is_main_param,
              group_id: testResult.group_id
          });
          i++
      }
    }

    util.promisify(config.end);
    return groupedJSON
    
  } catch (err) {
    errorHandling(err, "getProjectInputsOutputs")
  }
}

module.exports = {
  getTests: getTests,
}
