import FilterSection from "@/components/filter/FilterSection/FilterSection";
import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import React from "react";

const page = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <div className="w-[95%] mx-auto">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <div className="sticky top-20">
              <FilterSection />
            </div>
          </div>
          <div className="col-span-9">
            <div className="grid grid-cols-12 gap-5">
              {arr.map((t) => (
                <div className="col-span-4">
                  <ServiceCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
