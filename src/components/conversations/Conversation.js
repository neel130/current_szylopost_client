import React,{useState,useEffect } from 'react'
import "./conversation.css";


function Conversation({conversation,currentUser}) {
  console.log(conversation);
  const [user, setUser] = useState(null);



  useEffect(() => {
    
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = () => {
      try {
        fetch(process.env.REACT_APP_BASE_URL+'/user/'+friendId,{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
        setUser(result)
          console.log(result)
        
      })
       
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);



    return (
        <>
            
            <div className="conversation">
      <img
        className="conversationImg"
        src={user?.user.pic}
        alt=""
      />
      <span className="conversationName">{user?.user.username} <br /> <p style={{color:"grey",fontSize:"14px",margin:"0px",fontWeight:"normal"}}> massages</p></span> 
       
  <div className="consetting" style={{width:"100%"}} >
  <svg style={{position:"absolute",right:"0",marginRight:"20px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="grey" class="bi bi-sliders" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
</svg>

  </div>

    </div>



        </>
    )
}

export default Conversation




