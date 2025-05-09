"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log({ response });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <input
          placeholder="Full Name"
          {...register("name", { required: true, maxLength: 20 })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && <span className="text-red-500"> Name is required</span>}
        <input
          placeholder="Email"
          {...register("email", { required: true, maxLength: 20 })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <span className="text-red-500"> Email is required </span>
        )}
        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <span className="text-red-500"> Password is required </span>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
