import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'


function PostLike({userid}) {
    const { state, dispatch } = useContext(UserContext);
    const [user, setUser] = useState(null);



    useEffect(() => {
      
        const getUser = () => {
          try {
            fetch(process.env.REACT_APP_BASE_URL+'/user/'+userid,{
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
      }, [userid]);


  return (

    <>
      <div><span style={{ margin: "5px",marginBottom:"5px" }} className='profilepic' ><img src={user?.user.pic} alt="" srcset="" /> </span>
           <span  ><p style={{display:"inline"}} >{user?.user.name}</p></span> </div>
    
    </>
  )
}

export default PostLike