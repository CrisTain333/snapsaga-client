"use client";
import Loader from "@/components/Loader/Loader";
import FilterSection from "@/components/filter/FilterSection/FilterSection";
import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import { useGetServiceQuery } from "@/redux/feature/service/serviceApi";
import React, { useEffect, useState } from "react";

const page = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] =
    useState<any>([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/service?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&category=${selectedCategories}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    console.log(apiUrl);

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
    selectedCategories,
  ]);

  const toggleCategory = (category: any) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(
          (c: any) => c !== category
        )
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        category,
      ]);
    }
  };

  console.log(selectedCategories);

  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <div className="w-[95%] mx-auto">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <div className="sticky top-20">
              <FilterSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategories={selectedCategories}
                setSelectedCategories={
                  setSelectedCategories
                }
                toggleCategory={toggleCategory}
              />
            </div>
          </div>
          <div className="col-span-9">
            {isLoading ? (
              <>
                <div className="flex items-center justify-center mt-10">
                  <Loader
                    color="gray"
                    size="120"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-12 gap-5">
                  {services?.map((service, i) => (
                    <div className="col-span-4">
                      <ServiceCard
                        key={i + 1}
                        service={service}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
