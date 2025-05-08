import React, { useEffect } from "react";

// Declare Razorpay types if not available
declare global {
  interface Window {
    Razorpay: any;
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

const Payment: React.FC = () => {
  const options: RazorpayOptions = {
    key: "rzp_test_HJG5Rtuy8Xh2NB",
    amount: "100",
    name: "Acme shop",
    description: "some description",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: "Gaurav",
      contact: "9999999999",
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

  return <button onClick={() => openPayModal(options)}>Pay</button>;
};

export default Payment;
