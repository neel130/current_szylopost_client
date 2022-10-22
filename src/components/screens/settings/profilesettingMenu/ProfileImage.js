import React,{useState,useEffect,useContext,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import '../../../style/profileimage.css'
import {UserContext} from '../../../../App'





function ProfileImage() {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory()
    const [body, setBody] = useState("")
    const settingMenu = useRef(null);
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, [])


     

  return (
    <>
    
    
    <div id="modal19"  ref={settingMenu} class="modal proimgmodal " >

<div className="profileContainer">

<Link className='modal-close ' to={'/profile'}>
<svg  xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</Link>


<div className="profileimage">
    <img src={state?.pic} alt="" srcset="" />
    
</div>

 </div>



</div>


    
    
    </>
  )
}

export default ProfileImage