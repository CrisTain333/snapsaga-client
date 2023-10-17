"use client";

import {
  useDeleteProfileDataMutation,
  useGetAllUserQuery,
} from "@/redux/feature/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Trash2, UserCog2 } from "lucide-react";
import swal from "sweetalert";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const { user, isLoading, token } = useAppSelector(
    (state) => state.auth
  );

  const { toast } = useToast();

  console.log(user);

  const router = useRouter();
  React.useEffect(() => {
    if (isLoading === false) {
      if (user?.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, isLoading]);

  const { data } = useGetAllUserQuery();
  const [deleteUser, { isLoading: deleteLoader }] =
    useDeleteProfileDataMutation();
  console.log(data);

  const handleDeleteUser = async (userId: string) => {
    console.log(userId);
    const id = parseInt(userId);

    swal({
      title: "Are you sure you want to delete user ?",
      text: "Once deleted, you will not be able to recover this user",
      icon: "warning",
      buttons: ["Cancel", "Delete"], // Define buttons as an array,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await deleteUser(id);
        const { data: responseData, error } = response;
        if (responseData?.statusCode === 200) {
          swal("User has been deleted !", {
            icon: "success",
          });
        } else {
          toast({
            variant: "destructive",
            duration: 2500,
            title: error?.data?.message,
          });
        }
      } else {
        swal("Your User is safe!");
      }
    });
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">User Name</TableHead>
            {/* <TableHead>Price</TableHead> */}
            <TableHead>email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((e: any) => (
            <TableRow key={e?.id}>
              <TableCell className="font-medium">
                {e?.name}
              </TableCell>
              <TableCell>${e?.email}</TableCell>
              <TableCell>{e?.role}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-5">
                  <Button
                    size={"sm"}
                    className="text-xs bg-yellow-400 text-white flex items-center justify-center"
                  >
                    <UserCog2 size={15} />
                    <span className="ml-1">Update</span>
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(e?.id)}
                    size={"sm"}
                    className="text-xs bg-red-500 text-white flex items-center justify-center"
                  >
                    <Trash2 size={15} />
                    <span className="ml-1">Delete</span>
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
