import React, { useEffect, useState, useContext,useCallback,useRef } from 'react'
import { UserContext } from '../../../../App'
import { useHistory } from 'react-router-dom'
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { generateDownload } from "../../ImageFilter/ImageCropping/utils/cropimage";
import "../../ImageFilter/ImageCropping/cropping.css"

function EditProfile() {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    // const [photo, setPhoto] = useState(state?.pic)
    const [name, setName] = useState(state?.name)
    const [username, setUsername] = useState(state?.username)
    const [pic, setPic] = useState("")
    const [bio, setBio] = useState(state?.bio)
    const [load, setLoad] = useState("profileOff")
    const [check,setCheck] = useState("profileOff")
    const [btn,setBtn] = useState(false)

    const [imgdata,setImgdata]= useState(state?.pic)
    const [image, setImage] =useState(null)
	const [croppedArea, setCroppedArea] =useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1) 

    console.log(pic);
    console.log(imgdata);
    console.log(state?.pic)


    useEffect(() => {
        if (imgdata) {

            const data = new FormData()
            data.append("file", imgdata)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "neel1304")
            fetch("https://api.cloudinary.com/v1_1/neel1304/image/upload", {
                method: "post",
                body: data
            })

                .then(res => res.json())
                .then(data => {

                    console.log(data)
                    setPic(data.url)
                    
                })
                .catch(err => {
                    console.log(err)
                })

        }


    }, [imgdata])

    useEffect(()=>{
        if(pic){
           setCheck("profileOn")
           setLoad("profileOff")
        }else{
            setLoad("profileOn")
            setCheck("profileOff")
        }
    },[pic])


useEffect(()=>{
 setPic(null)
},[imgdata])


    const UpdateProfile = () => {

        fetch(process.env.REACT_APP_BASE_URL+'/updateprofile', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                name,
                username,
                bio,
                pic
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                // localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({ type: "UPDATEPROFILE", payload: { name: data.name, username: data.username, pic: data.pic, bio: data.bio } });
                localStorage.setItem("user", JSON.stringify({ ...state, name: data.name, username: data.username, bio: data.bio, pic: data.pic }));

                history.push('/profile')
                //window.location.reload()
            }).catch(err => {
                console.log(err)
            })



    }



    // Image cropping filter starts here


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        setCroppedArea(croppedAreaPixels);
      }, [])



    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
        }
    };



    const onDownload = () => {
        generateDownload(image, croppedArea)
        .then((res)=>{
            console.log(res)
            setImgdata(res)
        })
          console.log(image);
         setImage(null)
        
          
      };


// Image cropping filter ends here




    return (
        <>
        <div className="imageCropping">

        {/* <img src={data} alt="" srcset="" /> */}
    
    
				{image ? (
					<>
						<div className='cropper'>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>

						<div className='slider'>
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e, zoom) => setZoom(zoom)}
							/>
						</div>

                        <div className='container-buttons'>
				
				<Button variant='contained' color='secondary' onClick={onDownload}>
					Save
				</Button>
			</div>
					</>
				) : null}
			

			
		


        </div>


 {/* Image cropping ends here */}



{!image?

            <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                <div style={{hieght:"30vh"}} >


                    <div style={{hieght:"30vh"}} >
                        <div style={{ display: "flex", justifyContent: "center" }} >
                            <img className='editpic'
                                src={state?.pic}
                            />

                        </div>
                        <div className='editprofile'>
                            <label htmlFor="">username</label>
                            <h5> <span> <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Edit username' /> </span> </h5>
                            <label htmlFor="">name</label>
                            <h6><span> <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Edit name' /> </span> </h6>
                            {/* <label htmlFor="Bio">Bio</label>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                 Deleniti placeat eveniet optio nisi odio numquam illum inventore accusamus,
                                <span> <textarea name="Bio" id="" cols="30" placeholder='Edit Bio' rows="10"></textarea> </span>  </p> */}
                            <label htmlFor="">bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)} placeholder='edit bio....' name="" id="" cols="30" rows="10"></textarea>

                        </div>



                    </div>



                    <div  className="file-field input-field" style={{ margin: "10px" }}>
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update pic</span>
                            <input type="file" onChange={onSelectFile} />
                        </div>

                       
                            <div className={load} >
                            <div style={{ float: "right" }} class="spinner-border text-info" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                          </div> 
                            
                            <div className={check}>
                            <svg style={{float:"right"}} xmlns="http://www.w3.org/2000/svg" width="31" height="" fill="green" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                            </svg>
                             </div>
                        

                        
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>


                    </div>

                   <div className="updateprofile">
                    <button disabled={btn} onClick={UpdateProfile}  >Update Profile</button>
                   </div>
                   
                </div>



            </div>

         : null                   }

        </>
    )
}

export default EditProfile