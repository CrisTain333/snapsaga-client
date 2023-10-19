"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateFaqMutation,
  useGetFaqQuery,
} from "@/redux/feature/faq/faqApi";
import { useToast } from "@/components/ui/use-toast";
import swal from "sweetalert";

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data, isLoading } = useGetFaqQuery();

  const { toast } = useToast();
  const [createFaq] = useCreateFaqMutation();

  const createFaqHandler = async () => {
    if (
      title === "" ||
      title === null ||
      title === undefined
    ) {
      toast({
        title: "please add a title",
        variant: "destructive",
      });
      return;
    } else if (
      content === "" ||
      content === null ||
      content === undefined
    ) {
      toast({
        title: "please add a content",
        variant: "destructive",
      });
      return;
    }

    const data = {
      title,
      content,
    };
    const response = await createFaq(data);
    const { data: responseData, error } = response;
    if (responseData?.statusCode === 200) {
      swal("Faq has been Added !", {
        icon: "success",
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
      <div className="flex items-center justify-start">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Create</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create FAQ</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Title</Label>
                <Input
                  placeholder="faq title"
                  //   name="title"
                  value={title}
                  onChange={(e: any) =>
                    setTitle(e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Content
                </Label>
                <Textarea
                  value={content}
                  onChange={(e: any) =>
                    setContent(e.target.value)
                  }
                  placeholder="faq content"
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <Button onClick={createFaqHandler}>
                Add
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Table>
        <TableCaption>
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              Title
            </TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-right">
              action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((e: any) => (
            <TableRow key={e?.id}>
              <TableCell className="font-medium">
                {e?.title}
              </TableCell>
              <TableCell>
                {e?.content?.slice(0, 60)}...
              </TableCell>
              <TableCell className="text-right">
                {/* {invoice.totalAmount} */}
                <div className="flex items-center justify-end space-x-2">
                  <Button>Edit</Button>
                  <Button>delete</Button>
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
