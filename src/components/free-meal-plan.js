import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const FreeMealPlan = ({ showMealPlan, setShowMealPlan }) => {
  const handleOnClick = () => {
    setShowMealPlan("non-meal");
    localStorage.setItem("meal", "non-meal");
  };
  return (
    <div
      class={`${showMealPlan === "meal" ? `visible` : `hidden`} flex flex-col 
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      h-90 w-90
      mt-4 bg-gradient-to-t from-black/30 to-transparent rounded-3xl shadow-2xl
      px-7 pt-4 pb-6 z-10`}
    >
      <StaticImage
        src="../images/free-meal-plan.png"
        className="rounded-3xl mx-auto "
        layout="fixed"
        formats={["auto", "webp", "avif, png"]}
        quality={100}
        width={280}
      />
      <button
        className="absolute top-1 right-1 text-red-900 text-3xl"
        onClick={handleOnClick}
      >
        <i class="ri-close-circle-line"></i>
      </button>

      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        rounded-3xl w-[270px] text-center
        pb-6 pt-2"
      >
        <span class="uppercase font-semibold drop-shadow-lg mx-auto text-slate-200 bg-amber-800">
          Diet 1 Bulan Turun BB !!!
        </span>
        <div class="mt-4 flex space-x-3 items-center ">
          <Link
            to="/mealplan"
            class="mx-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 rounded-lg text-sm
            inline-block text-slate-100 no-underline"
            onClick={handleOnClick}
          >
            Download Now !!!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FreeMealPlan;
