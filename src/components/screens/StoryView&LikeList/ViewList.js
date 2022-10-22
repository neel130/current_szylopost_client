import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from '../../../App'
import '../ProfileFollows/pfollower.css'
import {Link} from 'react-router-dom'
import SkeletonLoader from "../SkeletonLoader";


function ViewList({viewerid}) {

    const { state, dispatch } = useContext(UserContext);
    const [user, setUser] = useState(null);



    useEffect(() => {
      
        const getUser = () => {
          try {
            fetch(process.env.REACT_APP_BASE_URL+'/user/'+viewerid,{
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
      }, [viewerid]);



  return (
    <>
    {user?
    <div className="not-box">
    <div style={{display:"flex",alignItems:"center"}} className="like-container">
       
     <img className='profileimg' src={user?.user.pic} alt="" />

  
  <div>
      <h5 style={{margin:"6px",fontWeight:"bold",fontSize:"17px"}} >{user?.user.name}</h5>
      <h5 style={{margin:"6px",fontSize:"15px",color:"gray"}} >@{user?.user.username}</h5>
  </div>

  

   
    </div>

    </div>
    : <SkeletonLoader/>
     }
    
    </>
  )
}

export default ViewList