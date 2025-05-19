import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";
type KeyValueDetail = {
  key: string;
  value: number;
};

type Transaction = {
  transactionId: string;
  itemDetails: KeyValueDetail[];
  chargeDetails: KeyValueDetail[];
  status: "PAID" | "UNPAID" | "PENDING" | string;
  total: number;
};

interface ResponseData {
  success: boolean;
  statusCode: number;
  data: Transaction;
  message: string;
}

async function fetchOrderDetails(id: number): Promise<ResponseData> {
  const res = await fetch("http://localhost:3000/api/order/" + id, {
    cache: "no-store", // disables caching
  });

  if (!res.ok) {
    throw new Error("Failed to Order Details");
  }

  return res.json();
}

async function page({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const orderDetails = (await fetchOrderDetails(Number(orderId))).data;

  return (
    <Box>
      <Box>
        <Box className="flex justify-start p-2 gap-2">
          <Box>
            <Link href="/menu/orders">
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box>
            <Typography fontWeight={600}>
              ORDER #{orderDetails.transactionId}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "gray" }}>
              {orderDetails.status} | {orderDetails.itemDetails.length} Items, ₹
              {orderDetails.total}{" "}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1, backgroundColor: "#f5f5f5", p: 2 }}>
          <Typography color="textDisabled" fontWeight={600}>
            Item Details
          </Typography>
        </Box>
        <Box className="flex flex-col shadoww px-2 ">
          <Box className="flex p-2 justify-between">
            <Box>
              <Typography>Delivery</Typography>
              <Typography>{orderDetails.itemDetails.length} Items</Typography>
            </Box>
            <Box className="flex justify-center items-center gap-1.5  ">
              <CheckCircleIcon color="success" />
              <Typography color="success" fontWeight={600}>
                Delivered{" "}
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Box className="flex flex-col p-2">
            {orderDetails.itemDetails.map((item, index) => (
              <Box
                key={index + item.value}
                className="flex p-2 justify-between"
              >
                <Box className="flex justify-start gap-1.5">
                  <DoneIcon sx={{ color: "green" }} />
                  <Typography>{item.key}</Typography>
                </Box>
                <Box className="flex justify-end ">
                  <Typography> ₹{item.value} </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          className="py-2 px-3"
          sx={{ display: "flex", gap: 1, backgroundColor: "#f5f5f5" }}
        >
          <Typography color="textDisabled" fontWeight={600}>
            Total Order Bill Details
          </Typography>
        </Box>
        <Box className="flex flex-col p-2">
          {orderDetails.chargeDetails.map((charge, index) => (
            <Box key={index} className="flex p-2 justify-between  ">
              <Box className="flex justify-start  ">
                <Typography>{charge.key}</Typography>
              </Box>
              <Box className="flex justify-end ">
                <Typography> ₹{charge.value}</Typography>
              </Box>
            </Box>
          ))}

          <Divider sx={{ marginY: 1 }} />
          <Box className="flex p-2 justify-between  ">
            <Box className="flex justify-start ">
              <Typography>Grand Total</Typography>
            </Box>
            <Box className="flex justify-end ">
              <Typography> ₹{orderDetails.total}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default page;
