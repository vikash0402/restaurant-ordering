"use client";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  name: string;
  phone: number;
}

interface IUserForm {
  setOpenForm: (data: boolean) => void;
  setUser: (data: IFormInputs) => void;
}

const UserForm: React.FC<IUserForm> = ({ setUser, setOpenForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    setUser(data);
    setOpenForm(false);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Payment Details
        </h2>

        <input
          placeholder="Full Name"
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && (
          <span className="text-red-500"> Name is required </span>
        )}
        <input
          placeholder="Phone Number"
          {...register("phone", {
            required: true,
            minLength: 10,
            maxLength: 10,
          })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.phone && (
          <span className="text-red-500"> Phone no is required </span>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
