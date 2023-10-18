"use client";
import { useGetServiceQuery } from "@/redux/feature/service/serviceApi";
import React from "react";
import LoaderCard from "../../ServiceCard/LoaderCard";
import ServiceCard from "../../ServiceCard/ServiceCard";

const ServiceSection = () => {
  const { data, isLoading } = useGetServiceQuery(1);

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-2xl mx-auto sm:text-center">
          <div className="relative z-10">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Our Photography Services
            </h3>
            <p className="mt-3">
              Our rewards in life will always be in direct
              ratio to our service.
            </p>
          </div>
          <div
            className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            }}
          ></div>
        </div>
        <div className="relative mt-12">
          <>
            <div className="grid grid-cols-12 gap-5">
              {isLoading ? (
                <>
                  {[1, 2, 3, 4, 5, 6]?.map((service, i) => (
                    <div className="col-span-12 md:col-span-4">
                      <LoaderCard key={i} />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {data?.data?.map(
                    (service: any, i: any) => (
                      <div className="col-span-12 md:col-span-4">
                        <ServiceCard
                          key={i + 1}
                          service={service}
                        />
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
