import React,{useState,useEffect,useContext,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import "./../../style/hiconposting.css"
import M from 'materialize-css'
import {UserContext} from '../../../App'



function HIconPosting() {

    const history = useHistory()
    const [body, setBody] = useState("")
    const settingMenu = useRef(null);
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, [])



 console.log(url);
      useEffect(() => {
        if (url) {

            uploadFields()

        }
    }, [url])




      const uploadPic = () => {
       
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "feed-img")
        //    data.append("neel1304")
        fetch(`https://api.cloudinary.com/v1_1/neel1304/image/upload`, {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                //    console.log(data)
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })


    }












      

      const catagory = "image"
      


      const uploadFields = () => {

        fetch(process.env.REACT_APP_BASE_URL+"/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                
                pic: url,
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

    <div id="modal11" ref={settingMenu} class="modal postingiconmodal">
<div class="modal-content">


 <div className="body-writing">
<h5>Photo <span style={{color:"rgb(8, 207, 8)"}} > & </span> Recording </h5>

 <div class="mb-3">
  <label for="formFileSm" class="form-label">Medial Upload</label>
  <input   onChange={(e) => setImage(e.target.files[0])}  class="form-control form-control-sm" id="formFileSm" type="file"/>
</div>


<button type="button" onClick={uploadPic} class="btn btn-primary btn-sm">post </button>


 </div>

</div>

</div>
    
    
    </>
  )
}

export default HIconPosting