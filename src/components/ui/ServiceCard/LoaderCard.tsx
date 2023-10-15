import moment from "moment";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import { Skeleton } from "../skeleton";

const LoaderCard = () => {
  return (
    <div>
      <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        {/* <img
          alt="Office"
          src={banner}
          className="h-56 w-full object-cover"
        /> */}
        <Skeleton className="h-56 bg-gray-300 w-full object-cover" />

        <div className="bg-white p-4 sm:p-6">
          {/* <time
            dateTime="2022-10-10"
            className="block text-xs text-gray-500"
          > */}
          {/* {moment(createdAt).format("MMM Do YY")} */}
          <Skeleton className="bg-gray-300 w-full h-5 " />
          {/* </time> */}
          <Skeleton className=" bg-gray-300 w-full h-5 " />

          {/* <Link href={`/services/${id}`}>
            <h3 className="mt-0.5 text-lg text-gray-900">
              {title}
            </h3>
          </Link> */}

          <div className="flex items-center space-x-5 mt-4 justify-between">
            <Skeleton className="bg-gray-300 w-[40%]  h-7   " />
            <Skeleton className="bg-gray-300 w-[40%]  h-7  " />
          </div>
        </div>
      </article>
    </div>
  );
};

export default LoaderCard;
