import React from 'react'
import './../style/personalcommunity.css'
import {Link} from 'react-router-dom'



function PersonalCommunity() {



    
  return (
    <>
   
   <div className="percommunity-page">


  
<div className="percommunity-header">


<div className="percommunity-title">
  <h5> Personal <span> - Circle </span> </h5>
</div>

    <div className="create-group">
   <h6> + Create Circle</h6>
    </div>
</div>

<div className="percommunity-mainbody">

<hr />

<Link    to={"/singlepersonalcommunity"}    >
<div className="percommunity-body">

    <img src="https://learn.g2.com/hubfs/What_is_Information_Technology.jpg" alt="" srcset="" /> <span><h6>szylopost tech</h6></span> 


<hr />
</div> 
</Link>







</div>



</div>



   
    
    
    
    </>
  )
}

export default PersonalCommunity ;