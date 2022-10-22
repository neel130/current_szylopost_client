import React,{useState,useEffect,useContext,useRef} from 'react'
import M from 'materialize-css'
import "../../style/profilesetting.css"
import {UserContext} from '../../../App'
import { Link, useHistory } from 'react-router-dom'

function ProfileSetting() {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
   
    const settingMenu = useRef(null)


    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, [])

     
const giveAlert = () =>{
  alert("function is on staging will process soon")
}
      


  return (
    <>
    
    <div id="modal4" ref={settingMenu} class="modal profilemodal">
<div class="modal-content">
 <ul>
<Link className='modal-close waves-effect' to={'/accountsetting'} >  <li  >Account settings</li> </Link>          <hr />
  <Link className='modal-close waves-effect' to={'/editprofile'} > <li >Edit Profile</li> </Link>        <hr />
<li onClick={giveAlert}  >Help center</li>        <hr />
<li onClick={giveAlert} >Privacy</li>        <hr />
<li onClick={giveAlert} >About SzyloPost</li>        <hr />
<li data-target="modal1" className='modal-trigger' > Follow user</li>        <hr />
<li onClick={giveAlert} > Delete account</li>        <hr />


  <div className="logoutbtn">
              <button className="btn #c62828 red darken-3 modal-close waves-effect "
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              history.push('/signin')
            }}
          >
            Logout
          </button>
                  </div>

</ul>



</div>
<div class="modal-footer">
  <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
</div>
</div>
    
    
    
    </>
  )
}

export default ProfileSetting