import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './components/pages/Dashboard.jsx'
import LoginPage from './components/pages/LoginPage.jsx'
import Users from './components/pages/all pages/users/Users.jsx'
import Contactenquirys from './components/pages/all pages/enquiry/Contactenquirys.jsx'
import NewsLetter from './components/pages/all pages/enquiry/NewsLetter.jsx'
import Addcolor from './components/pages/all pages/color/Addcolor.jsx'
import Viewcolor from './components/pages/all pages/color/Viewcolor.jsx'
import Addmaterial from './components/pages/all pages/materials/Addmaterial.jsx'
import Viewmaterial from './components/pages/all pages/materials/Viewmaterial.jsx'
import Addcategory from './components/pages/all pages/parent categories/Addcategory.jsx'
import Viewcategory from './components/pages/all pages/parent categories/Viewcategory.jsx'
import Viewsubcategory from './components/pages/all pages/sub categories/Viewsubcategory.jsx'
import Addsubcategory from './components/pages/all pages/sub categories/Addsubcategory.jsx'
import Viewsubsubcategory from './components/pages/all pages/sub sub categories/Viewsubsubcategory.jsx'
import Addsubsubcategory from './components/pages/all pages/sub sub categories/Addsubsubcategory.jsx'
import Addproduct from './components/pages/all pages/products/Addproduct.jsx'
import Viewproduct from './components/pages/all pages/products/Viewproduct.jsx'
import Addwhychooseus from './components/pages/all pages/why choose us/Addwhychooseus.jsx'
import Viewwhychooseus from './components/pages/all pages/why choose us/Viewwhychooseus.jsx'
import Orders from './components/pages/all pages/orders/Orders.jsx'
import Addsliders from './components/pages/all pages/Sliders/Addsliders.jsx'
import Viewsliders from './components/pages/all pages/Sliders/Viewsliders.jsx'
import Addcountry from './components/pages/all pages/country/Addcountry.jsx'
import Viewcountry from './components/pages/all pages/country/Viewcountry.jsx'
import Addtestimonials from './components/pages/all pages/Testimonials/Addtestimonials.jsx'
import Viewtestimonials from './components/pages/all pages/Testimonials/Viewtestimonials.jsx'
import Addfaqs from './components/pages/all pages/Faqs/Addfaqs.jsx'
import Viewfaqs from './components/pages/all pages/Faqs/Viewfaqs.jsx'
import CompanyProfile from './components/pages/CompanyProfile.jsx'
import MainLayout from './components/pages/main layout/MainLayout.jsx'
import Profile from './components/pages/Profile.jsx'


import AdminProvider from './admin context/AdminContext.jsx'
import { ToastContainer } from 'react-toastify'
import DetailsProduct from './components/pages/all pages/products/DetailsProduct.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>

          {/* Login page – without layout */}
          <Route path='/' element={<LoginPage />} />

          {/* Layout route */}
          <Route element={<MainLayout />}>
            <Route path='/company-profile' element={<CompanyProfile />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/viewuser' element={<Users />} />
            <Route path='enquirys'>
              <Route path='contact' element={<Contactenquirys />} />
              <Route path='newsletter' element={<NewsLetter />} />
            </Route>

            <Route path='color'>
              <Route path='add/:id?' element={<Addcolor />} />
              <Route path='view' element={<Viewcolor />} />
            </Route>

            <Route path='materials'>
              <Route path='add/:id?' element={<Addmaterial />} />
              <Route path='view' element={<Viewmaterial />} />
            </Route>

            <Route path='parent-categories' >
              <Route path='add/:id?' element={<Addcategory />} />
              <Route path='view' element={<Viewcategory />} />
            </Route>

            <Route path='sub-categories'>
              <Route path='add/:id?' element={<Addsubcategory />} />
              <Route path='view' element={<Viewsubcategory />} />
            </Route>

            <Route path='sub-sub-categories'>
              <Route path='add/:id?' element={<Addsubsubcategory />} />
              <Route path='view' element={<Viewsubsubcategory />} />
            </Route>

            <Route path='products'>
              {/* <Route path="details/:id" element={<ProductDetails />} /> */}
              <Route path='details/:id' element={<DetailsProduct />} />
              <Route path='add/:id?' element={<Addproduct />} />
              <Route path='view' element={<Viewproduct />} />
            </Route>

            <Route path='why-choose-us'>
              <Route path='add/:id?' element={<Addwhychooseus />} />
              <Route path='view' element={<Viewwhychooseus />} />
            </Route>


            <Route path='/orders' element={<Orders />} />

            <Route path='sliders'>
              <Route path='add/:id?' element={<Addsliders />} />
              <Route path='view' element={<Viewsliders />} />
            </Route>

            <Route path='country'>
              <Route path='add/:id?' element={<Addcountry />} />
              <Route path='view' element={<Viewcountry />} />
            </Route>

            <Route path='testimonials'>
              <Route path='add/:id?' element={<Addtestimonials />} />
              <Route path='view' element={<Viewtestimonials />} />
            </Route>

            <Route path='faqs'>
              <Route path='add/:id?' element={<Addfaqs />} />
              <Route path='view' element={<Viewfaqs />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </AdminProvider>

  </StrictMode>,
)
