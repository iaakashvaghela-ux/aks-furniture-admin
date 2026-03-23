import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaLock } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'
import { RiProfileFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../admin context/AdminContext'

export default function Header() {
  const navigate = useNavigate();
  const { infoToast } = useAdmin();

  const handleLogout = () => {
    infoToast("Logged out successfully.");
    navigate("/");
  };

  return (
    <div className='sticky top-0 bg-white flex justify-between items-center border-b-[2px] border-[#ccc] z-49'>
      <div className='ms-10 font-bold text-[20px] text-[#64768F] flex gap-2 items-center'><IoMenu size={22} /><p>Dashboard</p></div>
      <div className=' group  m-2'>

        <figure className='w-[48px] m-3 relative '>
          <img className='w-[100%] h-[48px] object-cover rounded-[50%]' src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />


          <div className='hidden absolute bg-[#ccc] right-9   p-5 rounded-2xl group-hover:block'>
            <Link to={"/profile"} className='flex items-center mb-1 gap-2 w-[160px] border-b pb-1 cursor-pointer hover:text-blue-500'>
              <CgProfile size={16} /> <p>Profile</p>
            </Link>

            <Link to={"/company-profile"} className='flex items-center mb-1 gap-2 w-[160px] border-b pb-1 cursor-pointer  hover:text-blue-500'>
              <RiProfileFill size={16} /> <p>Company Profile</p>
            </Link>


            <div onClick={handleLogout} className='flex items-center mb-1 gap-2 w-[160px] border-b pb-1 cursor-pointer  hover:text-blue-500'>
              <FaLock size={16} /> <p>Logout</p>
            </div>

          </div>
        </figure>
      </div>
    </div>
  )
}
