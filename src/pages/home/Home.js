import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
// import { Outlet } from "react-router";
import Navbar from '../../components/navBar/Navbar'
import { getMyInfo } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient'

function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo());
  }, [])
//   useEffect(() => {
//     fetchData();
//   }, [])

// async function fetchData() {
//   const response = await axiosClient.get('/posts/all')
//   console.log('got the response: ', response);
// }

  return (
   <>
   <Navbar />
   <div className='outlet' style={{marginTop: "60px"}}>
   <Outlet />
   </div>
  </>
  );
}

export default Home