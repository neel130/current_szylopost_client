import React, { useContext,useState,useEffect,useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./chat.css";
import Conversation from "../../conversations/Conversation";
import Message from "../../message/Message";
import { UserContext } from '../../../App'







function Chat({user,scroll}) {
  const [conversations, setConversations] = useState([]);
  const [conversId,setConversId] = useState("")
  const [newconversations, setNewconversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

 
  
  const { state, dispatch } = useContext(UserContext);

const scrollRef = useRef();
















  useEffect(() => {
    
    const getConversations =  () => {
      try {
        fetch(process.env.REACT_APP_BASE_URL+"/conversations/"+state?._id,{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
       setConversations(result);
        
      })
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();

  
  }, [state?._id]);






  useEffect(() => {
    const getMessages = () => {
      try {
        fetch(process.env.REACT_APP_BASE_URL+'/message/'+conversId?._id,{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          
          setMessages(result);
          
      })
        
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
    
  }, [conversId]);





 


  useEffect(() => {
    
    const getConversations =  () => {
      try {
        fetch(process.env.REACT_APP_BASE_URL+`/conversations/${state?._id}/${user?.user._id}` ,{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
       console.log(result);
       setConversId(result);
        
      })
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();

  
  }, [newconversations,user]);








useEffect(()=>{
if(newconversations){

  const message = {
    sender: state?._id,
    text: newMessage,
    conversationId: newconversations._id,
  };


  try {

    fetch(process.env.REACT_APP_BASE_URL+"/message", {
      method: "post",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify(message)
  }).then(res => res.json())
      .then(data => {
     
       setMessages([...messages,data]);
    setNewMessage("");
      }).catch(err => {
          console.log(err)
      })

    
  } catch (err) {
    console.log(err);
  }

}

},[newconversations])







  console.log(conversId);
  console.log(newconversations);
  console.log("body rendering")





  const subChat =  (e) => {
        e.preventDefault();
    
     if(conversId){
        const message = {
          sender: state?._id,
          text: newMessage,
          conversationId: conversId._id,
        };
    
    
        try {
    
          fetch(process.env.REACT_APP_BASE_URL+"/message", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(message)
        }).then(res => res.json())
            .then(data => {
           
             setMessages([...messages,data]);
          setNewMessage("");
            }).catch(err => {
                console.log(err)
            })
    
          
        } catch (err) {
          console.log(err);
        }
    }
    
    
    
    else {
    
    
    
        const conversation = {
            senderId:state?._id,
            receiverId:user?.user._id,
        };
    
    
        try {
    
          fetch(process.env.REACT_APP_BASE_URL+"/conversations", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(conversation)
        }).then(res => res.json())
            .then(data => {
                setNewconversations(data);
          
            }).catch(err => {
                console.log(err)
            })
    
          
        } catch (err) {
          console.log(err);
        }
    
    
    
        
      };
    
      }
    
    





  
 
  









  useEffect(() => {
   return scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,scroll]);










  return (
    <>
      
      <div className="messenger">
        <div className="chatMenuoff">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations?
          <div>
            {
                conversations.map((c)=>{
                  
                 return ( 
                   <div key={c._id} >
                  <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={state} />
                  </div>
                    </div>
                    )
              })

            } </div>  : <div><h1>loading</h1></div>
              } 
             
          </div>
        </div>
        <div className="chatBox">


          <div className="chatheader">
            
          <Link to="/"> <svg style={{marginLeft:"15px"}}  xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg></Link> 




            <div className="userDetails">
              <div className="userPhoto">
                <img src={user?.user.pic} alt="" />
              </div>
              <div className="userName" style={{fontSize:"20px"}}>
                {user?.user.name}
              </div>

            </div>




            <div className="audiocall" style={{position:"absolute",right:"5px"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="green" class="bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>

            </div>



            <div className="videocall" style={{position:"absolute",right:"40px"}} >
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="green" class="bi bi-camera-video" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
              </svg>
            </div>







          </div>




          <div className="chatBoxWrapper">
            
            
                <div className="chatBoxTop">

              {  messages?  
              <div>
                {messages.map((m) => {

             return(

                    <div key={m._id} ref={scrollRef} >
                      <Message message={m} own={m.sender === state?._id} />
                    </div>
             )

               })}
                  </div>
                :
                <div><h1>loading</h1></div>
            
                }

                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}

                   
                  ></textarea>
                  <button className="chatSubmitButton"  onClick={subChat} >
                    Send
                  </button>
                </div>
              
            
          
          </div>
        </div>
        
      </div>



    </>
  )
}

export default Chat
