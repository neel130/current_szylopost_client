import React,{useState,useEffect,useContext,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import "./../../style/hiconwritng.css"
import M from 'materialize-css'
import {UserContext} from '../../../App'



function HIconWriting() {
    const history = useHistory()
    const [body, setBody] = useState("")
    const settingMenu = useRef(null);

    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, [])


const catagory = "text"


      const uploadFields = () => {

        fetch(process.env.REACT_APP_BASE_URL+"/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                body,
                catagory
                
            })
        }).then(res => res.json())
            .then(data => {

                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {

                    M.toast({ html: "Created post Successfully", classes: "#43a047 green darken-1" })
                    window.location.reload();

                }
            }).catch(err => {
                console.log(err)
            })

    }










  return (
    <>
    
    <div id="modal10" ref={settingMenu} class="modal wrtingiconmodal">
<div class="modal-content">
  
 <h6 style={{marginBottom:"10px"}} >Share with the <span style={{color:"green",fontWeight:"bold"}} > WORLD </span> </h6>

 <div className="body-writing">

 <div class="form-floating">
  <textarea  value={body}
          onChange={(e) => setBody(e.target.value)} class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
  <label for="floatingTextarea2">Your Thoughts.....</label>
</div>

<button type="button" onClick={uploadFields} class="btn btn-primary btn-sm">send </button>


 </div>

</div>
<div class="modal-footer">
  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
</div>
</div>
    
    </>
  )
}

export default HIconWriting