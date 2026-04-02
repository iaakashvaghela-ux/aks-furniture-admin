import React, { useState, useEffect } from 'react'
import { MdDashboard } from 'react-icons/md'
import sidebarMenu from '../data/sidebarMenu'
import { NavLink, useLocation } from 'react-router-dom'
import { FaRegDotCircle } from 'react-icons/fa'
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io'




export default function SideBar() {
  const location = useLocation();
  const basePath = "/" + location.pathname.split("/")[1];

  const [cat, setcat] = useState(basePath)

  useEffect(() => {
    setcat(basePath);
  }, [basePath]);

  return (
    <aside className="bg-[#1F2937] h-screen overflow-y-scroll p-4">

      <figure className=''>
        <img src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg" alt="logo" />
      </figure>
      <hr className='my-10 text-white' />

      <div>
        <ul className='text-white mt-5'>
          {
            sidebarMenu.map((item, index) => {
              const Icon = item.icon;
              const isOpen = cat === item.path;

              return (
                <li key={index} className='py-3'>
                  <p
                    className="flex gap-3 font-bold cursor-pointer relative items-center"
                    onClick={() => setcat(isOpen ? "" : item.path)}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>

                    <span className={`absolute right-1 duration-500 ${isOpen ? "" : "rotate-180"}`}>
                      <IoIosArrowDropup size={22} />
                    </span>
                  </p>

                  <div className={`duration-500 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} `}>
                    {item.page}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  )
}
