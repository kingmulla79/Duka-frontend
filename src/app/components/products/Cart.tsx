/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeItem,
  clearCart,
} from "../../../../redux/features/products/productsSlice";
import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import convertToSubcurrency from "../../../../lib/convertToSubcurrency";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const Cart: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  const [checkOut, setCheckOut] = React.useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { cart } = useSelector((state: any) => state.products);

  const handleQuantityChange = (id: string, qty: number) => {
    if (qty >= 1) {
      dispatch(updateQuantity({ id, qty }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  console.log(cart);
  return (
    <div className="mx-auto p-6 min-h-screen">
      <h1 className="text-black dark:text-white font-Poppins text-2xl font-bold mb-4">
        Shopping Cart
      </h1>

      {cart.totalQty === 0 ? (
        <p className="text-black dark:text-white font-Poppins">
          Your cart is empty.
        </p>
      ) : (
        <div className="text-black dark:text-white font-Poppins shadow-md rounded-lg p-4">
          {Object.values(cart.items).map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-around border-b py-4"
            >
              <div>
                <Image
                  src={item.prod_url}
                  width={50}
                  height={50}
                  alt={`${item.name}`}
                  className="h-[90px] w-[90px] 800px:h-[150px] 800px:w-[150px] my-auto"
                  unoptimized
                />
              </div>
              <div className="w-[70%]">
                <h2 className="text-[14px] md:text-[18px] font-semibold">
                  {item.name}
                </h2>
                <p className="text-gray-600 dark:text-white font-Poppins text-[13px] md:text-[15px] ">
                  Kshs {item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col items-center space-x-2">
                <div className="space-x-1 400px:space-x-2 md:space-x-6">
                  {item.qty === 1 ? (
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(item.id, item.qty - 1)
                      }
                      className="400px:size-3"
                      disabled
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(item.id, item.qty - 1)
                      }
                      className="400px:size-3"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                  )}
                  {/* <IconButton
                    onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                    className="size-1 400px:size-3"
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton> */}
                  <span className="text-[10px] 400px:text-[12px] 800px:text-[14px] text-black dark:text-white font-Poppins font-medium">
                    {item.qty}
                  </span>
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                    className="400px:size-3"
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
                <div>
                  <p className="text-black dark:text-white font-Poppins text-[13px] md:text-[15px] font-medium">
                    Kshs {(item.qty * item.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.totalQty > 0 && (
        <div>
          <div className="mt-6 p-4 border-t">
            <p className="text-black dark:text-white text-xl font-Poppins font-bold">
              Total: Kshs {cart.totalPrice.toFixed(2)}
            </p>
            <p className="text-gray-600 dark:text-white font-Poppins text-[13px] md:text-[15px] font-medium">
              Total Items: {cart.totalQty}
            </p>
            <Button
              variant="contained"
              className="w-fit my-3"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear Cart
            </Button>
          </div>
          <div className="flex flex-col items-center w-full">
            <FormControl>
              <FormControlLabel
                required
                control={<Checkbox checked={checked} onChange={handleChange} />}
                label="I have read and agree to the website terms and conditions"
                className="text-black dark:text-white"
              />
            </FormControl>
            {checked ? (
              <Button
                variant="contained"
                className="w-fit my-3"
                onClick={() => {
                  setCheckOut(true);
                  setOpen(true);
                }}
              >
                Checkout
              </Button>
            ) : (
              <Button variant="contained" className="w-fit my-3" disabled>
                Checkout
              </Button>
            )}
          </div>
        </div>
      )}
      {checkOut && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(cart.totalPrice),
            currency: "kes",
          }}
        >
          <CheckOut amount={cart.totalPrice} open={open} setOpen={setOpen} />
        </Elements>
      )}
    </div>
  );
};

export default Cart;
