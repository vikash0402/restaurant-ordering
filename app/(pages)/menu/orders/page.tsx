import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import { OrderResponse } from "@/app/interface/clientInterface/order.interface";
// OrderResponse[]
async function Index() {
  const response = await fetch("http://localhost:3000/api/order");
  const order = await response.json();

  console.log(" orderswegethere", JSON.stringify(order));

  return (
    <Box className="flex flex-col w-full ">
      <Box className="bg-gray-200 py-3 text-center ">
        <Typography fontWeight={600}>PAST ORDERS</Typography>
      </Box>
      {[1, 2, 3, 4, 5].map((order, index: number) => (
        <Box key={index} className="flex flex-col mx-5 border-b-2">
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
                ₹209.0
                <KeyboardArrowRightIcon
                  sx={{ fontSize: "20px", color: "gray" }}
                />
              </Typography>
            </Box>
            <Box className="flex gap-1.5 justify-center align-middle font-extralight text-gray-500">
              <Typography> Delivered</Typography>
              <CheckCircleIcon sx={{ color: "#00f721", fontSize: "20px" }} />
            </Box>
          </Box>
          <div
            // style={{ borderBlockStart: "2px" }}
            className="w-full border-t border-dotted  "
          ></div>
          <Box className="pb-4 pt-3">
            <Typography sx={{ fontSize: "16px", color: "gray" }}>
              Amul Masti Dahi * 2, Parle Kurkure * 4, Maggi * 5{" "}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#515352" }}>
              May 6, 11:18 PM
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Index;
