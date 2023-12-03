var  config = require('../database/config')
const dbtoken = require('./token.js')
const util = require('util')

const query = util.promisify(config.query).bind(config)

const error = require('../errors/errorTypes')
const { errorHandling } = require('../errors/errorHandling')

async function getTests(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)

    var sql = `SELECT * FROM inputs_outputs_group WHERE project_id = ?`
    const projectID = [request.params.projectID]
    const testsGroupResult = await query(sql, projectID)
    
    const groupedJSON = []
    if(testsGroupResult.length > 0){
      const groupIDs = testsGroupResult.map(element => element.id)
      const sql = `
        SELECT i.group_id, i.id AS input_id, i.name, i.code AS input_code, 
               i.is_main_param AS input_is_main_param, o.id AS output_id, o.code AS output_code
        FROM inputs i
        LEFT JOIN outputs o ON i.group_id = o.group_id
        WHERE i.group_id IN (${groupIDs.map(() => '?').join(', ')})
        ORDER BY i.group_id
      `
      const tests = await query(sql, groupIDs)
      
      tests.sort((a, b) => a.group_id - b.group_id)
      let currentGroup = null
      let currentGroupObject = null

      var i = 0
      for (const test of tests) {
          if (test.group_id !== currentGroup) {
              currentGroupObject = {
                  main: testsGroupResult[i].main_function,
                  inputs: [],
                  output: {
                      id: test.output_id,
                      code: test.output_code,
                      group_id: test.group_id
                  }
              }
              groupedJSON.push(currentGroupObject)
              currentGroup = test.group_id
          }

          currentGroupObject.inputs.push({
              id: test.input_id,
              name: test.name,
              code: test.input_code,
              is_main_param: test.input_is_main_param,
              group_id: test.group_id
          })
          i++
      }
    }

    util.promisify(config.end)
    return groupedJSON
  } catch (err) {
    errorHandling(err, "getProjectInputsOutputs")
  }
}

module.exports = {
  getTests: getTests,
}
