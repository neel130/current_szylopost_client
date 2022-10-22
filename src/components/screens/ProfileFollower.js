import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import { Link, useHistory } from 'react-router-dom'
import Pfollower from './ProfileFollows/Pfollower';
import '../style/profilefollower.css'


function ProfileFollower() {
   

    const {state,dispatch} = useContext(UserContext);


  return (
    <>
       <div className="headerFollower">
      <Link to={"/profile"} >  <i class="material-icons">arrow_back</i></Link>
       <h4 style={{margin:"0",fontSize:"20px",fontFamily:"serif"}} >Followers</h4>
       <i class="material-icons">person_outline</i>
       </div>


     {
         state?.followers.map((item)=>{
          return(

    <Link to={"/profile/"+item}>    <Pfollower followerid={item} /> </Link>

          )
         })




     }

     
    
    
    
    </>
  )
}

export default ProfileFollower