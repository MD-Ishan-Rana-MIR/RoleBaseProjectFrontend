import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserProfileQuery } from "../../../api/auth/authApi";
import UserProfileSkeleton from "../../../components/ProfileSkeleton";

type ProfileFormData = {
  name: string;
  email: string;
  role: string;
  status: string;
};

const UserProfile = () => {
  const { data, isLoading } = useUserProfileQuery({});
  const user = data?.data;

  const { register, handleSubmit, reset } = useForm<ProfileFormData>();

  // 🔥 IMPORTANT: reset form when user data arrives
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileFormData) => {
    console.log("Updated Profile:", data);
    // call update API here
  };

  if (isLoading) {
    return <div>
        <UserProfileSkeleton></UserProfileSkeleton>
    </div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            {...register("name")}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            disabled
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Role */}
<div>
  <label className="block text-sm font-medium">Role</label>
  <input
    type="text"
    {...register("role")}
    readOnly
    className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
  />
</div>

{/* Status */}
<div>
  <label className="block text-sm font-medium">Status</label>
  <input
    type="text"
    {...register("status")}
    readOnly
    className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
  />
</div>


        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Update Profile
        </button> */}
      </form>
    </div>
  );
};

export default UserProfile;
