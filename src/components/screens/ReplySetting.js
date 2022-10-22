import React,{useState,useEffect,useContext,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import "../style/commentsetting.css"
import M from 'materialize-css'
import {UserContext} from '../../App'

function ReplySetting({deletCmnt,deletereply}) {
    const {state,dispatch} = useContext(UserContext)
    const settingMenu = useRef(null)
    const [data, setData] = useState([])
  


  console.log(deletCmnt)
    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, []);


      const deleteReply =(commentId,replyId)=>{
        fetch(process.env.REACT_APP_BASE_URL + `/deletereply/${commentId}/${replyId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
            console.log(result) 
            deletereply(result.reply.length)
            
            })

      }


      const report = ()=>{
        alert("Report submitted")
    }




  return (


    <>
    
    <div id="modal21" ref={settingMenu} class="modal commentmodal">
<div class="modal-content">
{/* <ul>

{state?._id===deletCmnt?.postedByid ?  <li style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} onClick={deleteReply} className='modal-close waves-effect' > <span> <i class="material-icons">delete</i></span>  Delete</li>: <li className='modal-close waves-effect' style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} >Report</li>}

<hr />
    <li  > <span  style={{marginRight:"7px"}} > <i class="material-icons">thumb_up</i></span>  Like</li>

</ul> */}


{state?._id===deletCmnt?.contentpostedBy?
<ul>
<li style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} onClick={()=>deleteReply(deletCmnt?.commentdata,deletCmnt?.commentid)} className='modal-close waves-effect' > <span> <i class="material-icons">delete</i></span>  Delete</li>

<hr />

 { state?._id===deletCmnt?.postedByid ? null : <>  <li onClick={report} className='modal-close waves-effect' style={{color:"red",fontSize: "18px",
           fontWeight: "500"}} >  <span> <i class="material-icons">report</i></span>  Report</li> <hr /> </> }



<li  > <span  style={{marginRight:"7px"}} > <i class="material-icons">thumb_up</i></span>  Like</li>



</ul>        :


<ul>

{state?._id===deletCmnt?.postedByid ?  <li  style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} onClick={()=>deleteReply(deletCmnt?.commentdata,deletCmnt?.commentid)} className='modal-close waves-effect' > <span> <i class="material-icons">delete</i></span>  Delete</li>       : 
     <li onClick={report} className='modal-close waves-effect' style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} > <span> <i class="material-icons">report</i></span> Report</li>}
 

<hr />
    <li  > <span  style={{marginRight:"7px"}} > <i class="material-icons">thumb_up</i></span>  Like</li>

</ul>




}

 

</div>

</div>

    
    </>


  )
}

export default ReplySetting