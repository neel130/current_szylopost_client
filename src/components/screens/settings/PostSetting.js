import React,{useState,useEffect,useContext,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { saveAs } from 'file-saver'
import "../../style/postsetting.css"
import M from 'materialize-css'
import {UserContext} from '../../../App'

function PostSetting({allPost,currentPost,parentData}) {
  
 
 const history = useHistory();
const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
  console.log(currentPost);
 
    const settingMenu = useRef(null)

    const postid = currentPost?._id
    const postData = currentPost?.photo
    console.log(postData)
    const url = window.location.href
    // console.log(url)

const deletePost = ()=>{
        fetch(process.env.REACT_APP_BASE_URL+`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = allPost.filter(item=>{
                return item._id !== result._id 
            })
            setData(newData)
            console.log(newData)
            parentData(newData)
            if(url!="http://localhost:3000/#/"){
              history.push('/')
            }
            
        })
    }



    const reportPost = () => {

   alert("Report submitted")

    }



    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, []);


      const download = () => {
        saveAs(postData, 'szylopost.jpg') // Put your image url here.
      
      };





  return (
    <>
    
    <div id="modal2" ref={settingMenu} class="modal postmodal">
<div class="modal-content">
  
  <ul>

{currentPost?.postedBy._id === state?._id ?<li style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} className='modal-close waves-effect' onClick={deletePost} >Delete</li>: <li className='modal-close waves-effect' onClick={reportPost} style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} >Report</li>}

<hr />
    { postData? <><li className='modal-close waves-effect' onClick={download} >Download</li>     <hr />    </>      :null
    
    
    }


<Link to={"/post/"+postid} className='modal-close waves-effect' > Go to Post </Link>

<hr />

 <li>Copy Link</li>
 <hr />

 <button data-target="modal5" className='btn modal-trigger modal-close waves-effect ' > share </button>
 </ul>

</div>
<div class="modal-footer">
  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
</div>
</div>
    
    </>
  )
}

export default PostSetting