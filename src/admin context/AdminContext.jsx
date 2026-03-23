import React, { createContext, useContext } from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

const AdminContext = createContext()
export default function AdminProvider({ children }) {
  const successToast = (message) => {
    toast.success(message);
  };

  const errorToast = (message) => {
    toast.error(message);
  };

  const infoToast = (message) => {
    toast.info(message);
  };

  const confirmAlert = (message, functionName) => {

    const { getColorData, setChecked } = functionName;
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change status!"
    }).then((result) => {
      if (result.isConfirmed) {
        getColorData()
        setChecked([])
        successToast(message.message)
        Swal.fire({
          title: "status changed!",
          text: "Your file has been changed.",
          icon: "success"
        });
      }
    });
  };

  return (
    <AdminContext.Provider value={{ successToast, errorToast, infoToast, confirmAlert }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
