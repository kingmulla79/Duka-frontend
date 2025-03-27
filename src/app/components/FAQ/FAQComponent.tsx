/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import { useGetFAQsQuery } from "../../../../redux/features/FAQ/FAQAPI";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Props = {
  homepage?: boolean;
};
const FAQComponent: FC<Props> = ({ homepage }) => {
  const { data } = useGetFAQsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const [questions, setQuestions] = useState<any[]>([]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (data) {
      setQuestions(data?.FAQs);
    }
    if (homepage) {
      setQuestions(data?.FAQs.slice(0, 9));
    }
  }, [data, homepage]);

  return (
    <div
      className={`w-[90%] 800px:w-[80%] m-auto ${homepage && "!mt-1"} mt-4 `}
    >
      <h1
        className={`text-[25px] font-Poppins pl-5 !pb-4 font-extrabold text-black dark:text-white text-center`}
      >
        Frequently Asked Questions
      </h1>
      <div className="mt-4 mb-6">
        {questions?.map((q) => (
          <Accordion
            key={q.id}
            expanded={expanded === q.id}
            onChange={handleChange(q.id)}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <span className="text-[12px] md:text-[15px] font-semibold font-Poppins text-black dark:text-white">
                {q.question}
              </span>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-[12px] md:text-[15px] font-Poppins text-black dark:text-white">
                {q.answer}
              </p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;
