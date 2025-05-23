"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import CartModal from "../../components/cart";
import {
  ICartItem,
  IMenuItem,
} from "@/app/interface/clientInterface/menu.interface";

function Index() {
  const [menuItems, setMenuItems] = useState<IMenuItem[] | []>([]);
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/menu");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const menuItem = await response.json();
      console.log("Fetched menu items:", menuItem);
      setMenuItems(menuItem.data);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleAddToCart = (item: ICartItem) => {
    const exists = cart.some((cartItem) => cartItem.id === item.id);

    if (exists) {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      item.quantity = 1;
      setCart((prev) => [...prev, item]);
    }
  };

  const ifExist = (item: IMenuItem) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

  const handleOpen = () => setOpen(true);

  const handleIncrement = (index: number) => {
    console.log("index", index);

    if (cart.length) {
      if (cart[index]) {
        cart[index].quantity = (cart[index].quantity ?? 0) + 1;
      }
      setCart([...cart]);
    }
  };
  const handleDecrement = (index: number) => {
    if (cart.length) {
      if (cart[index] && cart[index].quantity !== 1) {
        cart[index].quantity = (cart[index].quantity ?? 0) - 1;
        setCart([...cart]);
      } else {
        setCart(cart.filter((cartItem, i) => i !== index));
      }
    }
  };

  return (
    <div className="w-full">
      <h2 className=" font-bold text-center text-2xl mt-3 dark:text-white">
        Menu Items
      </h2>
      <div className="absolute top-0 right-0 px-4  py-2 rounded dark:text-white">
        <IconButton onClick={handleOpen}>
          <ShoppingCartIcon className="dark:text-white" fontSize="small" />
          <CartBadge
            badgeContent={cart.length}
            color="primary"
            overlap="circular"
          />
        </IconButton>
      </div>
      <div className="flex justify-center p-5">
        <div
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-3"
          // style={{ flexWrap: "wrap", width: "80%" }}
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-amber-100 md:p-4 sm:p-4 p-4  border-gray-900 text-center rounded-xl shadow-xl hover:shadow-gray-600 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 ">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <Image
                src={item.image_url ?? ""}
                width={600}
                alt={item.name}
                height={250}
                style={{
                  // width: "300px",
                  height: "250px",
                  objectFit: "cover",
                  border: "1px solid black",
                  borderRadius: "8px",
                  alignSelf: "center",
                }}
              />
              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="text-lg font-bold text-gray-700">
                  ₹{item.price.toFixed(2)}
                </span>
                <button // onClick={opencart}
                  onClick={() => handleAddToCart(item)}
                  className={` ${
                    ifExist(item)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }  text-white px-4 py-2 rounded  transition`}
                >
                  {ifExist(item) ? (
                    <span className="">Remove to Cart</span>
                  ) : (
                    <span className="">Add to Cart</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CartModal
        open={open}
        setOpen={setOpen}
        cart={cart}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
}

export default Index;
