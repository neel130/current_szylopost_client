import React,{useState,useEffect,useContext,useRef} from 'react'
import M from 'materialize-css'
import "../../style/storyview.css"
import {UserContext} from '../../../App'
import { saveAs } from 'file-saver'
import { Link, useHistory } from 'react-router-dom'
import ViewList from '../StoryView&LikeList/ViewList'
import LikeList from '../StoryView&LikeList/LikeList'

function StoryView({storydata}) {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [activeview,setActiveview] = useState("data")
    const [activelike,setActivelike] = useState(null)
    const settingMenu = useRef(null)


    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, [])




   const openview = ()=>{
       setActivelike(null)
       setActiveview("data")
   }
 
   const openlike = ()=>{
    setActivelike("data")
    setActiveview(null)
}


  return (
    <>
    
    <div id="modal29" ref={settingMenu} class="modal storymodal">
<div class="modal-content">
    
 <div className="headerData">

     <div onClick={openview} className={activeview?"bottom-border":"viewheader"}>
     <h4 style={{fontSize:"19px",fontWeight:"500",color:"grey"}} >Views</h4>
     </div>
     <div onClick={openlike} className={activelike?"bottom-border":"likeheader"}>
     <h4 style={{fontSize:"19px",fontWeight:"500",color:"grey"}} >Likes</h4>
     </div>
 </div>


<div style={{marginTop:"20px"}} className={activeview?"view-container":"displayoff"}>
{
    storydata?.views.map((elem)=>{
        return(
           <ViewList viewerid={elem} />
        )
     
    })
}

</div>

<div style={{marginTop:"20px"}} className={activelike?"like-container":"displayoff"}>

{
    storydata?.likes.map((elem)=>{
        return(
          <LikeList likerid={elem} />
        )
     
    })
}


</div>




</div>

</div>
    
    
    
    </>
  )
}

export default StoryView