// src/pages/Register.tsx
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { errorMessage } from "../utility/errorMessage";
import { useInviteRegistrationMutation } from "../api/admin/inviteApi";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
};

const InviteRegistration = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const emailFromURL = searchParams.get("email") || ""; // Get email from query
    // const tokenFromURL = searchParams.get("token") || ""; // Get token from query


    const [inviteRegistration] = useInviteRegistrationMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>();

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        try {
            const res = await inviteRegistration(data).unwrap();

            if (res) {
                toast.success(res?.message);
                reset(); // ✅ form reset correctly
                navigate("/login")
            }
        } catch (error) {
            errorMessage(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E9E9E9] px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Create your account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-500"
                                }`}
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            disabled
                            defaultValue={emailFromURL}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-500"
                                }`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-indigo-500"
                                    }`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-indigo-700"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-60"
                    >
                        {isSubmitting ? <Spinner /> : "Register"}
                    </button>
                </form>

                {/*  */}
            </div>
        </div>
    );
}
export default InviteRegistration;