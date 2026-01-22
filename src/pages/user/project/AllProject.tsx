import React, { useState } from "react";
import { useGetProjectsQuery } from "../../../api/project/projectApi";
import ProjectCard from "../../../components/ProjectCard";
import ProjectCardSkeleton from "../../../components/ProjectSkeleton";

const AllProject: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 20;

  const { data, isLoading, isError } = useGetProjectsQuery({ page, limit, search });

  const totalPages = data?.meta.totalPages || 1;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded ${
            i === page ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search Box */}
      <div className="flex flex-wrap gap-4 mb-5 items-center">
  {/* Search Box */}
        <div className=" w-[40%] ">
            <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset page when searching
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

  {/* Clear Button */}
  <div>
    <button
      onClick={() => {
        setSearch("");
        setPage(1);
      }}
      className="px-6 py-3 cursor-pointer rounded bg-indigo-500 text-white hover:bg-indigo-700 transition"
    >
      Clear
    </button>
  </div>
</div>


      {/* Project Cards */}
      {isLoading ? (
            <div>
                <ProjectCardSkeleton></ProjectCardSkeleton>
            </div>
      ) : isError ? (
        <p>Error loading projects</p>
      ) : data?.data.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data.map((project) => (
            <ProjectCard
              key={project._id}
              name={project.name}
              description={project.description}
              createdAt={project.createdAt}
              userName={project.user?.name || "Unknown"}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap items-center">
        {/* Previous Button */}
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProject;
