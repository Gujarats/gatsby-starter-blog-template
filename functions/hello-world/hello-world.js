const { JWT } = require("google-auth-library")
const { GoogleSpreadsheet } = require("google-spreadsheet")

exports.handler = async event => {
  const method = event.httpMethod // HTTP method (GET, POST, etc.)
  const headers = event.headers // Request headers
  const queryStringParameters = event.queryStringParameters // Query parameters
  const pathParameters = event.pathParameters // Path parameters

  const response = {
    statusCode: 200,
    body: JSON.stringify({ empty: "emtpy" }),
  }

  // only set on dev environment
  const environment = process.env.DEVELOPMENT_ENVIRONMENT
  if (environment) {
    response.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    }
  }

  try {
    const SCOPES = [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ]

    if (event.body) {
      const bodyParser = JSON.parse(event.body)
      const { name, email } = bodyParser.post
      if (name !== undefined && email !== undefined) {
        const sheetID = process.env.GOOGLE_SHEET_ID
        const newJwt = new JWT({
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          scopes: SCOPES,
        })

        const doc = new GoogleSpreadsheet(sheetID, newJwt)
        await doc.loadInfo()

        const sheet = doc.sheetsByIndex[0]
        result = await sheet.addRow(
          { FullName: name, Email: email },
          { option: "insert" }
        )

        response.body = JSON.stringify({ message: `Email ${email} Registered` })
        response.statusCode = 200
        return response
      }
    }

    return response

    response.body = JSON.stringify({
      message: `Error empty request`,
      error: `Error empty request`,
    })
    response.statusCode = 400
    return response
  } catch (error) {
    response.statusCode = 500
    response.body = JSON.stringify({ error: "Internal Server Error" })
    response.headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
    return response
  }
  return response
}
