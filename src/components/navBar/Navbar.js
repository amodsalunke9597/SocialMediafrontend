import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import './Navbar.scss';
import {AiOutlineLogout} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, KEY_ACCESS_TOKEN } from '../../utils/localStorageManager';
import { axiosClient } from '../../utils/axiosClient';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);

  const [loading, setLoading] = useState(false);

  async function handleLogoutClicked() {
    try {
			await axiosClient.post('/auth/logout');
			removeItem(KEY_ACCESS_TOKEN);
			navigate('/login')
		} catch (e) {
			
		}
  }

  return (
    <div className='Navbar'>
    <div className='container'>
      <h2 className='banner hover-link' onClick={() => navigate('/')}>Social Media</h2>
      <div className='right-side'>
        <div className='profile hover-link' onClick={() => navigate(`/profile/${myProfile?._id}`)}>
          <Avatar src={myProfile?.avatar?.url}/>
        </div>
        <div className="logout hover-link" onClick={handleLogoutClicked}>
          <AiOutlineLogout />
        </div>
      </div>
   </div>
    </div>
  )
}

export default Navbar