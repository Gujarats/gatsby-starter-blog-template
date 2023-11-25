const LOCALHOST = "http://localhost:9999"
const prefix = process.env.DEVELOPMENT_ENVIRONMENT ? LOCALHOST : ""
export const SUBMIT_MEAL_PLAN_API = prefix + "/.netlify/functions/hello-world"
