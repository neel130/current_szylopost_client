import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams,useHistory,Link} from 'react-router-dom'
import Loading from './Loading'
import profilepic from '../images/defaultprofile.png'
import Chat from './chat/Chat'
import UserprofileFollower from './UserprofileFollower'
import UserprofileFollowing from './UserprofileFollowing'

const Profile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext);
    const [scroll,setScroll] = useState(null)
     console.log(state);
     console.log(userProfile?.user);
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state?.following.includes(userid):true)
    const [chattgle,setChattgl]=useState(false)
    const [openfollow,setOpenfollow]=useState("userProfileMain")
    const [on,setOn] =useState("profileOff")
    const [followingOn,setFollowingOn]=useState("profileOff")
  
  const msgBtn = ()=>{
    setChattgl(true);
   setScroll(true);
  }

console.log(showfollow)
console.log(userid);

 console.log(state?!state?.following.includes(userid):true)
  console.log(state?.followers)


  useEffect(()=>{
    
      localStorage.setItem("followers",JSON.stringify(state?.followers))
})


  useEffect(()=>{
    if(state?.following.includes(userid)){
        setShowFollow(false)
        console.log("condition working")
       }
       })


    useEffect(()=>{
       fetch(process.env.REACT_APP_BASE_URL+`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
            setProfile(result)
       })
       console.log("useeffect calling")
    },[])


    console.log(userProfile)

    const followUser = ()=>{
        fetch(process.env.REACT_APP_BASE_URL+'/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }


    const unfollowUser = ()=>{
        fetch(process.env.REACT_APP_BASE_URL+'/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             console.log("unwanted calling")
             
        })
    }


//  Show Followers and following logic starts here 

       

           const showFollower = ()=>{
            setOpenfollow("profileOff")
            setOn("profileOn")
            setFollowingOn("profileOff")
           }


           const showFollowing = ()=>{
            setOpenfollow("profileOff")
            setOn("profileOff")
            setFollowingOn("profileOn")
           }










   return (
       <>
       <div className={openfollow}>
       {userProfile ?
       <div  className={!chattgle?"pofileOn":"profileOff"} style={{maxWidth:"550px",margin:"0px auto"}}>
           <div className="profilesec">
           <div style={{
               display:"flex",
               justifyContent:"space-around"
           }}>
               <div>
              
                   <img className='propic'
                   src={userProfile.user.pic?userProfile.user.pic:profilepic}
                   />
               </div>

               <div  className="profileSetting  " style={{marginTop:"30px",position:'absolute',right:"19px",zIndex:"5px"}} >

<svg  data-target="modal3"  xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical modal-trigger " viewBox="0 0 16 16">
<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>


</div>


               <div className='user-prodetails'>
                   <h5>{userProfile.user.username.slice(0,8)}</h5>
                   <h6>{userProfile.user.name.slice(0,12)}</h6>


                   
                   <div style={{display:"flex",justifyContent:"space-between",width:"101%"}}>
                       <h6><b style={{fontSize:"20px"}}>{userProfile.posts.length}</b> posts</h6>


   { userProfile?.user.privatemode ===false ?


               <>
                <h6 onClick={showFollower} ><b style={{fontSize:"20px"}}>{userProfile.user.followers.length}</b> followers</h6>
                       <h6 onClick={showFollowing} ><b style={{fontSize:"20px"}}>{userProfile.user.following.length}</b> following</h6>
               </>

:
     
<>

{ showfollow === false ?


            <>
             <h6 onClick={showFollower} ><b style={{fontSize:"20px"}}>{userProfile.user.followers.length}</b> followers</h6>
                       <h6 onClick={showFollowing} ><b style={{fontSize:"20px"}}>{userProfile.user.following.length}</b> following</h6>
            </>

         :

       <>
        <h6 ><b style={{fontSize:"20px"}}>{userProfile.user.followers.length}</b> followers</h6>
                       <h6 ><b style={{fontSize:"20px"}}>{userProfile.user.following.length}</b> following</h6>
       </>


}
</>

         }


                      


                   </div>








                   
                   {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button> 
                    }


                        


                   
                    { userProfile?.user.privatemode ===false ?

                    <button
                    
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={msgBtn}
                    >
                     Chat
                    </button>


                    :
     
                    <>

                    { showfollow === false ?
                            <button
                                        
                            className="btn waves-effect waves-light #64b5f6 blue darken-1"
                            onClick={msgBtn}
                            >
                                 Chat
                             </button>
                           
                           :
                    
                           null
                    
                    
                    }
                    </>
                    
                            }
                    








                  
                  

               </div>
           </div>
     </div>


{ userProfile?.user.privatemode ===false ?


   <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                       return(  <>
                        {item.catagory==="image"?<Link className='singleImagePost' to={"/post/"+item._id} > <img key={item._id} className="item" src={item.photo} alt={item.title}/> </Link> : <></>  }
                     </>  )
                   })
               }

           
           </div>

 :
        
<>

{ showfollow === false ?
    <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                       return(  <>
                        {item.catagory==="image"?<Link className='singleImagePost' to={"/post/"+item._id} > <img key={item._id} className="item" src={item.photo} alt={item.title}/> </Link> : <></>  }
                     </>  )
                   })
               }

           
           </div> :

           <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"50px"}} className="privatemodeOn">
               <div className="lockIcon">
          <i class=" medium material-icons">lock</i>
          </div>
          <p style={{fontWeight:"bold",lineHeight:"0"}} >Account is Private</p>
          <p style={{color:"grey"}} >Follow this account to see their photos and videos</p>

               </div>


}
</>

            }

            





       </div>
       
       
       :<Loading/>}

      <div className={chattgle?"chaton":"chatoff"}>
          <Chat user={userProfile} scroll={scroll}  />
          </div> 

          </div>

          {/* user-profile follower and following section starts here */}

          <div className={on} >
         <UserprofileFollower  userProfile={userProfile}    />
          </div>

         <div className={followingOn}  >
          <UserprofileFollowing userProfile={userProfile}    />
       </div>
       </>
   )
}


export default Profile