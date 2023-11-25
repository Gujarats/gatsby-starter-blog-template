import React from "react"
import { useState, useEffect } from "react"
import Header from "./header"
import Bio from "./bio"

function setDarkTheme(setTheme) {
  localStorage.setItem("theme", "dark")
  setTheme("dark")
}

function setLightTheme(setTheme) {
  localStorage.setItem("theme", "light")
  setTheme("light")
}

function getMainClass(theme) {
  let classString = theme
  return classString
}

function setBlur(showMealPlan) {
  return showMealPlan === "meal" ? `blur-sm` : ``
}

const Layout = ({ location, title, showMealPlan, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const [theme, setTheme] = useState("dark")

  const onUpdateTheme = theme => {
    if (theme === "dark") {
      setLightTheme(setTheme)
    } else if (theme === "light") {
      setDarkTheme(setTheme)
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") setDarkTheme(setTheme)
    if (savedTheme === "light") setLightTheme(setTheme)
  }, [])

  return (
    <div
      className={`relative ${getMainClass(
        theme
      )} 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700 ${setBlur(
        showMealPlan
      )}
        `}
      data-is-root-path={isRootPath}
    >
      <Header onUpdateTheme={() => onUpdateTheme(theme)} theme={theme} />
      <main className="flex flex-col">{children}</main>
      <footer className="flex">
        <Bio />
      </footer>
    </div>
  )
}

export default Layout
