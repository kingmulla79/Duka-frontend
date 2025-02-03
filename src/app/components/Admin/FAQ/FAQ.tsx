/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import {
  useGetFAQsQuery,
  useNewFAQMutation,
} from "../../../../../redux/features/FAQ/FAQAPI";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import FAQComponent from "../../FAQ/FAQComponent";

const FAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [uploadFAQ, { isSuccess, error }] = useNewFAQMutation();
  const { isLoading, data, refetch } = useGetFAQsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const handleSubmit = async () => {
    const data = { answer, question };
    await uploadFAQ(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("FAQ uploaded");
      setAnswer("");
      setQuestion("");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, refetch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full justify-center justify-items-center mt-16">
          <form onSubmit={handleSubmit} className="w-[65%]">
            <h2 className="text-black dark:text-white font-Poppins font-bold text-3xl mb-6">
              FAQ form
            </h2>
            <div className="text-black dark:text-white w-full">
              <TextField
                id="question"
                label="FAQ question"
                multiline
                rows={3}
                placeholder="Enter the FAQ question"
                variant="filled"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                fullWidth
              />
            </div>
            <div className="text-black dark:text-white w-full my-4">
              <TextField
                id="answer"
                label="FAQ answer"
                multiline
                rows={3}
                variant="filled"
                placeholder="Enter the FAQ answer"
                fullWidth
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-6 mb-10 w-full">
              <Button
                variant="contained"
                startIcon={<PublishIcon />}
                onClick={handleSubmit}
              >
                Publish FAQ
              </Button>
            </div>
          </form>
          <FAQComponent />
        </div>
      )}
    </>
  );
};

export default FAQ;
