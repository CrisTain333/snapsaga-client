"use client";
import { useGetServiceQuery } from "@/redux/feature/service/serviceApi";
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

const page = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState();
  const { data: services } =
    useGetServiceQuery(currentPage);

  useEffect(() => {
    if (services) {
      setCurrentPage(services?.meta?.page);
      setTotalPage(services?.meta?.total);
    }
  }, [services]);

  console.log(currentPage, totalPage);

  return (
    <div>
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
                <div className="space-x-3"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
