import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { errorMessage } from "../utility/errorMessage";
import { useLoginMutation } from "../api/auth/authApi";
import Spinner from './../components/Spinner';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>();

    const [login] = useLoginMutation();

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {

        try {
            const res = await login(data).unwrap();
            if (res) {
                toast.success(res?.message);
                localStorage.setItem("token", res?.data?.token);
                localStorage.setItem("role", res?.data?.role);
                reset();
                navigate("/dashboard")
            }
        } catch (error) {
            return errorMessage(error)
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Login to your account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
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
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                            </p>
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
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-indigo-600 cursor-pointer "
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
                        className=" cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-60"
                    >
                        {isSubmitting ? <Spinner /> : "Login"}
                    </button>
                </form>


            </div>
        </div>
    );
}


export default Login;