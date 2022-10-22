import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import './../style/community.css'

function Community() {


  return (
    <>
    <div className="community-page">
   
    <div className="community-head"> 

  <div className="comtitle">
<h4> Szylo Circle </h4>

  </div>

</div>


<div className="community-body">

<div className="personal-community">
  <Link to="/personalcommunity" > <p>Personal Circle  <span>  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg> </span>   </p>  </Link> 
    

    </div>





<div className="business-community">

<p>Business Circle  <span><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg></span>  </p>

</div>



</div>



    </div>
    

    
    </>
  )
}

export default Community ;