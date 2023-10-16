"use client";
import {
  useCancelBookingMutation,
  useGetBookingsQuery,
} from "@/redux/feature/booking/bookingApi";
import React, { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import Rating from "react-rating";
import { Rating as ReactRating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/redux/hooks";
import { useCreateReviewMutation } from "@/redux/feature/review/reviewApi";
import Loader from "@/components/Loader/Loader";

const page = () => {
  const [rating, setRating] = useState(0);
  const [serviceId, setServiceId] = useState();
  const { data } = useGetBookingsQuery();
  const [cancelBooking] = useCancelBookingMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [addReview, { isLoading }] =
    useCreateReviewMutation();

  const { toast } = useToast();

  const handleCancelBooking = async (bookingId: any) => {
    console.log(bookingId);

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

  // console.log();

  const handleAddReview = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Please Select Rating",
      });
      return;
    } else if (
      message === undefined ||
      message === "" ||
      message === null
    ) {
      toast({
        variant: "destructive",
        title: "Please write your message",
      });
      return;
    }

    const data = {
      serviceId: serviceId,
      userId: user.id,
      message,
      rating: rating.toString(),
    };

    const response = await addReview(data);
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
          A list of your recent Bookings
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Service Name</TableHead>
            {/* <TableHead>Price</TableHead> */}
            <TableHead>Amount</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((e: any) => (
            <TableRow key={e?.id}>
              <TableCell className="font-medium">
                {e?.service?.title}
              </TableCell>
              <TableCell>${e?.service?.price}</TableCell>
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
                <div className="space-x-3">
                  {e?.status !== "confirmed" && (
                    <Button
                      className="bg-red-500 text-white"
                      onClick={() =>
                        handleCancelBooking(e?.id)
                      }
                    >
                      Cancel
                    </Button>
                  )}

                  {e?.status === "confirmed" && (
                    <>
                      <Sheet>
                        <SheetTrigger>
                          <Button
                            className="bg-cyan-400 text-white"
                            onClick={() =>
                              setServiceId(e?.service?.id)
                            }
                          >
                            Add Review
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle className="mt-5">
                              Add a Review For{" "}
                              {e?.service?.title}
                            </SheetTitle>
                            <SheetDescription>
                              <form
                                onSubmit={handleAddReview}
                              >
                                <div className="mt-5">
                                  <p className="text-base">
                                    Your Review
                                  </p>

                                  <Textarea
                                    className="mt-3"
                                    name="message"
                                    placeholder="Type your message here."
                                  />

                                  <p className="text-base mt-5">
                                    Select Rating
                                  </p>
                                  <ReactRating
                                    className="mt-3"
                                    style={{
                                      maxWidth: 150,
                                    }}
                                    value={rating}
                                    isRequired={true}
                                    onChange={setRating}
                                  />
                                </div>

                                <div className="flex items-center justify-center mt-5">
                                  <Button type="submit">
                                    {isLoading ? (
                                      <>
                                        <div className="flex items-center">
                                          <Loader
                                            color="white"
                                            size="31"
                                          />
                                          <span className="ml-1">
                                            Adding . . .
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <>Add Review</>
                                    )}
                                  </Button>
                                </div>
                              </form>
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </>
                  )}
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
