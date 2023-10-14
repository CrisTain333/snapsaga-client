"use client";
import Loader from "@/components/Loader/Loader";
import FilterSection from "@/components/filter/FilterSection/FilterSection";
import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import { useGetServiceQuery } from "@/redux/feature/service/serviceApi";
import React, { useEffect, useState } from "react";
import { category as options } from "@/constants/categories";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoaderCard from "@/components/ui/ServiceCard/LoaderCard";

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

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/service?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

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
  }, [
    page,
    pageSize,
    searchQuery,
    category,
    minPrice,
    maxPrice,
  ]);

  const test = true;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <div className="w-[95%] mx-auto">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <div className="sticky top-20">
              <div className="sidebar w-[90%] sticky top-20">
                <div className="widget user_widget_search rounded-md shadow-md p-2">
                  <h2 className="text-center flex items-center justify-center">
                    <span className="mr-1 text-[#13a0ef] ">
                      {/* <FaFilter size={23} /> */}
                      <Filter size={23} />
                    </span>
                    Filters
                  </h2>
                  <form
                  // id="user_wiget_search_form"
                  // className="user_wiget_search_form"
                  // method="GET"
                  >
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
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-9">
            <>
              <div className="grid grid-cols-12 gap-5">
                {isLoading ? (
                  <>
                    {arr?.map((service, i) => (
                      <div className="col-span-4">
                        <LoaderCard key={i} />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {services?.map((service, i) => (
                      <div className="col-span-4">
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
