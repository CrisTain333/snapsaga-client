import moment from "moment";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import { Star } from "lucide-react";

const ServiceCard = ({ service }: any) => {
  const {
    id,
    banner,
    title,
    createdAt,
    description,
    price,
    category,
    availability,
    rating,
  } = service;
  return (
    <div>
      <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <img
          alt="Office"
          src={banner}
          className="h-56 w-full object-cover"
        />

        <div className="bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                {moment(createdAt).format("MMM Do YY")}
              </time>
              <p className="text-xs mt-3 text-gray-500">
                {category}
              </p>
            </div>

            <div className="flex items-center justify-center ">
              <Star
                size={20}
                color="yellow"
              />
              <span className="ml-1">{rating}</span>
            </div>
          </div>

          <Link href={`/services/${id}`}>
            <h3 className="mt-0.5 text-lg h-10 text-gray-900">
              {title}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {description?.slice(0, 50)} . . .
          </p>

          <div className="flex items-center justify-between">
            {availability ? (
              <>
                <p className="font-medium text-lg">
                  ${price}
                </p>
                <Button variant={"default"}>
                  Add To Cart
                </Button>
              </>
            ) : (
              <>
                <span className="text-center text-red-500 font-semibold">
                  Not Available !
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ServiceCard;
