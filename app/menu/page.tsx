"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import BasicModal from "../components/cart";

// import prisma from "@/lib/prisma";

function Index() {
  const [menuItems, setMenuItems] = useState<MenuItem[] | []>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
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
      const data = await response.json();
      console.log("Fetched menu items:", data);
      setMenuItems(data);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  // const addToCart = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/menu");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     console.log("Fetched menu items:", data);
  //     setMenuItems(data);
  //   } catch (error) {
  //     console.error("Failed to fetch menu items:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleAddToCart = (item: CartItem) => {
    console.log("Item added to cart:", item);
    // const { customerId, available, createdAt, ...rest } = item;
    // console.log("cartItem", customerId, available, createdAt);

    const exists = cart.some((cartItem) => cartItem.id === item.id);

    if (exists) {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      item.quantity = 1;
      setCart((prev) => [...prev, item]);
    }
  };

  const ifExist = (item: MenuItem) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  interface MenuItem {
    available: boolean;
    createdAt?: string;
    customerId?: number;
    description: string;
    id: number;
    image_url?: string;
    name: string;
    price: number;
  }

  interface CartItem {
    available: boolean;
    createdAt?: string;
    customerId?: number;
    description: string;
    id: number;
    image_url?: string;
    name: string;
    price: number;
    quantity?: number;
  }

  // interface CartItem {
  //   description: string;
  //   id: number;
  //   image_url?: string;
  //   name: string;
  //   price: number;
  // }

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
      <h2 className=" font-bold text-center text-2xl  ">Menu Items</h2>
      <button
        // onClick={opencart}
        onClick={handleOpen}
        className="absolute top-4 right-4 text-white px-4 py-2 rounded"
      >
        <IconButton>
          <ShoppingCartIcon fontSize="small" />
          <CartBadge
            badgeContent={cart.length}
            color="primary"
            overlap="circular"
          />
        </IconButton>
      </button>
      <div className="flex justify-center w-full ">
        <div
          className="flex gap-7 justify-center "
          style={{ flexWrap: "wrap" }}
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col  w-1/4 text-center bg-yellow-100  p-6  rounded-lg shadow hover:shadow-amber-300 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 ">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <Image
                src={item.image_url ?? ""}
                width={300}
                alt={item.name}
                height={250}
                style={{
                  height: "250px",
                  objectFit: "cover",
                  border: "1px solid black",
                  borderRadius: "8px",
                  alignSelf: "center",
                }}
              />
              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="text-lg font-bold text-gray-700">
                  ${item.price.toFixed(2)}
                </span>
                <button
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
      <BasicModal
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
