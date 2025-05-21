import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Declare Razorpay types if not available
declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): {
        open: () => void;
      };
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount: string;
  name: string;
  description: string;
  image: string;
  handler: (response: { razorpay_payment_id: string }) => void;
  prefill: {
    name: string;
    contact: string;
    email: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
    hide_topbar: boolean;
  };
}

interface PaymentProps {
  amount: number;
  customerName: string;
  contact: number;
  orderId: number;
}

const Payment: React.FC<PaymentProps> = ({
  amount,
  customerName,
  contact,
  orderId,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log({ loading });
  const updatePaymentStatus = async (paymentId: string) => {
    setLoading(true);
    const data = { status: "PAID", paymentId: paymentId };

    console.log("payment payload", data);
    console.log("order id", orderId);
    const updateOrderEndpoint = `/api/order/${orderId}`;

    const response = await fetch(updateOrderEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const payment = await response.json();
    const redirectPath: string | undefined = payment.data.redirect_path;
    // const baseUrl: string | undefined =
    //   process.env.NODE_ENV === "production"
    //     ? process.env.BASE_URL
    //     : "http://localhost:3000";

    if (payment?.success === true) {
      if (typeof redirectPath === "string") {
        // const finalURL = baseUrl + redirectPath;
        // console.log(finalURL);
        // window.location.href = finalURL;
        router.push(redirectPath);
        console.log("payment sucessfully done");
        setLoading(false);
      }
    }
  };

  console.log({ amount, customerName, contact });
  const options: RazorpayOptions = {
    key: "rzp_test_HJG5Rtuy8Xh2NB",
    amount: `${Math.round(amount * 100)}`,
    name: "Vikas Restaurant",
    description: "The Heartbeat of Indian Flavor.",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (data) {
      alert(data.razorpay_payment_id);
      updatePaymentStatus(data.razorpay_payment_id);
    },
    prefill: {
      name: customerName,
      contact: contact.toString(),
      email: "demo@demo.com",
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "#F37254",
      hide_topbar: false,
    },
  };

  const openPayModal = (options: RazorpayOptions) => {
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Box className="flex justify-center">
      <Button
        sx={{ background: "red" }}
        variant="contained"
        onClick={() => openPayModal(options)}
      >
        Pay Now{" "}
      </Button>
    </Box>
  );
};

export default Payment;

// const payment = await response.json();
// const redirectPath = baseUrl+payment.data.redirect_path
// if (payment?.success === true) {
// window.location.href = baseUrl+payment.data.redirect_path};
//   console.log("payment sucessfully done");
// }
