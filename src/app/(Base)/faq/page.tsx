"use client";

import { Button } from "@/components/ui/button";
import { useGetFaqQuery } from "@/redux/feature/faq/faqApi";
import React, { useState } from "react";

const page = () => {
  const { data, isLoading } = useGetFaqQuery();

  const [activeItems, setActiveItems] = useState<any>(
    Array(data?.data?.length).fill(false)
  );

  const handleToggle = (index: any) => {
    const newActiveItems = [...activeItems];
    newActiveItems[index] = !newActiveItems[index];
    setActiveItems(newActiveItems);
  };

  console.log(data);

  return (
    <section className="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                FAQ
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                Any Questions? Look Here
              </h2>
            </div>
          </div>
        </div>

        <div className="-mx-4 grid grid-cols-12 gap-5">
          {data?.data?.map((e: any, index: any) => (
            <AccordionItem
              key={index}
              header={e?.title}
              text={e?.content}
              active={activeItems[index]}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stop-color="#3056D3"
                stop-opacity="0.36"
              />
              <stop
                offset="1"
                stop-color="#F5F2FD"
                stop-opacity="0"
              />
              <stop
                offset="1"
                stop-color="#F5F2FD"
                stop-opacity="0.096144"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default page;

const AccordionItem = ({
  header,
  text,
  active,
  onToggle,
}: any) => {
  return (
    <div className="col-span-12 single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8">
      <Button
        className={`faq-btn flex w-full text-left`}
        onClick={onToggle}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg  bg-opacity-5 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            // className="w-6 h-6"
            className={`duration-200 ease-in-out fill-primary stroke-primary ${
              active ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>

          {/* <svg
            className={`duration-200 ease-in-out fill-primary stroke-primary ${
              active ? "rotate-180" : ""
            }`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </svg> */}
        </div>

        <div className="w-full">
          <h4 className="text-lg font-semibold text-black">
            {header}
          </h4>
        </div>
      </Button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color">
          {text}
        </p>
      </div>
    </div>
  );
};
