import React from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar'
import Breadcrumb from '../Breadcrumb'

export default function MainLayout() {
  return (
    <>
      <div className='grid grid-cols-[20%_auto] gap-10'>

        <SideBar />

        <div className='max-h-[100vh] overflow-y-scroll'>
          <Header />
          <Breadcrumb />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  )
}
