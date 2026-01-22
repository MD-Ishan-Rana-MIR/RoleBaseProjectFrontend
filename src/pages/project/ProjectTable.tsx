// src/components/ItemTable.tsx
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

export type Item = {
    id: number;
    name: string;
    description: string;
    status: "ACTIVE" | "INACTIVE";
    createdBy: string;
    createdAt: string;
    updatedAt: string;
};

const initialItems: Item[] = [
    {
        id: 1,
        name: "Item One",
        description: "This is item one",
        status: "ACTIVE",
        createdBy: "Admin",
        createdAt: "2026-01-20",
        updatedAt: "2026-01-21",
    },
    {
        id: 2,
        name: "Item Two",
        description: "This is item two",
        status: "INACTIVE",
        createdBy: "Manager",
        createdAt: "2026-01-18",
        updatedAt: "2026-01-19",
    },
    {
        id: 3,
        name: "Item Three",
        description: "This is item three",
        status: "ACTIVE",
        createdBy: "Staff",
        createdAt: "2026-01-19",
        updatedAt: "2026-01-20",
    },
];

const statusColors = {
    ACTIVE: "bg-green-100 text-green-800",
    INACTIVE: "bg-gray-100 text-gray-600",
};

type UpdateFormData = {
    name: string;
    description: string;
    status: "ACTIVE" | "INACTIVE";
};

const ProjectTable = () => {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState<Item | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateFormData>();

    // Filtered + paginated items
    const filteredItems = useMemo(() => {
        return items.filter(
            (i) =>
                i.name.toLowerCase().includes(search.toLowerCase()) ||
                i.description.toLowerCase().includes(search.toLowerCase())
        );
    }, [items, search]);

    const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Open modal
    const openModal = (item: Item) => {
        setModalItem(item);
        reset({ name: item.name, description: item.description, status: item.status });
        setModalOpen(true);
    };

    // Update item
    const onSubmit: SubmitHandler<UpdateFormData> = (data) => {
        if (modalItem) {
            setItems((prev) =>
                prev.map((i) => (i.id === modalItem.id ? { ...i, ...data, updatedAt: new Date().toISOString().slice(0, 10) } : i))
            );
            setModalOpen(false);
        }
    };

    // Delete item
    const deleteItem = (id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            {/* Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <input
                    type="text"
                    placeholder="Search by name or description..."
                    className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.description}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{item.createdBy}</td>
                                    <td className="px-4 py-2">{item.createdAt}</td>
                                    <td className="px-4 py-2">{item.updatedAt}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => openModal(item)}
                                            className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-700 text-sm"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                                    No items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 gap-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>

                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`px-3 py-1 border rounded-lg ${currentPage === num ? "bg-indigo-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Update Modal */}
            {modalOpen && modalItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600/45 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl font-bold cursor-pointer"
                        >
                            &times;
                        </button>

                        <h3 className="text-lg font-semibold mb-4">Update Item: {modalItem.name}</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="mb-1 font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    {...register("name", { required: "Name is required" })}
                                    className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="description" className="mb-1 font-medium text-gray-700">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    {...register("description", { required: "Description is required" })}
                                    className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="status" className="mb-1 font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    {...register("status", { required: "Status is required" })}
                                    className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.status ? "border-red-500" : "border-gray-300"}`}
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded border hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-700">
                                    Save
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
