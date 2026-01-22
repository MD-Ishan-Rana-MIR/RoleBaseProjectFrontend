import { errorMessage } from "../../utility/errorMessage";
import {
    useUserRoleUpdateMutation,
    useUserStatusUpdateApiMutation,
} from "../../api/admin/inviteApi";
import toast from "react-hot-toast";

interface Props {
    setModalOpen: (open: boolean) => void;
    modalType: "role" | "status";
    newValue: string;
    setNewValue: (val: string) => void;
    modalUser: {
        _id: string;
        name: string;
    };
}

const UserRoleStatusUpdate: React.FC<Props> = ({
    setModalOpen,
    modalType,
    newValue,
    modalUser,
    setNewValue,
}) => {
    const id = modalUser._id;

    // API hooks
    const [userStatusUpdateApi] = useUserStatusUpdateApiMutation();
    const [userRoleUpdate] = useUserRoleUpdateMutation();

    const handleUpdate = async () => {
        const data = {
            role: newValue
        }
        if (!modalUser || !modalType || !newValue) return;

        try {
            let res;

            if (modalType === "status") {
                res = await userStatusUpdateApi({ id }).unwrap(); // toggle handled in backend
            } else if (modalType === "role") {
                res = await userRoleUpdate({ id, data }).unwrap();
            }

            if (res) {
                toast.success(res.message);
                setModalOpen(false);
            }
        } catch (error) {
            errorMessage(error);
        }
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg p-4   sm:p-6 w-full max-w-sm relative">
                <button
                    onClick={() => setModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl font-bold cursor-pointer"
                >
                    &times;
                </button>

                <h3 className="text-lg font-semibold mb-4 my-7 ">
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
                        onClick={handleUpdate}
                        className="px-4 py-2 cursor-pointer rounded bg-indigo-500 text-white hover:bg-indigo-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserRoleStatusUpdate;
