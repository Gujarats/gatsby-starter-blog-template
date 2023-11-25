import React from "react"
import { useState, useEffect } from "react"
import { Link } from "gatsby"

function Header({ onUpdateTheme, theme }) {
  const iconSun = <i class="ri-sun-fill"></i>
  const iconMoon = <i class="ri-moon-fill"></i>
  const [top, setTop] = useState("non-top")

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY >= 50 ? setTop("non-top") : setTop("top")
    }
    window.addEventListener("scroll", scrollHandler)
    return () => window.removeEventListener("scroll", scrollHandler)
  })

  return (
    <header
      className={`flex flex-row bg-gray-100 dark:bg-slate-800 sticky top-0 z-10 ${
        top === "top" ? `` : ` shadow-xl max-w-none max-h-none`
      }`}
    >
      <nav className="grid grid-cols-1 h-[3rem] sm:flex items-center mx-auto">
        <div className="flex items-center mx-auto">
          <Link
            className="text-slate-800 dark:text-slate-100 no-underline m-3"
            to="/"
          >
            <i class="ri-home-smile-fill"></i>
            Home
          </Link>
          <button
            className={`${
              theme === "dark" ? "text-yellow-400" : "text-blue-800"
            }`}
            onClick={onUpdateTheme}
          >
            {theme === "dark" ? iconSun : iconMoon}
          </button>
          <Link
            className="text-slate-800 dark:text-slate-100 no-underline m-3"
            to="/mealplan"
          >
            <i class="ri-plant-fill"></i>
            Meal
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
