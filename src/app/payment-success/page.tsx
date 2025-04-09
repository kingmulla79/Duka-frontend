/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useNewOrderMutation } from "../../../redux/features/orders/orderAPI";
import { clearCart } from "../../../redux/features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { redirect, useSearchParams } from "next/navigation";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

export default function PaymentSuccess() {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem] = useState(0);
  const hasRun = useRef(false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [openSnackBar, setOpenSnackBar] = useState(true);
  const [countDown, setCounterDown] = useState(10);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  let amount;
  let payment_intent: any;
  let payment_intent_client_secret: any;
  let redirect_status: any;

  if (searchParams?.has("amount")) {
    amount = searchParams.get("amount");
  }
  if (searchParams?.has("payment_intent")) {
    payment_intent = searchParams.get("payment_intent");
  }
  if (searchParams?.has("payment_intent_client_secret")) {
    payment_intent_client_secret = searchParams.get(
      "payment_intent_client_secret"
    );
  }
  if (searchParams?.has("redirect_status")) {
    redirect_status = searchParams.get("redirect_status");
  }

  const { cart } = useSelector((state: any) => state.products);
  const [orderPayment, { isSuccess, error }] = useNewOrderMutation();

  const NewOrder = async () => {
    const payment_info = {
      service: "stripe",
      payment_method: "credit card",
      payment_intent,
      payment_intent_client_secret,
      redirect_status,
    };

    const data = {
      payment_info,
      total_order_price: cart.totalPrice,
      products: cart.items,
    };

    if (cart.totalPrice !== 0) {
      await orderPayment(data);
      dispatch(clearCart());
      localStorage.removeItem("cart");
    }
  };

  function startCountdown(seconds: number) {
    let counter = seconds;

    const interval = setInterval(() => {
      setCounterDown(counter);
      counter--;

      if (counter < 0) {
        clearInterval(interval);
        redirect("/");
      }
    }, 1000);
  }
  useEffect(() => {
    if (!hasRun.current) {
      NewOrder();
      startCountdown(countDown);
      hasRun.current = true;
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order data saved successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
        console.log(errorData?.data?.message);
      }
    }
  }, [error, isSuccess]);

  return (
    <div>
      <Heading
        title="Duka Products Page"
        description="Duka product display page"
        keywords="Shop, products"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <div className="h-screen">
        <main className="max-w-6xl mx-auto p-10 dark:text-white text-black text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
          <div className="mb-10">
            <h1 className={`text-4xl font-extrabold mb-2`}>
              Thank You For Your Purchase
            </h1>
            <h2 className="text-2xl">You successfully sent:</h2>
            <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
              Kshs {amount}
            </div>
          </div>
        </main>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={10000}
          onClose={handleClose}
          message={`You will be redirected to the homepage in ${countDown} seconds.`}
        />
      </div>
    </div>
  );
}
