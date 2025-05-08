"use client";
import * as React from "react";
import Image from "next/image";
import { Box, Button, ButtonGroup, Modal, Typography } from "@mui/material";
import Payment from "./payment/payment";

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

interface BasicModalProps {
  cart: CartItem[];
  open: boolean;
  handleDecrement: (index: number) => void;
  handleIncrement: (index: number) => void;
  setOpen: (open: boolean) => void;
}

export default function BasicModal({
  cart,
  open,
  handleDecrement,
  handleIncrement,
  setOpen,
}: BasicModalProps) {
  const handleClose = () => setOpen(false);

  console.log({ cart });

  const totalCharge = () => {
    return cart.reduce(
      (acc, curr) => acc + (curr.quantity ?? 0) * curr.price,
      0
    );
  };

  const chargesDetails: { key: string; value: number }[] = [
    { key: "Items total", value: totalCharge() },
    { key: "Delivery charge", value: cart.length ? 40 : 0 },
    { key: "Handling charge", value: cart.length ? 10 : 0 },
    { key: "SMS charge", value: cart.length ? 5 : 0 },
  ];

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "relative",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            padding: 2,
            maxWidth: "70vw",
            margin: "auto",
            backgroundColor: "#fff",
            bgcolor: "background.paper",
            boxShadow: 24,
            top: "10%",
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          {cart.length ? (
            cart.map((cartItem, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 1,
                }}
                key={cartItem.name + index}
              >
                <Box>
                  <Image
                    src={cartItem.image_url ?? ""}
                    alt={cartItem.name}
                    width={70}
                    height={70}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {cartItem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    400 g
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      mt: 0.5,
                    }}
                    color="primary"
                  >
                    Save for later
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <ButtonGroup
                    variant="contained"
                    size="small"
                    aria-label="Quantity control"
                  >
                    <Button onClick={() => handleDecrement(index)}>-</Button>
                    <Button disabled>{cartItem.quantity ?? 0}</Button>
                    <Button onClick={() => handleIncrement(index)}>+</Button>
                  </ButtonGroup>
                  <Typography fontWeight="bold" sx={{ mt: 1 }}>
                    ₹{cartItem.price}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Box className="text-lg text-center">
              <Typography>NO ITEM FOUND</Typography>
            </Box>
          )}
          <Box>
            <Typography fontWeight={600} fontSize={18} mt={3}>
              Bill Details
            </Typography>
            <Box className="flex flex-col">
              {chargesDetails.map((charges, index) => (
                <Box key={charges.key + index} className="flex justify-between">
                  <Typography>{charges.key}</Typography>
                  <Typography>₹{charges.value}</Typography>
                </Box>
              ))}
              <Box className="flex justify-between py-1">
                <Typography fontWeight={600} fontSize={20}>
                  Grand total
                </Typography>
                <Typography fontWeight={600} fontSize={20}>
                  ₹
                  {chargesDetails
                    .reduce((acc, curr) => acc + curr.value, 0)
                    .toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Payment />
        </Box>
      </Modal>
    </div>
  );
}
