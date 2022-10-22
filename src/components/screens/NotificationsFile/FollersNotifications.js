import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from '../../../App'
import './likenotifications.css'
import {Link} from 'react-router-dom'
import SkeletonLoader from "../SkeletonLoader";

function FollersNotifications({follersid}) {
    const { state, dispatch } = useContext(UserContext);
    const [user, setUser] = useState(null);



    useEffect(() => {
      
        const getUser = () => {
          try {
            fetch(process.env.REACT_APP_BASE_URL+'/user/'+follersid,{
              headers:{
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              }
          }).then(res=>res.json())
          .then(result=>{
            setUser(result)
              console.log(result)
            
          })
           
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [follersid]);


  return (

    <>
    
  {user?
    <div className="not-box2">
    <div style={{display:"flex",alignItems:"center"}} className="like-container">
       
     <img className='profileimg' src={user?.user.pic} alt="" />

  
  <div>
      <h5 style={{margin:"7px",fontWeight:"bold",fontSize:"17px"}} >{user?.user.name}</h5>
  </div>

    <div>
    <p style={{color:"gray",paddingLeft:"12px",margin:"0"}}>started following you </p>
    <Link to={"/profile/"+follersid} > <button className="viewProfile"  > View Profile</button> </Link> 
   </div>


    </div>

    </div>
    
    : <SkeletonLoader/>
  }
    </>
  )
}

export default FollersNotifications