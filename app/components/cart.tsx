"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  // SwipeableDrawer,
  Typography,
} from "@mui/material";
import UserForm from "@/app/components/userForm";
import Payment from "./payment/payment";
import { OrderResponse } from "../interface/clientInterface/order.interface";

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
  // setCart: () => void;
  open: boolean;
  handleDecrement: (index: number) => void;
  handleIncrement: (index: number) => void;
  setOpen: (open: boolean) => void;
}

interface IFormInputs {
  id: number | null;
  name: string;
  phone: number | null;
}

interface OrderPayload {
  order: {
    customerId: number | null;
    status: string;
    total_amount: number;
    delivery_charge: number;
    platform_charge: number;
    sms_charge: number;
    payment_status: boolean;
  };
  order_item: {
    quantity: number;
    unit_price: number;
    orderId: number | null;
    menuItemId: number;
  }[];
}

const CartModal: React.FC<BasicModalProps> = ({
  cart,
  open,
  handleDecrement,
  handleIncrement,
  setOpen,
}) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [user, setUser] = useState<IFormInputs>({
    id: null,
    name: "",
    phone: null,
  });

  const [orderResponce, setOrderResponce] = useState<OrderResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setOpen(false);

  const totalCharge = () => {
    return cart.reduce(
      (acc, curr) => acc + (curr.quantity ?? 0) * curr.price,
      0
    );
  };

  console.log({ orderResponce });

  const chargesDetails: { key: string; value: number }[] = [
    { key: "Items total", value: totalCharge() },
    { key: "Delivery charge", value: cart.length ? 40 : 0 },
    { key: "Handling charge", value: cart.length ? 10 : 0 },
    { key: "SMS charge", value: cart.length ? 5 : 0 },
  ];

  const handleCheckOut = () => {
    console.log(cart);
    setOpenForm(true);
  };

  useEffect(() => {
    console.log(user);
    if (user.id) {
      createOrder(user);
    }
  }, [user]);

  const createOrder = async (user: IFormInputs) => {
    const paylaod: OrderPayload = {
      order: {
        customerId: user.id,
        status: "PENDING",
        total_amount: chargesDetails[0].value,
        delivery_charge: chargesDetails[1].value,
        platform_charge: chargesDetails[2].value,
        sms_charge: chargesDetails[3].value,
        payment_status: false,
      },

      order_item: cart.map((item) => {
        return {
          quantity: item.quantity ?? 0,
          unit_price: item.price,
          orderId: null,
          menuItemId: item.id,
        };
      }),
    };

    console.log({ paylaod });

    if (user.id) {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paylaod),
      });

      const res = await response.json();

      if (res.success === true) {
        const data: OrderResponse = res.data;
        setOrderResponce({
          ...data,
          grand_total:
            data.total_amount +
            data.sms_charge +
            data.delivery_charge +
            data.platform_charge,
        });
      }
      console.log("order response", res);

      setIsLoading(false);
      setOpenForm(false);
    }
  };

  // const toggleDrawer =
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //     if (
  //       event &&
  //       event.type === "keydown" &&
  //       ((event as React.KeyboardEvent).key === "Tab" ||
  //         (event as React.KeyboardEvent).key === "Shift")
  //     ) {
  //       return;
  //     }
  //     setOpenForm(open);
  //   };

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
            // overflow: "scroll",
            overflowX: "hidden",
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
              <Box className="flex justify-between₹73.98 py-1">
                <Typography fontWeight={600} fontSize={20}>
                  Grand total{" "}
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

          {openForm && (
            <UserForm
              setUser={setUser}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}

          {!openForm && !user?.name && (
            <Box className="flex justify-center" onClick={handleCheckOut}>
              <Button variant="outlined">Check Out </Button>
              {/* <SwipeableDrawer
                anchor={"bottom"}
                open={openForm}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <Box
                  sx={{
                    width: "auto",
                  }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <UserForm setUser={setUser} setOpenForm={setOpenForm} />
                </Box>
              </SwipeableDrawer> */}
            </Box>
          )}
          {user?.name && (
            <Payment
              amount={orderResponce?.grand_total ?? 0}
              contact={user.phone ?? 0}
              customerName={user.name}
              orderId={Number(orderResponce?.id)}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CartModal;
