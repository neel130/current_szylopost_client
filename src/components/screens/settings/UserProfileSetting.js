import React,{useState,useEffect,useContext,useRef} from 'react'
import "../../style/userprofilesetting.css"
import M from 'materialize-css'

function UserProfileSetting() {

    const settingMenu = useRef(null)


    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, [])



  return (
    <>


<div id="modal3" ref={settingMenu} class="modal userprofilemodal">
<div class="modal-content">
  <ul style={{color:"red",fontSize:"16px",fontWeight:"500"}} >
    <li>Block</li> <hr />
    <li>Report</li> 
  </ul>
</div>
<div class="modal-footer">
  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
</div>
</div>

    </>
  )
}

export default UserProfileSetting