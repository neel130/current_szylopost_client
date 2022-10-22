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

function Post() {
    const {postid} = useParams()
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
        fetch(process.env.REACT_APP_BASE_URL+`/post/${postid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.warn(result)
            setPost(result.post);
           
        })
     },[data,postid])




     useEffect(() => {

        fetch(process.env.REACT_APP_BASE_URL + '/getsubpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                console.log(result.posts.length)
                setData(result.posts)
                setLoad(result)
            })



    }, [chng])





    const childData = (el) => {
        setData(el)

    }



    const likePost = (id) => {
        fetch(process.env.REACT_APP_BASE_URL + '/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })

                setData(newData)
                setChng(chng+1)
            }).catch(err => {
                console.log(err)
            })
    }



    const likeComment = (id) => {
        
        fetch(process.env.REACT_APP_BASE_URL + '/commentlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postCommentId: id
            })
        }).then(res => res.json())
            .then(result => {
                  console.warn(result.likes.length)
                  setChngComm(result.likes.length)
                  
              
            }).catch(err => {
                console.log(err)
            })
    }
   








    const unlikePost = (id) => {
        fetch(process.env.REACT_APP_BASE_URL + '/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
                setChng(chng+1)
            }).catch(err => {
                console.log(err)
            })
    }



    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    console.log(format(dateTime))



   

    const makeComment = (text, postId) => {
        const uid =new Date().getTime().toString();
        setUniqueId(uid)
        fetch(process.env.REACT_APP_BASE_URL + '/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text,
                time: dateTime,
                commentId:uid

            })
        }).then(res => res.json())
            .then(result => {
                  console.warn(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })

                setData(newData)
                setChng(chng+1)
                setComment("")

            }).catch(err => {
                console.log(err)
            })
    }



    useEffect(()=>{
        if(uniqueId){
   fetch(process.env.REACT_APP_BASE_URL+"/commentclone", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                commentId:uniqueId
            })
        }).then(res => res.json())
            .then(data => {

               console.log(data)
            }).catch(err => {
                console.log(err)
            })

        }
      
            
            
    },[uniqueId])

    







    // const deletecomment = (postid)=>{
    //     fetch(`/deletecomment/${postid}`,{
    //         method:"delete",
    //         headers:{
    //             Authorization:"Bearer "+localStorage.getItem("jwt")
    //         }
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         // console.log(result)
    //         const newData = data.filter(record=>{
    //             return record._id !== result._id
    //         })
    //         setData(newData)
    //     })
    // }


     const senddata=(data)=>{
         setData(data)
         setChng(chng+1)
     }


    // const deleteComment = (postId, commentId) => {
    //     fetch(process.env.REACT_APP_BASE_URL + `/deletecomment/${postId}/${commentId}`, {
    //         method: "delete",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         }
    //     }).then(res => res.json())
    //         .then(result => {
    //             const newData = data.map(item => {
    //                 if (item._id === result._id) {
    //                     result.postedBy = item.postedBy;
    //                     return result
    //                 }
    //                 else {
    //                     return item
    //                 }
    //             })
    //             setData(newData);
    //             setChng("deletecomment")

    //         })
    // }



    const ShowLikeUser =()=>{
        setLikeBox("likeContainer")
    }

    const CloseLikeUser =()=>{
        setLikeBox("displayoff")
    }

    console.log(deletCmnt);



  return (

<>
{post?<> 

    <div style={{marginTop:"30px"}} className="card home-card">
                                            <h5 style={{ padding: "5px", fontSize: "19px",marginTop:"31px" }}><Link to={post.postedBy._id !== state._id ? "/profile/" + post.postedBy._id : "/profile"}> <span className='profilepic2' > <img src={post.postedBy.pic} alt="" /> </span> <span style={{display:"inline-flex",flexDirection:"column"}}  > {post.postedBy.name} <span style={{fontSize:"11px",color:"#5e5b5b"}} > {format(post.createdAt)} <span style={{fontSize:"13px",color:"#5e5b5b"}} >{post.location?<>, <i style={{position:"relative",top:"8px",color:" rgb(157 157 196)"}} class="Tiny material-icons">location_on</i>{post.location}</>:<></>} </span>  </span>   </span>  </Link>




                                                <svg style={{
                                                    float: "right",
                                                    marginRight: "5px"
                                                }}

                                                    data-target="modal2"
                                                    onClick={() => setCurrentPost(post)}
                                                    xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear-wide-connected modal-trigger " viewBox="0 0 16 16">
                                                    <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
                                                </svg>

                                            </h5>



                                            {post.catagory === "audio" ?

                                                <div className="audiobox" style={{ display: "flex", justifyContent: "center" }} >


                                                    <audio style={{ width: "80%", marginTop: "50px", marginBottom: "30px" }} controls >

                                                        <source src={post.photo} type="audio/mp3" />

                                                    </audio>

                                                </div> :


                                                <>

                                                    {!post.photo ? <div> </div> : <div className="card-image">

                                                        {post.catagory === "video" ?

                                                            <div className="videoplay"  >
                                                                <video width="100%" height="400" controls >
                                                                    <source src={post.photo} type="video/mp4" />
                                                                </video>
                                                            </div>
                                                            :
                                                            <Link to={"/post/" + post._id} > <img src={post.photo} /> </Link>
                                                        }
                                                    </div>}




                                                </>

                                            }

                                            <div className="card-content">

                                                {post.photo ? <div className='changelikeposition'>
                                                    <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                                    {post.likes.includes(state._id)
                                                        ?
                                                        <i className="material-icons"
                                                            onClick={() => { unlikePost(post._id) }}
                                                        >thumb_down</i>
                                                        :
                                                        <i className="material-icons"
                                                            onClick={() => { likePost(post._id) }}
                                                        >thumb_up</i>
                                                    }


                                                    <h6 onClick={ShowLikeUser} >{post.likes.length} likes</h6>


                                            {!post.likes.length<=0?
                                                    <div className={likeBox}>
                                                       <div onClick={CloseLikeUser} style={{float:"right"}} className="closebox"><i class="material-icons">close</i></div>
                                                      <p style={{color:"gray",fontWeight:"bold",marginBottom:"5px"}} > Likes : </p>
                                                      {
                                                          post.likes.map((elem)=>{
                                                              console.log(elem)
                                                              return(

                                                              <PostLike  userid={elem} />
                                                              )
                                                          })
                                                      }
                                                    </div>
                                               : null
                                }


                                                    <h6>{post.title}</h6>
                                                    <p>{post.body}</p>

                                             {post.disablecomment===true? <p></p> :
                                                    <div className="textScroller">
                                                        {
                                                            post.comments.map(record => {
                                                                console.warn(record)
                                                                return (
                                                                    <div key={record._id}>
                                                                        <h6 style={{ margin: "0", display: "inline" }} >  <Link to={state?._id === record.postedBy._id ? "/profile" : "/profile/" + record.postedBy._id} >  <span style={{ marginRight: "5px" }} className='profilepic' >  <img src={record.postedBy.pic} alt="" srcset="" /> </span>   </Link>   <span style={{ fontWeight: "600" }}>{record.postedBy.name}</span> <span style={{ marginLeft: "5px", color: "#353232" }} > {record.text}  </span>  
                                                                    <br />
                                                                      <p style={{display:"inline",marginLeft:"18px",position:"relative",bottom:"3px",fontSize:"12px",fontWeight:"700",color:"rgb(122 117 117 / 96%)"}} >
                                                                          <span onClick={() => setDeleteCmnt({postid:post._id,commentid: record._id,postedByid:record.postedBy._id,contentpostedBy:post.postedBy._id})} data-target="modal20" className='modal-trigger'  >Settings</span> <span style={{marginLeft:"14px"}} >Reply</span> </p>


                                                                <span><p style={{position:"relative",bottom:"22px",right:"3px",float:"right",color:"gray",fontSize:"12px",display:"inline"}} >
                                                                            <CommentLIkes commentId={record.commentId} chngdata={chngComm} /></p></span>

                                                                         </h6>

                                                                          <p style={{ color: "grey", fontSize: "10px",display:"inline",float:"left" }} >{format(record.time)}</p> 

                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    }


                                                </div> : <div className='changelikeposition2'>

                                                    <h6>{post.title}</h6>
                                                    <p>{post.body}</p>

                                                    <br />

                                                    <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                                    {post.likes.includes(state._id)
                                                        ?
                                                        <i className="material-icons"
                                                            onClick={() => { unlikePost(post._id) }}
                                                        >thumb_down</i>
                                                        :
                                                        <i className="material-icons"
                                                            onClick={() => { likePost(post._id) }}
                                                        >thumb_up</i>
                                                    }


                                                    <h6 onClick={ShowLikeUser} >{post.likes.length} likes</h6>

                                                 

                                                 { !post.likes.length<=0?
                                                    <div className={likeBox}>
                                                       <div onClick={CloseLikeUser} style={{float:"right"}} className="closebox"><i class="material-icons">close</i></div>
                                                      <p style={{color:"gray",fontWeight:"bold",marginBottom:"5px"}} > Likes : </p>
                                                      {
                                                          post.likes.map((elem)=>{
                                                              console.log(elem)
                                                              return(
                                                                  
                                                                <PostLike  userid={elem} />
                                                               
                                                              )
                                                          })
                                                      }
                                                    </div>
                                              : null

                                }
                                               




                                       {post.disablecomment===true? <p></p> :

                                              <>
                                       <Link to={"/comments/" + post._id} >   <p> View all comments </p></Link> 


                                                    <div className='textScroller'>
                                                        {
                                                            post.comments.map(record => {
                                                                console.warn(record.commentId)

                                                                return (
                                                                    <div key={record._id} >

                                                                        <h6 style={{ margin: "0", display: "inline" }} > <Link to={state?._id === record.postedBy._id ? "/profile" : "/profile/" + record.postedBy._id} > <span style={{ marginRight: "5px" }} className='profilepic' >  <img src={record.postedBy.pic} alt="" srcset="" /> </span>  </Link>  <span style={{ fontWeight: "600" }}>{record.postedBy.name}</span> <span style={{ marginLeft: "5px", color: "#353232" }} > {record.text} </span>   
                                                                        
                                                                        <br />
                                                                      <p style={{display:"inline",marginLeft:"18px",position:"relative",bottom:"3px",fontSize:"12px",fontWeight:"700",color:"rgb(122 117 117 / 96%)"}} >
                                                                          <span onClick={() => setDeleteCmnt({postid:post._id,commentid: record._id,postedByid:record.postedBy._id,contentpostedBy:post.postedBy._id})} data-target="modal20" className='modal-trigger' >Settings</span> <span style={{marginLeft:"14px"}} >Reply</span> </p>

                                                                       
                                                                        <span><p style={{position:"relative",bottom:"22px",right:"3px",float:"right",color:"gray",fontSize:"12px",display:"inline"}} >
                                                                            <CommentLIkes commentId={record.commentId} chngdata={chngComm} /></p></span>


                                                                         </h6>

                                                                          <p style={{ color: "grey", fontSize: "10px",display:"inline",float:"left"  }} >{format(record.time)}</p>

                                                                    </div>

                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    </>

                                                    }





                                                </div>}

                                            {post.disablecomment===true? <p style={{color:"#8080808c",fontSize:"13px",marginTop:"10px",marginLeft:"10px"}} >Comments Disabled</p> :
                                                <form onSubmit={(e) => {
                                                    e.preventDefault()
                                                    makeComment(e.target[0].value, post._id)

                                                }} >
                                                    <input value={comment} onChange={(e) => { setComment(e.target.value) }} type="text" placeholder="add a comment" />
                                                </form>
                                }


                                            </div>
                                        </div>


                        <PostSetting allPost ={data} currentPost = {currentPost} parentData={childData} / >

              <SocialShare currentPost = {currentPost}/ >



</>










:<Loading/>
}

</>

  )
}

export default Post