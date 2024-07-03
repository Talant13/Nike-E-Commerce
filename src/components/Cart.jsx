import React, { useEffect } from "react";
import CartCount from "./cart/CartCount";
import CartEmpty from "./cart/CartEmpty";
import CartItem from "./cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setCloseCart,
  selectCartState,
  selectCartItems,
  selectTotalQTY,
  setGetTotals,
} from "../app/CartSlice.js";
import { combineSlices } from "@reduxjs/toolkit";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQTY = useSelector(selectTotalQTY);

  useEffect(() => {
    dispatch(setGetTotals());
  }, [cartItems, dispatch]);

  const ifCartState = useSelector(selectCartState);
  const onCartToggle = () => {
    dispatch(setCloseCart({ cartState: false }));
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-500 w-full h-screen opacity-100 z-[250] ${
          ifCartState
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-8"
        }`}>
        <div
          className={`blur-effect-theme duration-500 h-screen max-w-xl w-full absolute right-0`}>
          <CartCount onCartToggle={onCartToggle} totalQTY={totalQTY} />
          {cartItems?.length === 0 ? (
            <CartEmpty onCartToggle={onCartToggle} />
          ) : (
            <div>
              <div>
                {cartItems.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
