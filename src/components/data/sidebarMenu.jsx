import React from 'react'
// react-icons imports
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaShoppingBag, FaRegDotCircle } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { RiParentFill } from "react-icons/ri";
import { TbCategory2 } from "react-icons/tb";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { MdSlideshow } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { RiFileList3Line } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { NavLink } from 'react-router-dom';

// Sidebar menu array
const sidebarMenu = [
  {
    name: <NavLink to={"/dashboard"}>Dashboard
    </NavLink>,
    path: "/dashboard",
    icon: MdDashboard
  },
  {
    name: "Users",
    path: "/users",
    icon: FaUsers,
    page: <p>
      <NavLink to={"/viewuser"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View User</span>
      </NavLink>
    </p>

  },
  {
    name: "Enquirys",
    path: "/enquirys",
    icon: FaClipboardList,
    page: <p>
      <NavLink to={"/enquirys/contact"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span> Contact Enquirys</span>
      </NavLink>

      <NavLink to={"/enquirys/newsletter"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Newsettler</span>
      </NavLink>
    </p>
  },
  {
    name: "Colors",
    path: "/colors",
    icon: HiOutlineColorSwatch,
    page: <p>
      <NavLink to={"/color/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Color</span>
      </NavLink>

      <NavLink to={"/color/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Color</span>
      </NavLink>
    </p>
  },
  {
    name: "Materials",
    path: "/materials",
    icon: FaBoxOpen,
    page: <p>
      <NavLink to={"/materials/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Material</span>
      </NavLink>

      <NavLink to={"/materials/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Material</span>
      </NavLink>
    </p>
  },
  {
    name: "Parent Categories",
    path: "/parent-categories",
    icon: RiParentFill,
    page: <p>
      <NavLink to={"/parent-categories/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Category</span>
      </NavLink>

      <NavLink to={"/parent-categories/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Category</span>
      </NavLink>
    </p>
  },
  {
    name: "Sub Categories",
    path: "/sub-categories",
    icon: TbCategory2,
    page: <p>
      <NavLink to={"/sub-categories/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Sub Category</span>
      </NavLink>

      <NavLink to={"/sub-categories/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Sub Category</span>
      </NavLink>
    </p>
  },
  {
    name: "Sub Sub Categories",
    path: "/sub-sub-categories",
    icon: MdOutlineSubdirectoryArrowRight,
    page: <p>
      <NavLink to={"/sub-sub-categories/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Sub Sub Category</span>
      </NavLink>
      <NavLink to={"/sub-sub-categories/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Sub Sub Category</span>
      </NavLink>
    </p>
  },
  {
    name: "Products",
    path: "/products",
    icon: FaShoppingBag,
    page: <p>
      <NavLink to={"/products/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Product</span>
      </NavLink>

      <NavLink to={"/products/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Product</span>
      </NavLink>
    </p>
  },
  {
    name: "Why Choose Us",
    path: "/why-choose-us",
    icon: AiFillStar,
    page: <p>
      <NavLink to={"/why-choose-us/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Why Choose Us</span>
      </NavLink>

      <NavLink to={"/why-choose-us/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Why Choose Us</span>
      </NavLink>
    </p>
  },
  {
    name: "Orders",
    path: "/orders",
    icon: RiFileList3Line,
    page: <p>
      <NavLink to={"/orders"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Orders</span>
      </NavLink>

    </p>
  },
  {
    name: "Sliders",
    path: "/sliders",
    icon: MdSlideshow,
    page: <p>
      <NavLink to={"/sliders/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Sliders</span>
      </NavLink>

      <NavLink to={"/sliders/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Sliders</span>
      </NavLink>
    </p>
  },
  {
    name: "Country",
    path: "/country",
    icon: BiWorld,
    page: <p>
      <NavLink to={"/country/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Country</span>
      </NavLink>

      <NavLink to={"/country/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Country</span>
      </NavLink>
    </p>
  },
  {
    name: "Testimonials",
    path: "/testimonials",
    icon: MdQuestionAnswer,
    page: <p>
      <NavLink to={"/testimonials/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Testimonials</span>
      </NavLink>

      <NavLink to={"/testimonials/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Testimonials</span>
      </NavLink>
    </p>
  },
  {
    name: "Faqs",
    path: "/faqs",
    icon: BsFillQuestionCircleFill,
    page: <p>
      <NavLink to={"/faqs/add"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>Add Faq</span>
      </NavLink>

      <NavLink to={"/faqs/view"} className='flex items-center gap-2 ms-3 mt-2'>
        <FaRegDotCircle /> <span>View Faq</span>
      </NavLink>
    </p>
  },
  {
    name: "Terms & Conditions",
    path: "/terms-conditions",
    icon: RiFileList3Line,
    page: <p>
      <NavLink className='flex items-center gap-2 ms-3 mt-2'>

      </NavLink>

      <NavLink className='flex items-center gap-2 ms-3 mt-2'>

      </NavLink>
    </p>
  }
];
// Add id to each menu item
sidebarMenu.forEach((item, index) => {
  item.id = index + 1;
});
export default sidebarMenu;
