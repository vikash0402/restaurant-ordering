"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// import prisma from "@/lib/prisma";

function Index() {
  const [menuItems, setMenuItems] = useState<MenuItem[] | []>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleAddToCart = (item: MenuItem) => {
    console.log("Item added to cart:", item);
    const { customerId, available, createdAt, ...rest } = item;
    console.log("cartItem", customerId, available, createdAt);
    setCart((prev) => [...prev, rest]);
  };

  console.log({ cart });

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
    description: string;
    id: number;
    image_url?: string;
    name: string;
    price: number;
  }

  return (
    <div className="">
      <h2 className=" font-bold text-center text-2xl py-2.5  ">Menu Items</h2>
      <div className="flex justify-center w-full ">
        <div
          className="flex gap-5 justify-center "
          style={{ flexWrap: "wrap" }}
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2.5 w-1/4 text-center bg-yellow-100  p-6  rounded-lg shadow hover:shadow-amber-300 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
              <Image
                src={item.image_url ?? ""}
                width={300}
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
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-950 transition"
                >
                  <span className="">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" />
                    </svg> */}
                    Add to Cart
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
