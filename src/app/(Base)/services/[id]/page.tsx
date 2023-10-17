"use client";
import { useGetReviewQuery } from "@/redux/feature/review/reviewApi";
import { Rating } from "@smastrom/react-rating";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = ({ params }: any) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = params;

  const { data } = useGetReviewQuery(id);
  console.log(data);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/service/${id}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setServices(data.data); // Assuming the response has a 'data' property
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [params, id]);

  const {
    banner,
    title,
    description,
    price,
    availability,
  }: any = services;

  return (
    <div>
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div className="mx-auto sm:text-center lg:max-w-2xl">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-primary">
                Detail
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle
                        cx="1"
                        cy="1"
                        r=".7"
                      />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative"></span>
              </span>{" "}
              {title}
            </h2>
          </div>
          <div className="mb-4 transition-shadow duration-300 hover:shadow-xl ">
            <img
              className="object-cover w-full h-56 rounded shadow-lg sm:h-64 md:h-80 lg:h-96"
              src={banner}
              alt=""
            />
          </div>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto flex flex-col">
          <div className="w-[95%] mx-auto">
            <div className="flex flex-col justify-center sm:flex-row mt-10">
              {/* <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    Features
                  </h2>
                  <div className="w-12 h-1 bg-primary rounded mt-2 mb-4"></div>
                  <div className="">
                    {Features?.map((e) => {
                      return (
                        <ul>
                          <li className="text-gray-500 py-4 text-start font-semibold flex items-center justify-start ">
                            <FaEnvira className="text-orange-500 text-2xl" />{" "}
                            {e?.name}
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                </div>
              </div> */}
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4 inline-flex justify-center sm:justify-start">
                  {description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-black inline-flex items-center text-lg font-bold">
                    Price: ${price}
                  </p>
                  <div className="">
                    <Link href={`/booking?productId=${id}`}>
                      <Button>Book</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <p className="px-3 py-px mb-4 font-semibold tracking-wider text-white uppercase rounded-full bg-primary text-center text-xl">
          All Reviews
        </p>

        <div>
          {data?.data?.map((e: any) => (
            <article
              key={e?.id}
              className="border rounded p-2"
            >
              <div className="flex items-center mb-4 space-x-4 ">
                <img
                  className="w-10 h-10 rounded-full"
                  src={e?.user?.profileImage}
                  alt=""
                />
                <div className="space-y-1 font-medium dark:text-white">
                  <p>
                    {e?.user?.name}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      Joined on{" "}
                      {moment(e?.user?.createdAt).format(
                        "MMM Do YY"
                      )}
                    </time>
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1">
                <Rating
                  style={{ maxWidth: 100 }}
                  value={parseInt(e?.rating)}
                  // onChange={setRating}
                />
              </div>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {e?.message}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
