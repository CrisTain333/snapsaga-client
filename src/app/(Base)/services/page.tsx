"use client";
import Loader from "@/components/Loader/Loader";
import FilterSection from "@/components/filter/FilterSection/FilterSection";
import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import { useGetServiceQuery } from "@/redux/feature/service/serviceApi";
import React, { useEffect, useState } from "react";
import { category as options } from "@/constants/categories";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import LoaderCard from "@/components/ui/ServiceCard/LoaderCard";
import { Button } from "@/components/ui/button";

const page = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  useState<any>([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const apiUrl = `${
      process.env.NEXT_PUBLIC_BACKEND_API
    }/service?page=${currentPage}&pageSize=${6}&searchQuery=${searchQuery}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setServices(data?.data);
        setIsLoading(false);
        setCurrentPage(data?.meta?.page);
        setTotalPage(data?.meta?.total);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [
    page,
    pageSize,
    searchQuery,
    category,
    minPrice,
    maxPrice,
    currentPage,
  ]);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPage!; i++) {
    pageNumbers.push(i);
  }
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <div className="w-[95%] mx-auto">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-3">
            <Sheet>
              <SheetTrigger
                className="block md:hidden"
                asChild
              >
                <Button
                  variant="outline"
                  className="flex items-center"
                >
                  {" "}
                  <Filter color="#13a0ef" />{" "}
                  <span className="ml-1">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <form>
                  <div className="form-group mb-1">
                    <label
                      htmlFor="search"
                      className="mt-2 text-base font-semibold"
                    >
                      Services
                    </label>
                    <br />
                    <input
                      type="text"
                      className="w-[80%] border rounded-sm p-1 text-sm"
                      id="user_name"
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      placeholder="e.g Search Services..."
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label
                      htmlFor="user_gender"
                      className="text-base font-semibold"
                    >
                      Category
                    </label>
                    <br />
                    <select
                      className="w-[80%] border rounded-sm p-1 text-sm"
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value)
                      }
                    >
                      <option value="">
                        Select Categories
                      </option>
                      {options?.map((c: any) => (
                        <option
                          key={c}
                          value={c}
                        >
                          {" "}
                          {c}
                        </option>
                      ))}
                      {/* Add more category options */}
                    </select>
                  </div>

                  <div className="form-group mt-3 w-[80%] p-1">
                    <label
                      htmlFor="price_range"
                      className="text-base font-semibold"
                    >
                      Price Range
                    </label>
                    <div className="flex justify-between mt-2">
                      <br />
                      <input
                        type="text"
                        className="w-[80%] border rounded-sm p-1 text-sm"
                        id="user_name"
                        value={minPrice}
                        onChange={(e) =>
                          setMinPrice(e.target.value)
                        }
                        placeholder="From"
                      />

                      <input
                        type="text"
                        className="w-[80%] border rounded-sm p-1 text-sm ml-3"
                        id="user_name"
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(e.target.value)
                        }
                        placeholder="To"
                      />
                    </div>
                  </div>
                </form>

                <div className="flex items-center justify-center my-2 space-y-2 text-xs sm:space-y-0 sm:space-x-3 ">
                  <div className=" items-center justify-end space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
                    <span className="block text-base">
                      Page {currentPage} of{" "}
                      {pageNumbers?.length}
                    </span>
                    <div className="space-x-1">
                      <button
                        onClick={() => handlePrevious()}
                        title="previous"
                        type="button"
                        className={`inline-flex  items-center justify-center w-8 h-8 py-0  rounded-md shadow ${
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={currentPage === 1}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleNext()}
                        title="next"
                        type="button"
                        className={`inline-flex items-center  justify-center w-8 h-8 py-0  rounded-md shadow ${
                          currentPage ===
                          pageNumbers?.length
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          currentPage ===
                          pageNumbers?.length
                        }
                      >
                        <svg
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className=" hidden md:block  sticky top-20">
              <div className="sidebar w-[90%] sticky top-20">
                <div className="widget user_widget_search rounded-md shadow-md p-2">
                  <h2 className="text-center flex items-center justify-center">
                    <span className="mr-1 text-[#13a0ef] ">
                      {/* <FaFilter size={23} /> */}
                      <Filter size={23} />
                    </span>
                    Filters
                  </h2>
                  <form>
                    <div className="form-group mb-1">
                      <label
                        htmlFor="search"
                        className="mt-2 text-base font-semibold"
                      >
                        Services
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[80%] border rounded-sm p-1 text-sm"
                        id="user_name"
                        value={searchQuery}
                        onChange={(e) =>
                          setSearchQuery(e.target.value)
                        }
                        placeholder="e.g Search Services..."
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label
                        htmlFor="user_gender"
                        className="text-base font-semibold"
                      >
                        Category
                      </label>
                      <br />
                      <select
                        className="w-[80%] border rounded-sm p-1 text-sm"
                        value={category}
                        onChange={(e) =>
                          setCategory(e.target.value)
                        }
                      >
                        <option value="">
                          Select Categories
                        </option>
                        {options?.map((c: any) => (
                          <option
                            key={c}
                            value={c}
                          >
                            {c}
                          </option>
                        ))}
                        {/* Add more category options */}
                      </select>
                    </div>

                    <div className="form-group mt-3 w-[80%] p-1">
                      <label
                        htmlFor="price_range"
                        className="text-base font-semibold"
                      >
                        Price Range
                      </label>
                      <div className="flex justify-between mt-2">
                        <br />
                        <input
                          type="text"
                          className="w-[80%] border rounded-sm p-1 text-sm"
                          id="user_name"
                          value={minPrice}
                          onChange={(e) =>
                            setMinPrice(e.target.value)
                          }
                          placeholder="From"
                        />

                        <input
                          type="text"
                          className="w-[80%] border rounded-sm p-1 text-sm ml-3"
                          id="user_name"
                          value={maxPrice}
                          onChange={(e) =>
                            setMaxPrice(e.target.value)
                          }
                          placeholder="To"
                        />
                      </div>
                    </div>
                  </form>

                  <div className="flex items-center justify-center my-2 space-y-2 text-xs sm:space-y-0 sm:space-x-3 ">
                    <div className=" items-center justify-end space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
                      <span className="block text-base">
                        Page {currentPage} of{" "}
                        {pageNumbers?.length}
                      </span>
                      <div className="space-x-1">
                        <button
                          onClick={() => handlePrevious()}
                          title="previous"
                          type="button"
                          className={`inline-flex  items-center justify-center w-8 h-8 py-0  rounded-md shadow ${
                            currentPage === 1
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={currentPage === 1}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleNext()}
                          title="next"
                          type="button"
                          className={`inline-flex items-center  justify-center w-8 h-8 py-0  rounded-md shadow ${
                            currentPage ===
                            pageNumbers?.length
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={
                            currentPage ===
                            pageNumbers?.length
                          }
                        >
                          <svg
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <>
              <div className="grid grid-cols-12 gap-5">
                {isLoading ? (
                  <>
                    {arr?.map((service, i) => (
                      <div className="col-span-12 md:col-span-4">
                        <LoaderCard key={i} />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {services?.map((service, i) => (
                      <div className="col-span-12 md:col-span-4">
                        <ServiceCard
                          key={i + 1}
                          service={service}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
