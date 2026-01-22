// src/components/UserTable.tsx
import { useState } from "react";
import InviteForm from "./InviteFrom";
import type { UserType } from "../../utility/type/userType";
import { useAllUserQuery } from "../../api/admin/inviteApi";
import UserRoleStatusUpdate from "./UserRoleStatusUpdate";

const roleColors = {
    ADMIN: "bg-red-100 text-red-800",
    MANAGER: "bg-yellow-100 text-yellow-800",
    STAFF: "bg-green-100 text-green-800",
};

const statusColors = {
    ACTIVE: "bg-green-100 text-green-800",
    INACTIVE: "bg-gray-100 text-gray-600",
};

const UserTable = () => {
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState<"" | "ADMIN" | "MANAGER" | "STAFF">("");
    const [filterStatus, setFilterStatus] = useState<"" | "ACTIVE" | "INACTIVE">("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Modals
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUser, setModalUser] = useState<UserType | null>(null);
    const [modalType, setModalType] = useState<"role" | "status" | null>(null);
    const [newValue, setNewValue] = useState<string>("");

    const [inviteModal, setInviteModal] = useState(false);

    // RTK Query
    const { data, isLoading, refetch } = useAllUserQuery({
        page: currentPage,
        limit: rowsPerPage,
        search,
        role: filterRole,
        status: filterStatus
    });

    // modal open 

    // const [modalType, setModalType] = useState<string>("");


    const openModal = (user: UserType, type: "role" | "status") => {
        setModalUser(user);
        setModalType(type);
        setNewValue(type === "role" ? user.role : user.status);
        setModalOpen(true);
    };

    const openInviteModal = () => setInviteModal(true);
    const handleClear = () => {
        setSearch("");
        setFilterRole("");
        setFilterStatus("");
        setCurrentPage(1);
    };

    const totalPages = data?.meta.totalPages || 1;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="bg-white rounded-lg shadow-lg px-4 py-6">
            {/* Invite Button */}
            <div className="flex justify-end mb-7">
                <button
                    onClick={openInviteModal}
                    className="px-10 sm:px-3 py-2 cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-700 text-sm font-semibold"
                >
                    Invite User
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <div className="flex gap-x-6 w-full">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="border border-gray-300 px-3 py-2 w-full rounded-lg md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value as any)}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Roles</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="STAFF">STAFF</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>

                    <button
                        onClick={handleClear}
                        className="px-10 sm:px-3 py-2 cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-700 text-sm font-semibold"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-175 md:min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-left px-4 py-2">Email</th>
                            <th className="text-left px-4 py-2">Role</th>
                            <th className="text-left px-4 py-2">Status</th>
                            <th className="text-left px-4 py-2">Invited At</th>
                            <th className="text-left px-4 py-2">Created At</th>
                            <th className="text-left px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : data?.data.length ? (
                            data.data.map((user: UserType) => (
                                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2">{user.name}</td>
                                    <td className="px-2 sm:px-4 py-2">{user.email}</td>
                                    <td className="px-2 sm:px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-medium ${roleColors[user.role]}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[user.status]}`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-2">
                                        {new Date(user.invitedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-2 sm:px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-2 sm:px-4 py-2 flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() => openModal(user, "role")}
                                            className="px-2 cursor-pointer sm:px-3 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-700 text-sm"
                                        >
                                            Update Role
                                        </button>
                                        <button
                                            onClick={() => openModal(user, "status")}
                                            className="px-2 cursor-pointer sm:px-3 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-700 text-sm"
                                        >
                                            Update Status
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center mt-4 gap-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 cursor-pointer"
                >
                    Prev
                </button>

                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`px-3 py-1 border rounded-lg ${currentPage === num
                            ? "bg-indigo-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 cursor-pointer"
                >
                    Next
                </button>
            </div>

            {/* Update Modal */}
            {modalOpen && modalUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600/45 z-50 p-2">
                    <UserRoleStatusUpdate setModalOpen={setModalOpen} modalType={modalType} newValue={newValue} modalUser={modalUser} setNewValue={setNewValue} />
                </div>
            )}






            {/* Invite Modal */}
            {inviteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600/45 z-50 p-2">
                    <InviteForm setInviteModal={setInviteModal} />
                </div>
            )}
        </div>
    );
};

export default UserTable;
