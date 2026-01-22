import React from "react";
import { useForm } from "react-hook-form";

import type { SubmitHandler } from "react-hook-form";
import { useProjectCreateMutation } from "../../../api/project/projectApi";
import { errorMessage } from "../../../utility/errorMessage";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";

/**
 * Form data type
 */
type ProjectFormData = {
  name: string;
  description: string;
};

const ProjectCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>();


  const [projectCreate] = useProjectCreateMutation();

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    
    try {

      const res = await projectCreate(data).unwrap();

      if(res){
        console.log(res);
        toast.success(res?.message);
    reset();

      }
      
    } catch (error) {
      return errorMessage(error);
      
    }

  };

  return (
    <div className=" flex items-center justify-center md:mt-28 mt-10 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Item
        </h2>

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Enter description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {isSubmitting ? <Spinner/> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProjectCreate;
