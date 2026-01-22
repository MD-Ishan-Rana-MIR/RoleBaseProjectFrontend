
// import { Bell } from 'lucide-react'
// import { useLocation } from 'react-router-dom'
// import { useProfileQuery } from '../../api/auth/authApi';
// import { Spinner } from '../ui/spinner';

import { useLocation } from "react-router-dom";
import { Bell } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const pathName = location.pathname;

    // const { data, isLoading } = useProfileQuery({});
    // const profile: UserResponseType = data;
    // console.log(profile.data.avatar)

    return (
        <div className=' flex items-center justify-between  w-full py-3 ' >
            <div>

                {
                    pathName == "/dashboard" && <>
                        <div>
                            <h1 className=" text-textColor text-3xl font-medium  ">Dashboard Overview</h1>
                            <p className=' text-textColor text-xl mt-1 ' >
                                Welcome back! Here's what's happening with your NBC platform today.
                            </p>

                        </div>


                    </>
                }


                {
                    pathName == "/dashboard/user-management" && <>
                        <div>
                            <h1 className=" text-textColor text-3xl font-medium  ">User Management</h1>
                            <p className=' text-textColor text-xl mt-1 ' >
                                Manage and monitor all Users
                            </p>

                        </div>


                    </>
                }
                {
                    pathName == "/dashboard/project-management" && <>
                        <div>
                            <h1 className=" text-textColor text-3xl font-medium  ">Project Management</h1>
                            <p className=' text-textColor text-xl mt-1 ' >
                                Manage and monitor all project.
                            </p>

                        </div>


                    </>
                }


                




























            </div>

            <div className="flex items-center gap-4">
                {/* Notification Icon */}
                <button className="p-2 rounded relative">
                    <Bell />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Avatar */}
                {/* <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                    {
                        isLoading ? <>
                            <div>
                                <Spinner />
                            </div>
                        </> : <><img
                            src={data?.data?.avatar}
                            alt="User"
                            className="w-full h-full object-cover"
                        /></>
                    }
                </div> */}
            </div>
        </div>
    )
}

export default Navbar