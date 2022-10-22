import React,{useEffect,useState,useContext} from 'react'
import {useParams,useHistory,Link} from 'react-router-dom'

import '../style/profilefollower.css'
import {UserContext} from '../../App'
import Ufollowing from './UserProfileFollows/Ufollowing';

function UserprofileFollowing({userProfile}) {

    const {state,dispatch} = useContext(UserContext);

    const reload = ()=>{
        setTimeout(()=>{
            window.location.reload(false);
        }, 200);
    }


  return (


    <>
     <div className="headerFollower">
      <Link to={"/profile"} >  <i class="material-icons">arrow_back</i></Link>
       <h4 style={{margin:"0",fontSize:"20px",fontFamily:"serif"}} >Following</h4>
       <i class="material-icons">person_outline</i>
       </div>



    {userProfile?.user.following.map((item)=>{
     
     return(

        <Link  to={state?._id===item?"/profile": "/profile/"+item}> <div onClick={reload} > <Ufollowing followingid={item}   />  </div>   </Link>
     )


    })
        




    }
    
    
    
    </>
  )
}

export default UserprofileFollowing