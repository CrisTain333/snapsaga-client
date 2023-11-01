import { category } from "@/constants/categories";
import React from "react";

const CategorySection = () => {
  return (
    <div>
      {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

      <section>
        <div className=" px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Find Your Service By Category
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {category.map((ct) => (
                <div className="block rounded-md border border-gray-100 p-4 shadow-lg ">
                  <h2 className="mt-2 font-bold">{ct}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategorySection;
