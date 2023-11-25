import * as React from "react"
import { useState } from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import axios from "axios"
import SuccessMessage from "../components/success-message"
import { SUBMIT_MEAL_PLAN_API } from "../global/endpoint"

function MealPlan({ data: { markdownRemark: content }, location }) {
  const [post, setPost] = useState({
    name: "",
    email: "",
  })
  const [isSubmit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const inputChangeHandler = event => {
    setPost({ ...post, [event.target.name]: event.target.value })
  }
  async function submitHandler(event) {
    event.preventDefault()
    setLoading(true)
    await axios
      .post(SUBMIT_MEAL_PLAN_API, {
        header: {
          "Content-Type": "application/json",
        },
        post,
      })
      .then(response => {
        setLoading(false)
        setErrorMessage("Not getting OK... Please Contact Admin")
        if (response.status === 200) {
          setSubmit(true)
          setErrorMessage("")
        }
      })
      .catch(error => {
        setLoading(false)
        setSubmit(true)
        setErrorMessage(error.error)
      })
  }

  return (
    <Layout location={location}>
      <div className="prose flex flex-col mx-auto justify-between w-80 sm:w-full ">
        <section className="m-3">
          <h2>Subscribe to get free Meal Plan for 1 week</h2>
          <section
            className="p-3 dark:prose-p:text-white mx-auto items-center markdown-content"
            dangerouslySetInnerHTML={{ __html: content.html }}
            itemProp="articleBody"
          />
          <Link
            itemProp="url"
            className="hover:no-underline"
            to="https://flip.id/pwf/$gujaratsantana/#buymecoffee-3364"
          >
            Traktir saya Kopi yaa
          </Link>

          <div class="dark:bg-slate-700 p-5 mt-10 rounded-lg shadow-md w-full sm:w-96 mx-auto">
            <h2 class="text-2xl font-semibold">Register</h2>
            <form
              className="mt-5"
              name="contact"
              onSubmit={submitHandler}
              netlify
            >
              <div className="mt-7">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  onChange={inputChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  required
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={inputChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  required
                />
              </div>

              <div className="mt-6 flex items-center justify-end">
                {isSubmit ? (
                  <SuccessMessage message={errorMessage} />
                ) : (
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Save"}
                  </button>
                )}
              </div>
            </form>
          </div>

          <p className="markdown-content dark:text-slate-400">
            Setelah subscribe saya akan mengirimkan email mengenai Free Meal
            Plan for 1 week
          </p>
        </section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query mealplan {
    markdownRemark(frontmatter: { title: { eq: "Meal Plan Content" } }) {
      id
      frontmatter {
        title
        description
        date
      }
      html
    }
  }
`

export default MealPlan
