import React from "react";

const NewsSection = () => {
  return (
    <div>
      {/* <!-- Container for demo purpose --> */}
      <div className="mx-auto w-[95%] h-full py-20">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className=" ">
            <div className="lg:max-w-xl lg:pr-5">
              <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-blue-600 sm:text-7xl sm:leading-snug">
                We make you look
                <span className="my-1 inline-block border-b-8 border-blue-600 bg-orange-400 px-4 font-bold text-white">
                  different
                </span>
              </h2>
              <p className="text-base text-gray-700">
                Sed ut perspiciatis unde omnis iste natus
                error sit voluptatem accusantium doloremque
                it.
              </p>
            </div>
          </div>
          <div className="relative hidden lg:ml-32 lg:block ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="my-6 mx-auto h-10 w-10 animate-bounce rounded-full bg-blue-50 p-2 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
            <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -left-10 -top-20 h-28 w-28 rounded-xl bg-white text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 -bottom-20 h-28 w-28 rounded-xl bg-white text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clip-rule="evenodd"
                />
              </svg>
              <div className="flex w-96 flex-wrap">
                <div className="h-48 w-1/2 rounded-full rounded-br-none bg-red-400"></div>
                <div className="h-48 w-1/2 rounded-[6rem] rounded-br-none rounded-tl-none bg-violet-400"></div>
                <div className="h-48 w-1/2 rounded-full rounded-b-none rounded-br-none bg-yellow-400"></div>
                <div className="h-48 w-1/2 rounded-full rounded-t-none rounded-br-none bg-indigo-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Container for demo purpose --> */}
    </div>
  );
};

export default NewsSection;
