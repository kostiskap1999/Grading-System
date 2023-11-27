var  config = require('../database/config');
const dbtoken = require('./token.js')
const util = require('util');

const query = util.promisify(config.query).bind(config);

const error = require('../errors/errorTypes');
const { errorHandling } = require('../errors/errorHandling');

async function getProjectInputsOutputs(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    var sqlSelect = `SELECT id FROM inputs_outputs_group WHERE project_id=${request.params.projectID};`;
    
    const result = await query(sqlSelect);
    
    const groupedResults = [];

    if(result.length > 0){
      sqlSelect = `SELECT i.group_id, i.id AS input_id, i.name, i.code AS input_code, o.id AS output_id, o.code AS output_code FROM inputs i LEFT JOIN outputs o ON i.group_id = o.group_id WHERE i.group_id IN (`;

      result.forEach((element, index) => {
        sqlSelect += element.id
        if(index != result.length-1){
          sqlSelect += `, `
        }
      });
      sqlSelect += `) ORDER BY i.group_id;`
      
      const inputOutputResult = await query(sqlSelect)

      inputOutputResult.sort((a, b) => a.group_id - b.group_id);

      let currentGroup = null;
      let currentGroupObject = null;

      for (const inputOutput of inputOutputResult) {
          if (inputOutput.group_id !== currentGroup) {
              currentGroupObject = {
                  inputs: [],
                  output: {
                      id: inputOutput.output_id,
                      name: inputOutput.name,
                      code: inputOutput.output_code,
                      group_id: inputOutput.group_id
                  }
              };
              groupedResults.push(currentGroupObject);
              currentGroup = inputOutput.group_id;
          }

          currentGroupObject.inputs.push({
              id: inputOutput.input_id,
              name: inputOutput.name,
              code: inputOutput.input_code,
              group_id: inputOutput.group_id
          });
      }
    }

    util.promisify(config.end);
    return groupedResults
    
  } catch (err) {
    errorHandling(err, "getProjectInputsOutputs")
  }
}

module.exports = {
  getProjectInputsOutputs: getProjectInputsOutputs,
}
