import React, { useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import sidebarMenu from '../data/sidebarMenu'
import { NavLink } from 'react-router-dom'
import { FaRegDotCircle } from 'react-icons/fa'
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io'




export default function SideBar() {

  const [cat, setcat] = useState(0)
  return (
    <aside className="bg-[#1F2937] h-screen overflow-y-scroll p-4">



      <figure className=''>
        <img src="	https://www.wscubetech.com/images/wscube-tech-logo-2.svg" alt="" />
      </figure>
      <hr className='my-10 text-white' />

      <div>
        <ul className='text-white mt-5'>

          {/* <li>
            <h3 className='flex gap-2 font-bold items-center'>  <MdDashboard /> Dashboard</h3>


            <NavLink className='flex items-center gap-2 ms-3 mt-2'>
             <FaRegDotCircle /> View User
            </NavLink>
          </li> */}

          {
            sidebarMenu.map((item, index) => {

              const Icon = item.icon;
              return (
                <li key={index} className='py-3'>
                  <p className="flex gap-3 font-bold cursor-pointer relative items-center"  onClick={() => setcat(item.id == cat ? 0 : item.id)}>
                    <Icon size={18} />
                     <span>{item.name}</span>
                    
                    <span className={`absolute right-1 duration-500 ${item.id == cat ? "" : "rotate-180"}`}><IoIosArrowDropup size={22} /> </span>
                  </p>

                  <span className={`duration-500  ${item.id == cat ? "" : "hidden"} `}>

                    {item.page}
                  </span>


                </li>
              )
            }
            )
          }


        </ul>
      </div>


    </aside>
  )
}
