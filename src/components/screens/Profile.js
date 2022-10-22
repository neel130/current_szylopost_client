import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import Loading from './Loading'
import { Link, useHistory } from 'react-router-dom'
import profilepic from '../images/defaultprofile.png'
import OwnPost from './settings/profilesettingMenu/OwnPost'
import './../style/profile.css'

const Profile  = ()=>{
 
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
  
    const [load,setLoad] = useState(null)
    const [togglebtn,setTogglebtn] = useState("")
    const [profilePhoto,setProfilePhoto]=useState("propic")
    const [check,setCheck] = useState(false)
    const [gallerDesign,setGalleryDesign] = useState("")
    const [galleritem,setGalleryItem]= useState("item")
    const [list,setList] = useState(null)
    
    console.log(state);
    console.log(state?.bio)
    useEffect(()=>{
       fetch(process.env.REACT_APP_BASE_URL+'/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setLoad(result)
           setPics(result.mypost)
       })
    },[])



   



// const submitBio = () => {
//     fetch(process.env.REACT_APP_BASE_URL+"/createbio", {
//         method: "post",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + localStorage.getItem("jwt")
//         },
//         body: JSON.stringify({
//             bio
//         })
//     }).then(res => res.json())
//         .then(data => {

//             if (data.error) {
//                 console.log("error")
//             }
//             else {

//               window.location.reload();

//             }
//         }).catch(err => {
//             console.log(err)
//         })

//     }

    
//  Profile design toggle function starts here 

console.log(togglebtn)
useEffect(()=>{
   
   if(togglebtn===true){
       console.log("profile squire")
       setProfilePhoto("propic-square")
       localStorage.setItem("ProfilePic","square")
       setCheck(true)
   }
    else if(togglebtn===false){
        setProfilePhoto("propic")
        localStorage.setItem("ProfilePic","cirle")
        setCheck(false)
   }
   
},[togglebtn])


const proImgData = localStorage.getItem("ProfilePic")
// const checkstatus = localStorage.getItem("checkbtn")
useEffect(()=>{
   if(proImgData==="square"){
       setProfilePhoto("propic-square");
       setCheck(true)
   }
   else{
       setProfilePhoto("propic");
   }
},[proImgData])


//  Profile design toggle function ends here




// Gallery dropdown menu design function starts here 
    
 const galleryChange = (e)=>{
  setGalleryDesign(e.target.value)
 }

 useEffect(()=>{
     console.log("useeffect calling")
  if(gallerDesign==="circle"){
    setGalleryItem("item-circle")
    console.log("done circle")
    setList(null)
  }
  else if(gallerDesign==="square"){
    setGalleryItem("item")
    console.log("done square")
    setList(null)
  }
  else if(gallerDesign==="list"){
 setList("data")
  }


 },[gallerDesign])
console.log(galleritem)
console.log(gallerDesign)

// Gallery dropdown menu square and circle design function ends here



console.log(list)



// Gallery dropdown menu design function ends here





   return (
       <>
    
{load?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div className='profilesec' >

{/* Toggle swith starts here */}

           <div style={{position:"absolute",top:"107px",right:"0"}} class="switch">
        <label>
     
      <input defaultChecked={check}  onChange={(e)=>{setTogglebtn(e.target.checked)}} type="checkbox"/>
      
      <span class="lever"></span>
    
       </label>
       </div>

{/* Toggle switch ends here  */}

           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div data-target="modal19" className='modal-trigger'  >
                   <img  className={profilePhoto} 
                   src={state.pic?state.pic:profilepic}
                   />
                 
               </div>
               <div className='prodetails'>
                   <h5>{state?state.username.toString().slice(0,8):"loading"}</h5>
                   <h6>{state?state.name.toString().slice(0,12):"loading"}</h6>
                   <div style={{display:"flex",justifyContent:"space-between",width:"101%"}}>
                       <h6><b style={{fontSize:"20px"}}>{mypics.length}</b> posts</h6>
                   <Link to={"/profilefollower"} ><h6><b style={{fontSize:"20px"}}>{state?state.followers.length:"0"}</b> followers</h6> </Link>
                    <Link to={"/profilefollowing"} ><h6><b style={{fontSize:"20px"}}>{state?state.following.length:"0"}</b> following</h6> </Link>
                   </div>

               </div>


        <div className="profileSetting" style={{marginTop:"30px",marginRight:"15px"}} >

               <svg  data-target="modal4"  xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical modal-trigger " viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>


</div>
        
           </div>

{ state.bio?

     <div className="bio">  
    <label htmlFor="">BIO -</label>      
   <p> {state.bio}
         </p>
   </div> : <Link className='editbio' to={'/editprofile'}> <button>+ add bio</button></Link> 
}


            </div>    



{/* Gallery dropdown menu button starts here  */}



<select onChange={galleryChange} className="browser-default" name="drop" id="">
 <option value="square">square</option>
 <option value="circle">circle</option>
 <option value="list">list</option>

</select>


{/* Gallery dropdown menu button ends here  */}


   { list ? <OwnPost/>
      :
           <div className="gallery">
               {
                   mypics.map(item=>{
                       console.log(item)
                       return( <>
                       {item.catagory==="image"?<Link className='singleImagePost' to={"/post/"+item._id} > <img key={item._id} className={galleritem} src={item.photo} alt={item.title}/> </Link> : <></>  }
                       </>
                       )
                   })
               }

           
           </div>

            }

       </div> : <Loading/>}
       </>
   )
}


export default Profile