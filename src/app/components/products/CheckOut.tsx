/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "../../../../lib/convertToSubcurrency";
import { Box, Button, Modal } from "@mui/material";
import { useNewOrderMutation } from "../../../../redux/features/orders/orderAPI";
import toast from "react-hot-toast";
import { clearCart } from "../../../../redux/features/products/productsSlice";
import Loader from "../Loader/Loader";

type Props = {
  amount: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CheckOut: FC<Props> = ({ amount, open, setOpen }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [orderPayment, { isSuccess, error, data }] = useNewOrderMutation();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URI}/payment-success?amount=${amount}`,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message);
    } else {
    }
  };

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setOpen(true);
      });
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [amount, errorMessage]);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
          {!clientSecret || !stripe || !elements ? (
            <Loader smallComp={true} />
          ) : (
            <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
              <form onSubmit={handleSubmit}>
                {clientSecret && <PaymentElement />}

                {errorMessage && (
                  <span className="font-Poppins text-red-600 text-[12px]">
                    {errorMessage}
                  </span>
                )}
                <br />
                <Button
                  variant="contained"
                  className="w-full"
                  disabled={!stripe || loading}
                  onClick={handleSubmit}
                >
                  {!loading ? `Pay: Kshs ${amount}` : "Processing..."}
                </Button>
              </form>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CheckOut;
