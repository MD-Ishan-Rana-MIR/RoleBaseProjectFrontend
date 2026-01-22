// src/components/UserTable.tsx
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import InviteForm from "./InviteFrom";

export type User = {
    id: number;
    name: string;
    email: string;
    role: "ADMIN" | "MANAGER" | "STAFF";
    status: "ACTIVE" | "INACTIVE";
    invitedAt: string;
    createdAt: string;
};

const initialUsers: User[] = [
    { id: 1, name: "Ishan Rana", email: "ishanrana363@gmail.com", role: "ADMIN", status: "ACTIVE", invitedAt: "2026-01-22", createdAt: "2026-01-21" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "MANAGER", status: "INACTIVE", invitedAt: "2026-01-20", createdAt: "2026-01-18" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", role: "STAFF", status: "ACTIVE", invitedAt: "2026-01-19", createdAt: "2026-01-19" },
    { id: 4, name: "Alice", email: "alice@example.com", role: "STAFF", status: "ACTIVE", invitedAt: "2026-01-18", createdAt: "2026-01-18" },
    { id: 5, name: "Bob", email: "bob@example.com", role: "MANAGER", status: "ACTIVE", invitedAt: "2026-01-17", createdAt: "2026-01-17" },
    { id: 6, name: "Charlie", email: "charlie@example.com", role: "ADMIN", status: "INACTIVE", invitedAt: "2026-01-16", createdAt: "2026-01-16" },
    { id: 7, name: "David", email: "david@example.com", role: "STAFF", status: "ACTIVE", invitedAt: "2026-01-15", createdAt: "2026-01-15" },
];

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
    const [users, setUsers] = useState<User[]>(initialUsers);

    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState<"" | "ADMIN" | "MANAGER" | "STAFF">("");
    const [filterStatus, setFilterStatus] = useState<"" | "ACTIVE" | "INACTIVE">("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUser, setModalUser] = useState<User | null>(null);
    const [modalType, setModalType] = useState<"role" | "status" | null>(null);
    const [newValue, setNewValue] = useState<string>("");

    const filteredUsers = useMemo(() => {
        return users
            .filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())
            )
            .filter((u) => (filterRole ? u.role === filterRole : true))
            .filter((u) => (filterStatus ? u.status === filterStatus : true));
    }, [users, search, filterRole, filterStatus]);

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Open modal
    const openModal = (user: User, type: "role" | "status") => {
        setModalUser(user);
        setModalType(type);
        setNewValue(type === "role" ? user.role : user.status);
        setModalOpen(true);
    };

    // open user invite modal 

    const [inviteModal, setInviteModal] = useState<boolean>(false);

    const openInviteModal = () => {
        setInviteModal(!inviteModal)
    }

    // clear button 

    const handleClear = () => {
        setFilterRole("");
        setFilterStatus("");
        setSearch("");

    }


    // user invite 

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            role: "STAFF"
        }
    });

    const onSubmit = (data: FormData) => {
        console.log("Form Data:", data);
        // You can send this data to API or state update
    };



    return (
        <div className=" bg-white rounded-lg shadow-lg px-4 py-6 ">
            {/* invite button  */}
            <div className=" flex justify-end mb-7 " >
                <button onClick={openInviteModal} className="px-10 sm:px-3 py-2 cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-700 text-sm font-semibold">Invite User</button>

            </div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3 ">
                <div className=" flex gap-x-6 w-full " >
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="border border-gray-300 px-3 py-2 w-full rounded-lg  md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 ">
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
                    <button onClick={handleClear} className="px-10 sm:px-3 py-2 cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-700 text-sm font-semibold">Clear</button>

                </div>




            </div>

            {/* Responsive Table */}
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
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2">{user.name}</td>
                                    <td className="px-2 sm:px-4 py-2">{user.email}</td>
                                    <td className="px-2 sm:px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${roleColors[user.role]}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[user.status]}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-2">{user.invitedAt}</td>
                                    <td className="px-2 sm:px-4 py-2">{user.createdAt}</td>
                                    <td className="px-2 sm:px-4 py-2 flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() => openModal(user, "role")}
                                            className="px-2 sm:px-3 py-2 cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-700 text-sm font-semibold"
                                        >
                                            Update Role
                                        </button>
                                        <button
                                            onClick={() => openModal(user, "status")}
                                            className="px-2 sm:px-3 py-2 cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-700 text-sm font-semibold"
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
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 cursor-pointer "
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
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 cursor-pointer "
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {modalOpen && modalUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600/45 z-50 p-2">
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm relative">
                        {/* Close button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl font-bold cursor-pointer"
                        >
                            &times;
                        </button>

                        <h3 className="text-lg font-semibold mb-4">
                            Update {modalType === "role" ? "Role" : "Status"} for {modalUser.name}
                        </h3>

                        <select
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {modalType === "role" ? (
                                <>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="STAFF">STAFF</option>
                                </>
                            ) : (
                                <>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </>
                            )}
                        </select>

                        <div className="flex justify-end gap-2 flex-wrap">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 cursor-pointer rounded border hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 cursor-pointer rounded bg-indigo-500 text-white hover:bg-indigo-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* invite modal  */}


            {/* Modal */}
            {inviteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600/45 z-50 p-2">
                    <InviteForm setInviteModal={setInviteModal} />
                </div>
            )}





        </div>
    );
};

export default UserTable;
