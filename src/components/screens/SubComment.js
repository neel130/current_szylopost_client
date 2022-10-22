import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from '../../App'
import CommentLIkes from './CommentLIkes'
import {useParams,useHistory,Link} from 'react-router-dom'
import { format } from "timeago.js";
import CommentSetting from './settings/CommentSetting';
import ReplySetting from './ReplySetting';

function SubComment({record,post,targetInput,chngComm,homedata}) {

    const { state, dispatch } = useContext(UserContext)
    const [deletCmnt,setDeleteCmnt] = useState({})
    const [reply,setReply] = useState(null)
    const [replybox,setReplybox]=useState("displayoff")
    const [chngreply,setChngreply] =useState("")
    console.log(record)
    const commentdata = record.commentId ;
      console.log(post)
      console.log(deletCmnt)

      const deletereply=(data)=>{
           setChngreply(data)
      }

    useEffect(() => {
        if(record.commentId){
              fetch(process.env.REACT_APP_BASE_URL+'/commentclone/'+record.commentId, {
                  headers: {
                      "Authorization": "Bearer " + localStorage.getItem("jwt")
                  }
              }).then(res => res.json())
                  .then(result => {
                      console.warn(result.results.reply)
                      setReply(result.results.reply)
                     
                      
                  })
      
              }
      
          }, [record.commentId,chngComm,chngreply])

          const showreply = ()=>{
            setReplybox("")
                
          }


          const hidereply = ()=>{
            setReplybox("displayoff")
                
          }


  return (

    <>



 
      <div style={{display:"flex"}}  className="commentBox">

          <div style={{ margin: "0", display: "inline" }} > 
          <Link to={state?._id === record.postedBy._id ? "/profile" : "/profile/" + record.postedBy._id} > 
          <span style={{ marginRight: "5px" }} className='profilepic2' >  <img src={record.postedBy.pic} alt="" srcset="" />
           </span>  
           </Link>  
           </div>
        
           <div  style={{width:"65%",lineHeight:"18px",marginBottom:'10px'}} >
           <span style={{ fontWeight: "600" }}>{record.postedBy.name}</span>
            <span style={{ marginLeft: "5px", color: "#353232" }} > {record.text} </span>   
           </div> 


           <div style={{color:"gray",fontSize:"12px",display:"inline",float:"right",marginLeft:"26px",marginTop:"15px"}} >
           <CommentLIkes commentId={record.commentId}  />
           </div>

             </div>
         

      <div style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}  className="commentLowerbox">
 
        <div style={{ color: "grey", fontSize: "10px"  }} >{format(record.time)}</div>


         <div style={{marginLeft:"18px",position:"relative",bottom:"3px",fontSize:"12px",fontWeight:"700",color:"rgb(122 117 117 / 67%)"}} >
          <span  data-target="modal20" className='modal-trigger' >Settings</span>
        {homedata===true ?  <Link  to={"/comments/" + post._id} > <span style={{marginLeft:"20px",color:"rgb(122 117 117 / 67%)"}} >Reply</span>  </Link>  :  <span onClick={()=>targetInput(record.commentId)} style={{marginLeft:"20px"}} >Reply</span> }

            </div>
    
                                                                      
           </div>

           { reply?.length>0?
    
    <div style={{marginBottom:"20px",marginLeft:"65px",fontSize:"12px",fontWeight:"500",color:"grey"}}>
    { replybox==="displayoff"  ?    <p onClick={showreply} > ----   view {reply?.length} more {reply?.length===1?<>reply</>:<>replies</>}</p> :   <p onClick={hidereply}  >hide {reply?.length===1?<>reply</>:<>replies</>}</p>       }
      </div>     
    : null
           }


<div className={replybox} >
         {      reply?.map((record)=>{
             return(
                  
                <div 
                onClick={() => setDeleteCmnt({postid:post._id,commentid: record._id,postedByid:record.postedBy._id,contentpostedBy:post.postedBy._id,commentdata:commentdata})}
                style={{marginLeft:"65px"}} key={record._id}  >

<div style={{display:"flex"}}  className="commentBox">

<div style={{ margin: "0", display: "inline" }} > 
<Link to={state?._id === record.postedBy._id ? "/profile" : "/profile/" + record.postedBy._id} > 
<span style={{ marginRight: "5px" }} className='profilepic-comment-reply' >  <img src={record.postedBy.pic} alt="" srcset="" />
 </span>  
 </Link>  
 </div>

 <div  style={{width:"65%",lineHeight:"18px",marginBottom:'10px'}} >
 <span style={{ fontWeight: "600" }}>{record.postedBy.name}</span>
  <span style={{ marginLeft: "5px", color: "#353232" }} > {record.text} </span>   
 </div> 


 <div style={{color:"gray",fontSize:"12px",display:"inline",float:"right",marginLeft:"26px",marginTop:"15px"}} >
 <CommentLIkes commentId={record.commentId}  />
 </div>

   </div>


<div style={{display:"flex",marginLeft:"40px",marginBottom:"20px"}}  className="commentLowerbox">

<div style={{ color: "grey", fontSize: "10px"  }} >{format(record.time)}</div>


<div  



style={{marginLeft:"18px",position:"relative",bottom:"3px",fontSize:"12px",fontWeight:"700",color:"rgb(122 117 117 / 67%)"}} >
<span  data-target="modal21" className='modal-trigger' >Settings</span>
  <span onClick={()=>targetInput(record.commentId)} style={{marginLeft:"20px"}} >Reply</span>
   </div>

                                                            
 </div>
                </div>
               
             )
         })
         
         
         
         
         }

</div>
    

   <ReplySetting   deletCmnt={deletCmnt}  deletereply={deletereply}  />


        


    </>

  )
}

export default SubComment