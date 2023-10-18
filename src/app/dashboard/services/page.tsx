"use client";
import {
  useGetServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/feature/service/serviceApi";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
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
import { FileSignature, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProfilePictureMutation } from "@/redux/feature/user/userApi";
import { ToastAction } from "@/components/ui/toast";

const page = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState();
  const [serviceData, setServiceData] =
    React.useState<any>(null);

  const { toast } = useToast();

  const [updatingData, setUpdatingData] = useState({
    serviceId: serviceData?.id,
    servicePrice: serviceData?.price,
    serviceDescription: serviceData?.description,
    serviceAvailability: serviceData?.availability,
  });

  const { data: services } =
    useGetServiceQuery(currentPage);
  const [updateService] = useUpdateServiceMutation();

  useEffect(() => {
    if (services) {
      setCurrentPage(services?.meta?.page);
      setTotalPage(services?.meta?.total);
    }
  }, [services]);

  console.log(currentPage, totalPage);

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

  const handleServiceUpdate = async () => {
    if (
      updatingData?.serviceAvailability === undefined ||
      updatingData?.serviceAvailability === null
    ) {
      toast({
        title: "Please select Availability",
        variant: "destructive",
      });

      return;
    } else if (
      updatingData?.servicePrice === undefined ||
      updatingData?.servicePrice === null
    ) {
      toast({
        title: "Please add a price",
        variant: "destructive",
      });

      return;
    } else if (
      updatingData?.serviceDescription === undefined ||
      updatingData?.serviceDescription === null
    ) {
      toast({
        title: "Please add a Description",
        variant: "destructive",
      });
      return;
    }

    const config = {
      id: updatingData?.serviceId,
      data: {
        price: parseInt(updatingData?.servicePrice),
        availability: updatingData.serviceAvailability,
        description: updatingData.serviceDescription,
      },
    };

    const response = await updateService(config);
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
          <ToastAction altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end my-2 space-y-2 text-xs sm:space-y-0 sm:space-x-3 ">
        <div className=" items-center justify-end space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
          <span className="block text-base">
            Page {currentPage} of {pageNumbers?.length}
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
                currentPage === pageNumbers?.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentPage === pageNumbers?.length}
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

      <Table>
        <TableCaption>A list of your Services</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Service Name</TableHead>
            {/* <TableHead>Price</TableHead> */}
            <TableHead>Amount</TableHead>
            <TableHead>Availability </TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services?.data?.map((e: any) => (
            <TableRow key={e?.id}>
              <TableCell className="font-medium">
                {e?.title}
              </TableCell>
              <TableCell>${e?.price}</TableCell>
              <TableCell>
                <div>
                  {e?.availability ? (
                    <span className="text-green-500 font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Not Available
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="space-x-3 flex items-center justify-end">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        onClick={() =>
                          setUpdatingData({
                            serviceAvailability:
                              e?.availability,
                            serviceDescription:
                              e?.description,
                            serviceId: e?.id,
                            servicePrice: e?.price,
                          })
                        }
                        size={"sm"}
                        className="flex items-center justify-center bg-yellow-400 text-white"
                      >
                        <FileSignature size={15} />
                        <span className="ml-2">Edit</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>
                          Update Service
                        </SheetTitle>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="price"
                            className="text-right"
                          >
                            Price
                          </Label>
                          <Input
                            type="number"
                            value={parseInt(
                              updatingData?.servicePrice
                            )}
                            onChange={(e) =>
                              setUpdatingData(
                                (prev: any) => {
                                  return {
                                    ...prev,
                                    servicePrice: parseInt(
                                      e.target.value
                                    ),
                                  };
                                }
                              )
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="price"
                            className="text-right"
                          >
                            Availability
                          </Label>
                          <Select
                            onValueChange={(e) =>
                              setUpdatingData(
                                (prev: any) => {
                                  return {
                                    ...prev,
                                    serviceAvailability:
                                      e === "available"
                                        ? true
                                        : false,
                                  };
                                }
                              )
                            }
                            defaultValue={
                              updatingData?.serviceAvailability ===
                              true
                                ? "available"
                                : "not_available"
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              Select Availability
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {/* <SelectLabel placeholder="" /> */}
                                <SelectItem value="available">
                                  Available
                                </SelectItem>
                                <SelectItem value="not_available">
                                  Not Available
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="price"
                            className="text-right"
                          >
                            description
                          </Label>
                          <Textarea
                            onChange={(e) =>
                              setUpdatingData(
                                (prev: any) => {
                                  return {
                                    ...prev,
                                    serviceDescription:
                                      e.target.value,
                                  };
                                }
                              )
                            }
                            value={
                              updatingData?.serviceDescription
                            }
                            id="username"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        {/* <SheetClose asChild> */}
                        <Button
                          type="submit"
                          onClick={handleServiceUpdate}
                        >
                          Save changes
                        </Button>
                        {/* </SheetClose> */}
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                  <Button
                    size={"sm"}
                    className="flex items-center justify-center bg-red-500 text-white"
                  >
                    <Trash2 size={15} />
                    <span className="ml-2">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
