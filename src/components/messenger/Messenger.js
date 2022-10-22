import React, { useContext, useState, useEffect, useRef } from 'react'
import "./messenger.css";
import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import { UserContext } from '../../App'







function Messenger() {
  const [load,setLoad] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")


  const { state, dispatch } = useContext(UserContext);

  const scrollRef = useRef();

  console.log(currentChat);
  console.log(state);




  useEffect(() => {

    const friendId = currentChat?.members.find((m) => m !== state._id);

    const getUser = () => {
      try {
        fetch(process.env.REACT_APP_BASE_URL+'/user/' + friendId, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        }).then(res => res.json())
          .then(result => {
            setUser(result)
            console.log(result)

          })

      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat]);






  useEffect(() => {



    const getConversations = async() => {
      try {
        fetch(process.env.REACT_APP_BASE_URL+"/conversations/" + state?._id, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        }).then(res => res.json())
          .then(result => {
            setConversations(result)
            setLoad(true);

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
        fetch(process.env.REACT_APP_BASE_URL+'/message/' + currentChat?._id, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        }).then(res => res.json())
          .then(result => {

            setMessages(result);

          })

      } catch (err) {
        console.log(err);
      }
    };

    getMessages();

  }, [currentChat]);


  useEffect(() => {
    if (url) {

        handleSubmit()

    }
}, [url])




  const uploadPic = () => {
       
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "feed-img")
    //    data.append("neel1304")
    fetch(`https://api.cloudinary.com/v1_1/neel1304/image/upload`, {
        method: "post",
        body: data
    })
        .then(res => res.json())
        .then(data => {
            //    console.log(data)
            setUrl(data.url)
        })
        .catch(err => {
            console.log(err)
        })


}




  const handleSubmit = (e) => {
    // e.preventDefault();
    const message = {
      sender: state?._id,
      text: newMessage,
      media:url,
      conversationId: currentChat._id,
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

          setMessages([...messages, data]);
          setNewMessage("");
        }).catch(err => {
          console.log(err)
        })


    } catch (err) {
      console.log(err);
    }
  };



   const submitChat = () =>{

    if(image){
      uploadPic()
  }else{
      handleSubmit()
  }

   }





  useEffect(() => {
    return scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleBack = () => {
    setCurrentChat(null);
  }



  return (
    <>

      <div className="messenger">
        <div className={currentChat ? "chatMenuoff" : "chatMenu"}>
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {load ?
              <div>
                {
                  conversations.map((c) => {

                    return (
                      <div key={c._id} >
                        <div onClick={() => setCurrentChat(c)}>
                          <Conversation conversation={c} currentUser={state} />
                        </div>
                      </div>
                    )
                  })

                } </div> : <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
            }

          </div>
        </div>
        <div className={!currentChat ? "chatBoxoff" : "chatBox"}>
          <div className="chatheader">
            
            <svg style={{marginLeft:"15px"}} onClick={toggleBack} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>




            <div className="userDetails">
              <div className="userPhoto">
                <img src={user.user?.pic} alt="" />
              </div>
              <div className="userName" style={{fontSize:"20px"}}>
                {user.user?.name}
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

              {messages ?
                <div>
                  {messages.map((m) => {

                    return (

                      <div key={m._id} ref={scrollRef} >
                        <Message message={m} own={m.sender === state._id} />
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


    <div class="file-field input-field">
      <div class="btn">
        <span>+ Media</span>
        <input onChange={(e) => setImage(e.target.files[0])} type="file"/>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text"/>
      </div>
    </div>
  

              <button className="chatSubmitButton" onClick={submitChat} >
                Send
              </button>
            </div>



          </div>
        </div>

      </div>



    </>
  )
}

export default Messenger
