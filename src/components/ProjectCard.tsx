import React from "react";

interface ProjectCardProps {
  name: string;
  description: string;
  createdAt: string;
  userName: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, createdAt, userName }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4  hover:shadow-xl transition">
      <h2 className="text-lg font-semibold text-indigo-600">{name}</h2>
      <p className="text-gray-700 mt-2">{description}</p>
      <div className="flex justify-between text-gray-500 text-sm mt-3">
        <span>By: {userName}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
