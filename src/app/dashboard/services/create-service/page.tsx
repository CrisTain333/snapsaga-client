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
import { useCreateServiceMutation } from "@/redux/feature/service/serviceApi";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Loader from "@/components/Loader/Loader";
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
    setImage((prevImages: any) => [
      ...prevImages,
      ...files,
    ]);
  };

  const { toast } = useToast();

  const [createProduct, { isLoading }] =
    useCreateServiceMutation();

  const handleCreateService = async (e: any) => {
    e.preventDefault();

    if (
      serviceData.title === "" ||
      serviceData.price === null ||
      serviceData.category === "" ||
      serviceData.availability === "" ||
      serviceData.description === ""
    ) {
      // Show a toast message for validation error
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });

      return;
    }

    const Form = new FormData();
    image.forEach((image: any) => {
      Form.append("banner", image);
    });
    Form.append("title", serviceData.title);
    Form.append("price", serviceData.price);
    Form.append("category", serviceData.category);
    Form.append("availability", serviceData.availability);
    Form.append("rating", serviceData.rating);
    Form.append("description", serviceData.description);

    const response = await createProduct(Form);
    const { data: responseData, error } = response;
    if (responseData?.statusCode === 200) {
      toast({
        title: responseData?.message,
      });
    } else {
      toast({
        variant: "destructive",
        duration: 2500,
        title: error?.data?.message,
        action: (
          <ToastAction
            altText="Try again"
            // onClick={() => form.reset()}
          >
            Try again
          </ToastAction>
        ),
      });
    }
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
                  <Label className="text-base">
                    Title{" "}
                    <span className=" text-red-500">
                      {" "}
                      *
                    </span>
                  </Label>
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
                  <Label className="text-base">
                    Price{" "}
                    <span className=" text-red-500">
                      {" "}
                      *
                    </span>
                  </Label>
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
                    Banner{" "}
                    <span className=" text-red-500">
                      {" "}
                      *
                    </span>
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
                    Category{" "}
                    <span className=" text-red-500">
                      {" "}
                      *
                    </span>
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
                    Availability{" "}
                    <span className=" text-red-500">
                      {" "}
                      *
                    </span>
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
                Description{" "}
                <span className=" text-red-500"> *</span>
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

            <div className="col-span-12 mt-5 ">
              <div className="flex items-center justify-center">
                <Button
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <div className="flex items-center justify-center">
                        <Loader
                          size="30"
                          color="white"
                        />
                        <span className="ml-1">
                          Creating...
                        </span>
                      </div>
                    </>
                  ) : (
                    <>create</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
