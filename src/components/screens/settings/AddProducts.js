import React,{useState,useEffect,useContext,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../../App'
import M from 'materialize-css'

function AddProducts({businessid}) {
    const {state,dispatch} = useContext(UserContext)
    const settingMenu = useRef(null)
    const [name,setName] = useState("")
    const [catagory,setCatagory] = useState("")
    const [cost,setCost] = useState("")
     const [image,setImage] = useState("")
     const [url, setUrl] = useState("")
  

    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, []);
    
     
      const uploadPic = (e) => {
       e.preventDefault();
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
         
        console.log(businessid)

        


        useEffect(()=>{
            if(url){
                fetch(process.env.REACT_APP_BASE_URL + '/addproduct', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                   name,
                   catagory,
                   cost,
                   pic:url,
                   businessid
    
                })
            }).then(res => res.json())
                .then(result => {
                      console.log(result)
    
                }).catch(err => {
                    console.log(err)
                })  
            }
          
        },[url])


   

 



  return (


    <>

<div id="modal31" ref={settingMenu} class="modal "  >
<div class="modal-content">

<form action="post">

<input style={{marginBottom:"15px"}}
 value={name}
 onChange={(e) => setName(e.target.value)}
type="text" placeholder='Add products name' required />


 <input style={{marginBottom:"15px"}}
  value={catagory}
  onChange={(e) => setCatagory(e.target.value)}
 type="text" placeholder='Add products Category' required />

 <input style={{marginBottom:"50px"}}
  value={cost}
  onChange={(e) => setCost(e.target.value)}
 type="text" placeholder='Price' required />

 <input style={{marginBottom:"55px"}} onChange={(e) => setImage(e.target.files[0])} type="file" required />

 <div onClick={uploadPic} className="subButton "  >  
 
  <input className='modal-close ' type="submit" value="Submit" /> 

   </div>
</form>

</div>

</div>

    </>


  )
}

export default AddProducts