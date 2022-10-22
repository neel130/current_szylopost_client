import React from 'react'
import '../style/skeletonloader.css'

function SkeletonLoader() {


  return (
    <>
    
    
    <div class="container">
       
    
 
    
    <div class="box">
     <div class="skeleton">
              <div class="skeleton-left flex1">
              <div class="square circle"></div>
            </div>
              <div class="skeleton-right flex2">
                <div class="line h17 w40 m10"></div>
                <div class="line"></div>
                <div class="line h8 w50"></div>
                <div class="line  w75"></div>
            </div>
      </div>

      
      </div>
      </div>
    
    </>
  )
}

export default SkeletonLoader