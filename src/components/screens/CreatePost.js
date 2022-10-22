import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'
import LocationAutocomplete from './LocationAutocomplete'
const CretePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [load, setLoad] = useState(false)
    const [postdata,setPostdata] = useState("")
    const [catagory,setCatagory] = useState("");
    const [location,setLocation] = useState("");
    const [discommentBox,setDiscommentBox]=useState("displayoff");
    const [disablecomment,setDisablecomment] = useState(false)
    console.log(image);
    console.log(image.type)
 useEffect(()=>{
if(image.type=="video/mp4" || image.type=="video/3gp" ){
        setPostdata("video");
        setCatagory("video");
    }
    else if(image.type=="image/jpeg" || image.type=="image/png" ){
        setPostdata("image");
        setCatagory("image");
    }else if(image.type=="audio/mpeg"){
        setPostdata("video");
        setCatagory("audio");
    }

 },[image])
    

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
        fetch(`https://api.cloudinary.com/v1_1/neel1304/${postdata}/upload`, {
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


    const uploadFields = () => {

        fetch(process.env.REACT_APP_BASE_URL+"/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                location,
                title,
                body,
                catagory,
                disablecomment,
                pic: url
            })
        }).then(res => res.json())
            .then(data => {

                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                      console.warn(data)
                    M.toast({ html: "Created post Successfully", classes: "#43a047 green darken-1" })
                    history.push('/');

                }
            }).catch(err => {
                console.log(err)
            })

    }


    const PostData = ()=>{
         setLoad(true)
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

    // AutoLocation function starts here 

    const LocationData =(data)=>{
          console.log(data);
          setLocation(data?.value.structured_formatting.main_text);
    }

 // AutoLocation function ends here 


//    comments disabled  starts here  

        const getCommentsdisabledValue =(e)=>{
              
              console.log(e.target.checked)
              setDisablecomment(e.target.checked)
        }

        const OpenCommentDisableBox = ()=>{
            if(discommentBox==="displayoff"){
              setDiscommentBox("settingContainer")  
            }
            else{
                setDiscommentBox("displayoff")  
            }
        }

     
           
       






//    comments disabled  ends here  


    return (
        <>
             
                 
            <div className="card input-filed"
                style={{
                    margin: "50px auto",
                    maxWidth: "500px",
                    padding: "20px",
                    textAlign: "center"
                }}
            >
             <div style={{marginBottom:"30px"}} className="location">

                   <LocationAutocomplete LocationData={LocationData} />
               </div>


                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Uplaod Media</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                                               
                                              
                                          <div className="CreatePostsetting"><button onClick={OpenCommentDisableBox} >Settings</button></div>

                   <div className={discommentBox}>
                  
                                <p><br /></p>  

                                    <p>
                       <label>
                         <input onChange={getCommentsdisabledValue} type="checkbox" class="filled-in"  />
                         <span>Comments Disabled</span>
                       </label>
                     </p>
                       
                       
                       </div>                       


                
                <button style={{marginTop:"40px",marginBottom:"20px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}

                >
                    Submit post
                </button>



            </div>
            {load ? <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only"></span>
                </div>
            </div> : null}

        </>
    )
}


export default CretePost