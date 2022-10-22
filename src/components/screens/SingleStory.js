import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../../App'
import M from 'materialize-css'
import {useParams,useHistory,Link} from 'react-router-dom'
import Loading from './Loading'
import PostSetting from './settings/PostSetting'
import Homeicon from './Homeicon'
import SocialShare from './settings/SocialShare'
import { format } from "timeago.js";
import CommentSetting from './settings/CommentSetting'
import PostLike from './PostLike'
import CommentLIkes from './CommentLIkes'

function SingleStory() {
    const {storyid} = useParams()
    const [post,setPost] = useState("")
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [load, setLoad] = useState(null)
    const [comment, setComment] = useState("")
    const [currentPost, setCurrentPost] = useState(null)
    const [chng, setChng] = useState(1)
    const [likeBox,setLikeBox]=useState("displayoff")
    const [deletCmnt,setDeleteCmnt] = useState({})
    const [uniqueId,setUniqueId] = useState(null)
    const [chngComm,setChngComm] = useState(Number)


    useEffect(()=>{
        fetch(process.env.REACT_APP_BASE_URL+`/story/${storyid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.warn(result)
            setPost(result.post);
           
        })
     },[data,storyid])






  return (



<div className="storyimage">
{/* <i  class="small material-icons">close</i> */}



<div  className="line"></div>
   
<img  src={post.photo} alt="" />

</div>

  )
}

export default SingleStory