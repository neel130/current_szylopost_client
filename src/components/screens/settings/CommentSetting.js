import React,{useState,useEffect,useContext,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import "../../style/commentsetting.css"
import M from 'materialize-css'
import {UserContext} from '../../../App'

function CommentSetting({deletCmnt,ab,allPost,abc}) {
    const {state,dispatch} = useContext(UserContext)
    const settingMenu = useRef(null)
    const [data, setData] = useState([])

  

    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, []);
    
      console.log(deletCmnt?.postid)
      console.log(deletCmnt?.commentid)
      console.log(deletCmnt?.postedByid)
      console.log(deletCmnt?.contentpostedBy)
      console.log(state?._id)
      console.log(allPost)
      console.log(state?._id===deletCmnt?.postedByid)

    //   Delete Comment logic start here 


    const deleteComment = () => {
        fetch(process.env.REACT_APP_BASE_URL + `/deletecomment/${deletCmnt?.postid}/${deletCmnt?.commentid}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
               
             if(allPost) {
                const newData = allPost.map(item => {
                    if (item._id === result._id) {
                        result.postedBy = item.postedBy;
                        return result
                    }
                    else {
                        return item
                    }
                })
               ab(newData)  
            }
            else{
                 abc(result.comments.length)
            }
                // setData(newData);
              

            })
    }


    const report = ()=>{
        alert("Report submitted")
    }




  return (


    <>

<div id="modal20" ref={settingMenu} class="modal commentmodal">
<div class="modal-content">

{/* <ul>

{state?._id===deletCmnt?.postedByid ?  <li style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} onClick={deleteComment} className='modal-close waves-effect' > <span> <i class="material-icons">delete</i></span>  Delete</li>: <li className='modal-close waves-effect' style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} >Report</li>}

<hr />
    <li  > <span  style={{marginRight:"7px"}} > <i class="material-icons">thumb_up</i></span>  Like</li>

</ul> */}


{state?._id===deletCmnt?.contentpostedBy?
<ul>
<li style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} onClick={deleteComment} className='modal-close waves-effect' > <span> <i class="material-icons">delete</i></span>  Delete</li>

<hr />

 { state?._id===deletCmnt?.postedByid ? null : <>  <li onClick={report} className='modal-close waves-effect' style={{color:"red",fontSize: "18px",
           fontWeight: "500"}} >  <span> <i class="material-icons">report</i></span>  Report</li> <hr /> </> }



<li  > <span  style={{marginRight:"7px"}} > <i class="material-icons">thumb_up</i></span>  Like</li>



</ul>        :


<ul>

{state?._id===deletCmnt?.postedByid ?  <li  style={{color:"red",fontSize: "18px",
    fontWeight: "500"}} onClick={deleteComment} className='modal-close waves-effect' > <span> <i class="material-icons">delete</i></span>  Delete</li>       : 
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

export default CommentSetting