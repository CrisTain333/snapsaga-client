"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { category } from "@/constants/categories";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const page = () => {
  const [image, setImage] = useState<any>([]);
  const [serviceData, setServiceData] = useState<any>({
    title: "",
    price: null,
    category: "",
    availability: "",
    rating: "",
    description: "",
  });

  const handleImageChange = (e: any) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImage(files);
  };

  const handleCreateService = async (e: any) => {
    e.preventDefault();

    const Form = new FormData();
    Form.append("banner", image);
    Form.append("title", serviceData.title);
    Form.append("price", serviceData.price);
    Form.append("category", serviceData.category);
    Form.append("availability", serviceData.availability);
    Form.append("rating", serviceData.rating);
    Form.append("description", serviceData.description);
  };

  const handleAvailabilityChange = (e: any) => {
    const selectedValue = e === "available" ? true : false;
    setServiceData({
      ...serviceData,
      availability: selectedValue,
    });
  };

  return (
    <div>
      <h2 className="text-center font-semibold text-xl">
        create service
      </h2>

      <div className=" mt-5">
        <form onSubmit={handleCreateService}>
          <div className="grid grid-cols-12 gap-x-0 md:gap-x-5">
            <div className="col-span-12  space-y-2">
              <div className="grid grid-cols-12 gap-x-0 md:gap-x-5">
                <div className="col-span-12 md:col-span-4">
                  <Label className="text-base">Title</Label>
                  <Input
                    value={serviceData?.title}
                    onChange={(e) =>
                      setServiceData((prev: any) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      })
                    }
                    placeholder="Service Title"
                    type="text"
                    name="title"
                  />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Label className="text-base">Price</Label>
                  <Input
                    placeholder="Service price"
                    type="number"
                    name="price"
                    value={serviceData?.price}
                    onChange={(e) =>
                      setServiceData((prev: any) => {
                        return {
                          ...prev,
                          price: parseInt(e.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Label className="text-base">
                    Banner
                  </Label>
                  <Input
                    onChange={handleImageChange}
                    type="file"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-12 space-y-2 mt-4">
              <div className="grid grid-cols-12 gap-x-0 md:gap-x-5">
                <div className="col-span-12 md:col-span-4">
                  <Label className="text-base">
                    Category
                  </Label>

                  <Select
                    value={serviceData?.category}
                    onValueChange={(e) =>
                      setServiceData((prev: any) => {
                        return {
                          ...prev,
                          category: e,
                        };
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      Select Category
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel placeholder="Select category" />
                        {category?.map((e) => (
                          <SelectItem
                            value={e}
                            key={e}
                          >
                            {e}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Label className="text-base">
                    Availability
                  </Label>
                  <Select
                    value={
                      serviceData?.availability
                        ? "available"
                        : "not_available"
                    }
                    onValueChange={handleAvailabilityChange}
                  >
                    <SelectTrigger className="w-full">
                      Select Availability
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel
                          placeholder={`${
                            serviceData?.availability
                              ? "available"
                              : "not_available"
                          }`}
                        />
                        <SelectItem value="available">
                          Available
                        </SelectItem>
                        <SelectItem value="not_available">
                          Not Available
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {/* <select
                    className="w-full"
                    value={
                      serviceData.availability
                        ? "available"
                        : "not_available"
                    }
                    onChange={handleAvailabilityChange}
                  >
                    <option value="available">
                      Available
                    </option>
                    <option value="not_available">
                      Not available
                    </option>
                  </select> */}
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Label className="text-base">
                    Ratings
                  </Label>
                  <Input
                    value={serviceData?.rating}
                    onChange={(e) =>
                      setServiceData((prev: any) => {
                        return {
                          ...prev,
                          rating: e.target.value,
                        };
                      })
                    }
                    placeholder="Default Ratings"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 w-full  space-y-2 mt-5">
              <Label className="text-base">
                Description
              </Label>
              <Textarea
                value={serviceData?.description}
                onChange={(e) =>
                  setServiceData((prev: any) => {
                    return {
                      ...prev,
                      description: e.target.value,
                    };
                  })
                }
                // cols={10}
                // rows={2}
                placeholder="Service Description"
                // type="number"
                // className="w-full"
              />
            </div>

            <div className="col-span-12">
              <div className="flex items-center justify-center">
                <Button type="submit">Create</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
