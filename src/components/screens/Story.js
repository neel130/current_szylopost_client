import React from 'react'
import { format } from "timeago.js";
import img from '../images/defaultprofile.png'

function Story({user}) {
    
    console.log(user);


    return (
        <div className="storyMain">

        <div className='story'>

<h1 style={{backgroundImage:`url(${user.postedBy.pic})`,fontSize:"100px",fontWeight:600}} >  {user.postedBy.name.slice(0,1)} </h1>
        </div>
        <div className="storyProfile">
  <h3 style={{fontSize:"20px"}}>{user.postedBy.name}</h3>  
  <p style={{color:"grey"}} >posted {format(user.createdAt)}</p>
</div>
        </div>
    )
}

export default Story;
