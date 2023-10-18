"use client";
import {
  useCancelBookingAdminMutation,
  useConfirmBookingAdminMutation,
  useGetAllBookingsQuery,
} from "@/redux/feature/booking/bookingApi";
import React from "react";
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
  const { data: bookings } = useGetAllBookingsQuery(1);
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

  return (
    <div>
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
