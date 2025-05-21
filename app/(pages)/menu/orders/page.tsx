import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import { SingleOrder } from "@/app/interface/apiInterface/order.interface";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  searchParams: Promise<{ customerId?: string }>;
}

async function Orders({ searchParams }: Props) {
  const { customerId } = await searchParams;

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/order?customerId=${customerId}`,
    {
      cache: "default",
    }
  );
  const orders: SingleOrder[] = (await response.json()).data;

  if (!customerId) {
    return (
      <Box className="flex flex-col w-full ">
        <Box className="bg-gray-200 py-3 text-center ">
          <Typography fontWeight={600}>No Customer Id</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col w-full ">
      <Box className="bg-gray-200 py-3 text-center ">
        <Typography fontWeight={600}>PAST ORDERS</Typography>
      </Box>
      {orders &&
        orders.length &&
        orders.map((order) => (
          <Box key={order.orderId} className="flex flex-col mx-5 border-b-2">
            <Box className="flex w-full justify-between pt-5 pb-3">
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
                  Vikash Resturant
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "gray" }}>
                  Sudma Nagar
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "gray",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  ₹{order.total}
                  <KeyboardArrowRightIcon
                    sx={{ fontSize: "20px", color: "gray" }}
                  />
                </Typography>
              </Box>
              {order.status === true ? (
                <Box className="flex gap-1.5 justify-center align-middle font-extralight text-gray-500">
                  <Typography> Delivered</Typography>
                  <CheckCircleIcon
                    sx={{ color: "#00f721", fontSize: "20px" }}
                  />
                </Box>
              ) : (
                <Box className="flex gap-1.5 justify-center align-middle font-extralight text-gray-500">
                  <Typography> Not Delivered</Typography>
                  <CancelIcon sx={{ color: "red", fontSize: "20px" }} />
                </Box>
              )}
            </Box>
            <div
              // style={{ borderBlockStart: "2px" }}
              className="w-full border-t border-dotted  "
            ></div>
            <Box className="flex justify-between">
              <Box className=" pb-4 pt-3">
                <Typography sx={{ fontSize: "16px", color: "gray" }}>
                  {order.orderItem}{" "}
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#515352" }}>
                  {order.date}
                </Typography>
              </Box>
              <Link href={`/menu/orders/${order.orderId}`}>
                <Box className="flex gap-1.5 h-full">
                  <Typography sx={{ alignSelf: "center" }}>View</Typography>
                  <VisibilityIcon
                    sx={{ alignSelf: "center" }}
                    color="success"
                  />
                </Box>
              </Link>
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default Orders;
