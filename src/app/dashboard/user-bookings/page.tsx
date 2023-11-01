"use client";
import {
  useCancelBookingAdminMutation,
  useConfirmBookingAdminMutation,
  useGetAllBookingsQuery,
} from "@/redux/feature/booking/bookingApi";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState();
  const { data: bookings } =
    useGetAllBookingsQuery(currentPage);
  //   console.log(data);

  const { toast } = useToast();

  const [cancelBooking] = useCancelBookingAdminMutation();
  const [confirmBooking] = useConfirmBookingAdminMutation();
  const handleCancel = async (bookingId: any) => {
    const response = await cancelBooking(bookingId);
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
      });
    }
  };

  useEffect(() => {
    if (bookings) {
      setCurrentPage(bookings?.meta?.page);
      setTotalPage(bookings?.meta?.total);
    }
  }, [bookings]);

  const handleConfirm = async (bookingId: any) => {
    const response = await confirmBooking(bookingId);
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
      });
    }
  };

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

  return (
    <div>
      <div className="flex items-center justify-end my-2 space-y-2 text-xs sm:space-y-0 sm:space-x-3 ">
        <div className=" items-center justify-end space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
          <span className="block text-base">
            Page {currentPage} of {pageNumbers?.length}
          </span>
          <div className="space-x-1">
            <Button
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
            </Button>
            <Button
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
            </Button>
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>
          A list of recent Bookings.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.data?.map((e: any) => {
            return (
              <>
                <TableRow>
                  <TableCell
                    className="font-medium"
                    key={e?.id}
                  >
                    {e?.service?.title}
                  </TableCell>
                  <TableCell>
                    {e?.service?.price}{" "}
                  </TableCell>
                  <TableCell>
                    {moment(e?.bookingInfo?.date).format(
                      "MMM Do YY"
                    )}
                    {/* {} */}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${
                        e?.status === "pending" &&
                        "bg-yellow-100 text-yellow-600 text-base rounded-md px-2 p-1"
                      } ${
                        e?.status === "canceled" &&
                        "bg-red-100 text-red-600 text-base rounded-md px-2 p-1"
                      } ${
                        e?.status === "confirmed" &&
                        "bg-green-100 text-green-600 text-base rounded-md px-2 p-1"
                      } `}
                    >
                      {e?.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* {e?.service?.status} */}

                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size={"sm"}
                        onClick={() => handleCancel(e?.id)}
                        className="bg-red-600 text-sm text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        size={"sm"}
                        onClick={() => handleConfirm(e?.id)}
                        className="bg-green-500 text-sm text-white"
                      >
                        Confirm
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
