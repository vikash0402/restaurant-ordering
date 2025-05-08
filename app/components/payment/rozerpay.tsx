import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const RazorpayPaymentComponent = () => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = () => {
    const options: RazorpayOrderOptions = {
      key: "rzp_test_HJG5Rtuy8Xh2NB",
      amount: 100, // Amount in paise
      currency: "INR",
      name: "Food Test Company",
      description: "Food Test Transaction",
      order_id: "order_9A33XWu170gUtm", // Generate order_id on server
      image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
        hide_topbar: false,
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}
      <button onClick={handlePayment} disabled={isLoading}>
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPaymentComponent;
