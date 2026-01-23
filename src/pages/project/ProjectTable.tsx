import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Project } from "../../utility/type/projectType";
import {
  useGetProjectsQuery,
  useProjectDeleteMutation,
  useProjectUpdateMutation,
} from "../../api/project/projectApi";
import { deleteAlert } from "../../utility/alert/deleteAlert";
import { errorMessage } from "../../utility/errorMessage";
import toast from "react-hot-toast";
import { updateAlert } from "../../utility/alert/updateAlert";
import Spinner from "../../components/Spinner";

type UserStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";

type UpdateFormData = {
  name: string;
  description: string;
  status: UserStatus;
};

const statusColors: Record<UserStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  INACTIVE: "bg-gray-100 text-gray-600",
  ARCHIVED: "bg-yellow-100 text-yellow-800",
};

const ProjectTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data, isLoading, isError } = useGetProjectsQuery({
    page,
    limit,
    search,
  });

  const [projectDelete] = useProjectDeleteMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<UpdateFormData>();
  const [id,setId] = useState<string>();
  // Open modal and set default form values
  const openModal = (project: Project) => {
    setId(project._id)
    setModalProject(project);
    reset({
      name: project.name,
      description: project.description,
      status: project.status as UserStatus,
    });
    setModalOpen(true);
  };


  const [ProjectUpdate,{isLoading:projectLoading}] = useProjectUpdateMutation();

  // Update project handler
  const onSubmit: SubmitHandler<UpdateFormData> = async (formData) => {
    const data = {
      name : formData.name,
      description : formData.description,
      status : formData.status

    };
    if (modalProject) {
      try {
        const res = await updateAlert();
        if(res.isConfirmed){
          const res = await ProjectUpdate({id,data}).unwrap();
          if(res){
            setModalOpen(false);
            toast.success(res?.message);
          }
        }
      } catch (err) {
        console.error("Failed to update project:", err);
        errorMessage(err);
      }
    }
  };

  // Delete project handler
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAlert();
      if (res.isConfirmed) {
        const response = await projectDelete(id).unwrap();
        toast.success(response?.message || "Project deleted");
      }
    } catch (err) {
      errorMessage(err);
    }
  };

  const totalPages = data?.meta.totalPages || 1;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Created By</th>
              <th className="text-left px-4 py-2">Created At</th>
              <th className="text-left px-4 py-2">Updated At</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: limit }).map((_, idx) => (
                  <tr key={idx} className="border-b border-gray-200 animate-pulse">
                    <td className="px-4 py-2 h-6 bg-gray-200 rounded"></td>
                    <td className="px-4 py-2 h-6 bg-gray-200 rounded"></td>
                    <td className="px-4 py-2 h-6 bg-gray-200 rounded"></td>
                    <td className="px-4 py-2 h-6 bg-gray-200 rounded"></td>
                    <td className="px-4 py-2 h-6 bg-gray-200 rounded"></td>
                    <td className="px-4 py-2 h-6 bg-gray-200 rounded"></td>
                    <td className="px-4 py-2 h-6 bg-gray-200 rounded"></td>
                  </tr>
                ))
              : isError ? (
                <tr>
                  <td colSpan={7} className="text-center text-red-500 py-6">
                    Failed to load projects
                  </td>
                </tr>
              ) : data?.data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-6">
                    No projects found
                  </td>
                </tr>
              ) : (
                data?.data.map((project: Project) => (
                  <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2">{project.name}</td>
                    <td className="px-4 py-2">{project.description.slice(0, 30)}...</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          statusColors[project.status as UserStatus]
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{project.user?.name || "Unknown"}</td>
                    <td className="px-4 py-2">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => openModal(project)}
                        className="px-3 cursor-pointer py-1 bg-indigo-500 text-white rounded hover:bg-indigo-700 text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 border rounded-lg ${
              page === num
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Update Modal */}
      {modalOpen && modalProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600/45 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Update Project: {modalProject.name}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Description</label>
                <input
                  {...register("description", { required: "Description is required" })}
                  className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Status</label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.status ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 cursor-pointer rounded bg-indigo-500 text-white hover:bg-indigo-700"
                >
                  {
                    projectLoading ? <><Spinner/></> : "Save"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
