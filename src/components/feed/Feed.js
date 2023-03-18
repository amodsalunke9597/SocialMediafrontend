import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFeedData } from '../../redux/slices/feedSlice';
import Follower from '../follower/Follower';
import Post from '../post/Post'
import './Feed.scss';

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData);

  useEffect(() => {
     dispatch(getFeedData());
  }, [dispatch])
  return (
    <div className='Feed'>
     <div className='container'>
        <div className='left-part'>
          {feedData?.posts?.map(post => <Post key={post._id} post={post} />)}
        </div>
        <div className='right-part'>
          <div className="following">
            <h3 className="title">You Are Following</h3>
            {feedData?.followings?.map(user => <Follower user={user} key={user._id}/>)}
          </div>
          <div className="suggestions">
            <h3 className="title">Suggested for you</h3>
            {feedData?.suggestions?.map(user => <Follower user={user} key={user._id}/>)}
          </div>
        </div>
     </div>
    </div>
  )
}

export default Feed