import React, { useState, useEffect, useContext, useRef } from "react";
import LikeNotifications from "./NotificationsFile/LikeNotifications";
import { UserContext } from '../../App'
import CommentNotifications from "./NotificationsFile/CommentNotifications";
import FollersNotifications from "./NotificationsFile/FollersNotifications";
import '../style/notifications.css'

function Notifications() {
  const { state, dispatch } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [follwers,setFollowers]=useState("displayoff")
    const [likes,setLikes] = useState("displayoff")
    const [comments,setComments]=useState("displayoff")
    const [not,setNot]= useState("notification-container")



    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL + "/getownpost", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setData(result.posts);
          });
      }, []);

 console.log(state)


 const followOpen = ()=>{
  setFollowers("followersbox")
  setComments("displayoff")
  setLikes("displayoff")
  setNot("displayoff")
  
 }

 const likeOpen = ()=>{
  setFollowers("displayoff")
setComments("displayoff")
setLikes("likebox")
  setNot("displayoff")
  
 }

 const commentsOpen = ()=>{
  setFollowers("displayoff")
  setComments("commentsbox")
  setLikes("displayoff")
  setNot("displayoff")
  
 }




  return (
    <>

 

 <div className={not}>
<h1 style={{marginTop:"63px",fontFamily:"fantasy",color:"gainsboro"}}>Notifications</h1>
<div onClick={followOpen} className="followers-box">

<div style={{display:"flex",flexDirection:"column"}} >
 <i className="medium material-icons" style={{color:"#d2b50d"}}>person_add</i>
 <p style={{margin:"auto",color:"GrayText"}} >follows</p>
</div>

</div>

<div onClick={likeOpen} className="likes-box">

  <div style={{display:"flex",flexDirection:"column"}} >
 <i className="medium material-icons" style={{color:"red"}}>favorite</i>
 <p style={{margin:"auto",color:"GrayText"}} >likes</p>
</div> 

</div>

<div onClick={commentsOpen} className="comments-box">

<div className="icon" style={{display:"flex",flexDirection:"column"}} >
 <i className="medium material-icons" style={{color:"#0095ff",margin:"auto"}}>textsms</i>
 <p style={{margin:"auto",color:"GrayText"}} >comments</p>
</div> 

</div>

 </div>


<div className="mainbox" style={{marginTop:"60px"}} >


<div className={likes} >

{
    data.map((item)=>{
        
        console.log(item.likes)
        return(
     <>
      

        <>
  {
    item.likes.filter((m)=>m!==state?._id).map((x)=>{
      console.log(x)
      return(
        <>
        <div onClick={()=>setLikes(x)} className="likenotification">
      <LikeNotifications likeid={x} />
       </div>
        </>
      )
    })  
  }

        </>
</>
        )
    })
}

</div>

   {/* <h3>comments</h3> */}

<div className={comments} >
   {
     data.map((item)=>{

     return(
        <>
      {item.comments?
            item.comments.filter((m)=>m.postedBy._id!==state?._id).map((x)=>{
            console.log(x)
            return(
            <>
            <div className="likenotification">
            <CommentNotifications commentid={x.postedBy._id} commentText={x.text} />
            </div>
            </>
          )
        })  :
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} ><h3 style={{color:"green",fontWeight:"bolder"}} ><span style={{color:"gray"}} > 0</span> Notifications</h3></div>
      }
         </>
     )
     })
   }
</div>

 {/* <h3>followers</h3> */}

 <div className={follwers} >

   {state?.followers?
    state?.followers.map((item)=>{
      return(
        <>
     {  <FollersNotifications follersid={item} /> }
     </>
      )
    }) :
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} ><h3 style={{color:"green",fontWeight:"bolder"}} ><span style={{color:"gray"}} > 0</span> Notifications</h3></div>
   
   }

</div>

</div>


    </>
  )
}

export default Notifications