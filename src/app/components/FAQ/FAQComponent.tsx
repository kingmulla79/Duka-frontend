/* eslint-disable @typescript-eslint/no-explicit-any */
import { styles } from "@/app/styles/style";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useGetFAQsQuery } from "../../../../redux/features/FAQ/FAQAPI";
import Collapse from "@mui/material/Collapse";

const FAQComponent = () => {
  const { data } = useGetFAQsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.FAQs);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto">
      <h1 className={`${styles.title} 800px:text-[40px]`}>
        Frequently Asked Questions
      </h1>
      <div className="mt-12 mb-20">
        <dl className="space-y-8">
          {" "}
          {/* description list */}
          {questions.map((q) => (
            <div
              key={q.id}
              className={`${
                q.id !== questions[0]?.id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q.id)}
                >
                  <span className="font-medium text-black dark:text-white">
                    {q.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {activeQuestion === q.id ? (
                      <HiMinus className="h-6 w-6 text-black dark:text-white" />
                    ) : (
                      <HiPlus className="h-6 w-6 text-black dark:text-white" />
                    )}
                  </span>
                </button>
              </dt>

              <Collapse in={activeQuestion === q.id}>
                <dd className="mt-2 pr-12">
                  <p className="text-base font-Poppins text-black dark:text-white">
                    {q.answer}
                  </p>
                </dd>
              </Collapse>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQComponent;
