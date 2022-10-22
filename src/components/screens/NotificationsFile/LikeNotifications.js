import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from '../../../App'
import SkeletonLoader from "../SkeletonLoader";
import './likenotifications.css'

function LikeNotifications({likeid}) {
    const { state, dispatch } = useContext(UserContext);
    const [user, setUser] = useState(null);


  

    

    useEffect(() => {
      
        const getUser = () => {
          try {
            fetch(process.env.REACT_APP_BASE_URL+'/user/'+likeid,{
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
      }, [likeid]);
      console.log(likeid)


  return (
    
    <>
    { user?
    <div className="not-box2">
    <div style={{display:"flex",alignItems:"center"}} className="like-container">
       
     <img className='profileimg' src={user?.user.pic} alt="" />

  
  <div>
      <h5 style={{margin:"7px",fontWeight:"bold",fontSize:"17px"}} >{user?.user.name}</h5>
  </div>


    <p style={{color:"gray",paddingLeft:"12px",margin:"0"}}> likes your Post. </p>


    </div>

    </div> : <SkeletonLoader/>
}
    </>
  )
}

export default LikeNotifications