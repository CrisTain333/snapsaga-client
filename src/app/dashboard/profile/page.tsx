"use client";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  useUpdateProfileDataMutation,
  useUpdateProfilePictureMutation,
} from "@/redux/feature/user/userApi";
import { getUser } from "@/redux/feature/user/userSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] =
    useState<any>(null);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    profileImage: user?.profileImage,
    location: user?.location,
  });

  const [updateProfilePicture] =
    useUpdateProfilePictureMutation();
  const [updateProfileData, { isLoading }] =
    useUpdateProfileDataMutation();

  useEffect(() => {
    setUserProfileData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      profileImage: user?.profileImage,
      location: user?.location,
    });
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const form = e.target;
    // const name = form.name.value;
    // const email = form.email.value;
    // const phone = form.phone.value;
    // const location = form.location.value;

    // if (password === "") {
    //   toast.error("Please Enter Password to update");
    //   return;
    // }

    const data = {
      name: userProfileData?.name,
      email: userProfileData?.email,
      phone: userProfileData?.phone,
      location: userProfileData?.location,
    };

    const response = await updateProfileData(data);

    const { data: responseData, error } = response;
    if (responseData?.statusCode === 200) {
      toast({
        title: responseData?.message,
      });
      await dispatch(getUser());
      setUploadLoader(false);
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

  // Handle Select Image
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  // Remove selected Image
  const handleCancel = () => {
    setSelectedImage("");
  };

  // Change Profile Picture Function
  const changeProfilePicture = async () => {
    setUploadLoader(true);
    const newForm = new FormData();
    newForm.append("profilePicture", selectedImage);
    try {
      const response = await updateProfilePicture(newForm);

      const { data: responseData, error } = response;

      if (responseData?.statusCode === 200) {
        toast({
          title: responseData?.message,
        });
        handleCancel();
        await dispatch(getUser());
        setUploadLoader(false);
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

      setUploadLoader(false);
    } catch (error) {
      setUploadLoader(false);
      console.log(error);
      // toast.error("Fail To update Profile Picture");
    }
  };

  return (
    <div>
      <div className="w-full">
        {/* profile */}
        <>
          <div className="shadow-md w-[90%] mx-auto rounded-md p-2">
            <div className="flex items-center flex-col justify-start space-x-5 ">
              <div className="relative">
                <div className="relative overflow-hidden h-32 w-32">
                  <Image
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : userProfileData?.profileImage
                    }
                    // src={`${currentUser?.profilePicture || ''}`}
                    className="w-32 h-32 rounded-full object-cover border-[3px] border-[#97ce00]"
                    alt="profilePicture"
                    height={500}
                    width={500}
                  />
                </div>
                {selectedImage && (
                  <Button
                    disabled={uploadLoader}
                    className={`absolute cursor-pointer font-bold -top-5 -right-2 ${
                      uploadLoader && "cursor-not-allowed"
                    }`}
                    onClick={handleCancel}
                  >
                    ✕
                  </Button>
                )}
              </div>

              <div>
                <div className="p-3  mt-2 space-x-5">
                  {selectedImage ? (
                    <Button
                      className={` text-white  text-sm font-semibold px-4 py-2 rounded w-auto cursor-pointer flex items-center ${
                        uploadLoader
                          ? "cursor-not-allowed bg-gray-300"
                          : "bg-[#13a0ef] "
                      }`}
                      disabled={uploadLoader}
                      onClick={changeProfilePicture}
                    >
                      {uploadLoader ? (
                        <>
                          <div
                            className={`flex items-center justify-center`}
                          >
                            <div
                              className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                              role="status"
                            >
                              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                              </span>
                            </div>
                          </div>
                          <p className="ml-2">
                            Uploading ....
                          </p>
                        </>
                      ) : (
                        <>Upload</>
                      )}
                    </Button>
                  ) : (
                    <label
                      htmlFor="profile"
                      className="bg-[#13a0ef] text-white  text-sm font-semibold px-4 py-2 rounded w-auto cursor-pointer"
                      // onClick={handleProfileUpdate}
                    >
                      Change Profile
                    </label>
                  )}
                </div>
                <input
                  onChange={imageChange}
                  type="file"
                  id="profile"
                  name="profilePicture"
                  className=" w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 hidden"
                />
              </div>
            </div>
            <br />
            <br />
            <div className="w-full px-5">
              <form onSubmit={handleSubmit}>
                <div className="w-full md:flex block pb-3">
                  <div className=" w-[100%] md:w-[50%]">
                    <label className="block font-semibold pb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={` border p-2 rounded-md !w-[95%] mb-4 md:mb-0`}
                      required
                      name="name"
                      defaultValue={user?.name}
                      readOnly={false}
                      value={userProfileData?.name}
                      onChange={(e) =>
                        setUserProfileData((prev: any) => {
                          return {
                            ...prev,
                            name: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className=" w-[100%] md:w-[50%]">
                    <label className="block pb-2">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className={` border p-2 rounded-md !w-[95%] mb-1 md:mb-0 cursor-not-allowed`}
                      required
                      readOnly
                      name="email"
                      defaultValue={user?.email}
                      value={userProfileData?.email}
                      onChange={(e) =>
                        setUserProfileData((prev: any) => {
                          return {
                            ...prev,
                            email: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                </div>

                <div className="w-full md:flex block pb-3">
                  <div className=" w-[100%] md:w-[50%]">
                    <label className=" block pb-2">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className={` border p-2 rounded-md !w-[95%] mb-4 md:mb-0`}
                      required
                      name="phone"
                      defaultValue={user?.phone}
                      value={userProfileData?.phone}
                      onChange={(e) =>
                        setUserProfileData((prev: any) => {
                          return {
                            ...prev,
                            phone: e.target.value,
                          };
                        })
                      }
                    />
                  </div>

                  <div className=" w-[100%] md:w-[50%]">
                    <label className="block pb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className={` border p-2 rounded-md !w-[95%] mb-4 800px:mb-0`}
                      // required
                      name="location"
                      defaultValue={user?.location}
                      value={userProfileData?.location}
                      onChange={(e) =>
                        setUserProfileData((prev: any) => {
                          return {
                            ...prev,
                            location: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center pb-4">
                  <Button
                    onClick={handleSubmit}
                    className={`w-[250px] h-[40px] border  text-center bg-[#13a0ef] text-white rounded-md mt-8 cursor-pointer flex justify-center items-center text-base `}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="flex items-center justify-center">
                          <Loader
                            size="33"
                            color="white"
                          />
                          <p>Updating .....</p>
                        </div>
                      </>
                    ) : (
                      <>Update</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default page;
