import React,{useState,useEffect,useContext,useRef} from 'react'
import M from 'materialize-css'
import "../../style/postsetting.css"
import {UserContext} from '../../../App'
import { saveAs } from 'file-saver'
import { Link, useHistory } from 'react-router-dom'
import StoryShare from './StoryShare'

function StorySetting({photo,currentStory}) {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
   
    const settingMenu = useRef(null)


    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, [])

     
const giveAlert = () =>{
  alert("function is on staging will process soon")
}
    console.log(photo)  

const download = () => {
    saveAs(photo, 'szylopost.jpg') // Put your image url here.
  
  };

  const storyid = currentStory?._id


  const deleteStory = ()=>{
    fetch(process.env.REACT_APP_BASE_URL+`/deletestory/${storyid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
     
        window.location.reload();
       
        
    })
}


const reportStory = () => {

  alert("Report submitted")

   }




  return (
    <>
    
    <div id="modal28" ref={settingMenu} class="modal postmodal">
<div class="modal-content">
 <ul>
 {currentStory?.postedBy._id===state?._id ? <div onClick={deleteStory} className='modal-close waves-effect' >  <li  >Delete</li> </div> 
      : 
      <div onClick={reportStory} className='modal-close waves-effect' >  <li  >Report</li> </div> }        <hr />
  <div data-target="modal30" className='modal-trigger modal-close waves-effect '  > <li >Share</li> </div>        <hr />
<li onClick={download}  >Download</li>        <hr />
<li onClick={giveAlert}  >Mute</li>        <hr />


</ul>



</div>

</div>
    
     
    <StoryShare currentStory={currentStory} />
    
    </>

  )
}

export default StorySetting