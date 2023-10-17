"use client";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCreateFeedbackMutation } from "@/redux/feature/feedback/feedbackApi";
import React from "react";

const page = () => {
  const { toast } = useToast();
  const [addFeedback, { isLoading }] =
    useCreateFeedbackMutation();

  const handleSubmitFeedBack = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const message = form.feedback.value;

    if (email === "" || email === undefined) {
      toast({
        title: "email is required",
        variant: "destructive",
      });
      return;
    } else if (message === "" || message === undefined) {
      toast({
        title: "message is required",
        variant: "destructive",
      });
      return;
    }

    const data = {
      email,
      message,
    };

    const response = await addFeedback(data);
    const { data: responseData, error } = response;
    if (responseData?.statusCode === 200) {
      toast({
        title: responseData?.message,
      });

      form.reset();
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
      <section>
        <div className=" py-10">
          <div className="w-[90%] mx-auto flex flex-col md:flex-row my-6 md:my-20">
            <div className="flex flex-col w-full md:w-1/2  p-8">
              <p className="ml-6 text-yellow-300 text-lg uppercase tracking-loose">
                REVIEW
              </p>
              <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">
                Leave us a feedback!
              </p>
              <p className="text-sm md:text-base leading-snug  text-opacity-100">
                Please provide your valuable feedback and
                something something ...
              </p>
            </div>
            <div
              className="flex flex-col w-full md:w-1/2
             justify-center"
            >
              <div className=" w-full  px-4">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full  px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                      <div className="flex-auto p-5 lg:p-10">
                        <h4 className="text-2xl mb-4 text-black font-semibold">
                          Have a suggestion?
                        </h4>
                        <form
                          id="feedbackForm"
                          onSubmit={handleSubmitFeedBack}
                        >
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="border-0 px-3 py-3 rounded text-sm shadow w-full
                     placeholder-black text-gray-800 outline-none"
                              placeholder=" "
                              // style="transition: all 0.15s ease 0s;"
                              required
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="message"
                            >
                              Message
                            </label>
                            <textarea
                              maxLength={300}
                              name="feedback"
                              id="feedback"
                              rows={4}
                              cols={80}
                              className="border-0 px-3 py-3  placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                              placeholder=""
                              required
                            ></textarea>
                          </div>
                          <div className="text-center mt-6">
                            <Button
                              className="bg-sky-400 text-white text-center mx-auto  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              type="submit"
                              // style="transition: all 0.15s ease 0s;"
                            >
                              {isLoading ? (
                                <>
                                  <div className="flex items-center justify-center">
                                    <Loader
                                      size="30"
                                      color="white"
                                    />
                                    <p>Submitting ....</p>
                                  </div>
                                </>
                              ) : (
                                <>Submit</>
                              )}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
