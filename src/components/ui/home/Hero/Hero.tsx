import { style } from "@/constants/colors";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="relative">
        <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h1 className="text-sm text-indigo-600 font-medium">
              Build products for everyone
            </h1>
            <h2 className="text-5xl space-y-5 text-gray-800 font-extrabold mx-auto md:text-5xl">
              <span>
                {" "}
                SnapSaga is where every image becomes a
                story.{" "}
              </span>
              <br />
              <span
                className={`text-transparent my-5 p-3 bg-clip-text bg-gradient-to-r to-[#c7ec01] from-[#13a0ef] via-[#13a0ef]`}
              >
                Where Every Click Tells a Tale
              </span>
            </h2>
            <p className="max-w-2xl mx-auto">
              We capture life's precious moments with
              creativity and passion, transforming them into
              timeless visual narratives. Experience the art
              of storytelling through our lens.
            </p>
            <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <Link
                href="/services"
                className={`block py-2 px-4 text-white font-medium ${style.bg_gradient}  duration-150  rounded-lg shadow-lg hover:shadow-none`}
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
