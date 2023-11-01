"use client";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import { Star } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/feature/cart/cart";
import { useToast } from "../use-toast";

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

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleAddToCart = (data: any) => {
    dispatch(addToCart(data));
    toast({
      title: "Service added to cart",
    });
  };

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="ml-1">{rating}</span>
            </div>
          </div>

          <Link href={`/services/${id}`}>
            <h3 className="mt-0.5 text-lg h-10 text-gray-900">
              {title}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {description?.slice(0, 55)} . . .
          </p>

          <div className="flex items-center justify-between">
            {availability ? (
              <>
                <p className="font-medium text-lg">
                  ${price}
                </p>
                <Button
                  className="bg-sky-500 text-white"
                  variant={"default"}
                  onClick={() => handleAddToCart(service)}
                >
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
