import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from '../../../App'
import SkeletonLoader from "../SkeletonLoader";
import './likenotifications.css'

function CommentNotifications({commentid,commentText}) {
    const { state, dispatch } = useContext(UserContext);
    const [user, setUser] = useState(null);


    useEffect(() => {
      
        const getUser = () => {
          try {
            fetch(process.env.REACT_APP_BASE_URL+'/user/'+commentid,{
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
      }, [commentid]);



  return (
    <>
{user?
 <div className="not-box2">
    <div style={{display:"flex",alignItems:"center"}} className="like-container">
       
     <img className='profileimg' src={user?.user.pic} alt="" />

  
  <div>
      <h5 style={{margin:"7px",fontWeight:"bold",fontSize:"17px"}} >{user?.user.name}</h5>
  </div>

<div className="commentWrap">
    <p style={{color:"gray",paddingLeft:"12px",margin:"0"}}>Commented on your Post.</p>
    <p style={{paddingLeft:"12px",margin:"0",fontSize:"12px",fontWeight:"400"}} >: {commentText}</p>
</div>

    </div>

    </div>
    
    : <SkeletonLoader/>



}
    </>
  )
}

export default CommentNotifications