import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import { Link, useHistory } from 'react-router-dom'
import '../style/profilefollower.css'
import Pfollowing from './ProfileFollows/Pfollowing';

function ProfileFollowing() {

    const {state,dispatch} = useContext(UserContext);


  return (
    <>
    
    <div className="headerFollower">
      <Link to={"/profile"} >  <i class="material-icons">arrow_back</i></Link>
       <h4 style={{margin:"0",fontSize:"20px",fontFamily:"serif"}} >Followings</h4>
       <i class="material-icons">person_outline</i>
       </div>


     {
         state?.following.map((item)=>{
          return(

    <Link to={"/profile/"+item}>  <Pfollowing followingid={item} /> </Link> 

          )
         })




     }
    
    </>
  )
}

export default ProfileFollowing