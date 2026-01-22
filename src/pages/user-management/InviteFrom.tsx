// src/components/InviteForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

// Define form data type
type InviteFormData = {
    email: string;
    role: "ADMIN" | "MANAGER" | "STAFF";
};

// Define props type
type InviteFormProps = {
    setInviteModal: (open: boolean) => void; // function to close modal
    // onInvite: (data: InviteFormData) => void; // function to handle form submit
};

const InviteForm: React.FC<InviteFormProps> = ({ setInviteModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<InviteFormData>({
        defaultValues: {
            role: "STAFF",
        },
    });

    const onSubmit: SubmitHandler<InviteFormData> = (data) => {
        console.log(data)
        // onInvite(data); // pass data to parent or API
        reset(); // clear form after submit
        setInviteModal(false); // close modal
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm relative">
            {/* Close button */}
            <button
                onClick={() => setInviteModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl font-bold cursor-pointer"
            >
                &times;
            </button>

            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Invite User</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                            })}
                            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Role */}
                    <div className="flex flex-col">
                        <label htmlFor="role" className="mb-1 font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            {...register("role", { required: "Role is required" })}
                            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.role ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="STAFF">STAFF</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 cursor-pointer bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Invite
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InviteForm;
