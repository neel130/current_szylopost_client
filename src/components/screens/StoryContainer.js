import React, { useContext,useEffect,useState } from 'react'
import Story from './Story';
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../../App'
import Stories from "react-insta-stories";
import Loading from './Loading';
import StorySetting from './settings/StorySetting';
import StoryView from './settings/StroyView';
import "../style/createstory.css"





function StoryContainer() {

    const { state, dispatch } = useContext(UserContext);
    const [storyId,setStroyId]= useState([]);
    const [currentStory,setCurrentStory]= useState(null);
    const [chng, setChng] = useState(1)
    const [storydata,setStorydata] = useState(null)
    const [mentionprofile,setMentionprofile] = useState("displayoff")
    const [linkwebsite,setLinkwebsite] = useState("displayoff")



    console.log(currentStory);
    console.log(storydata)

    const userStory = storyId?.filter((m) => m.postedBy._id !== state?._id);
    const ownStory = storyId.find((m) => m.postedBy._id === state?._id);

    console.log(ownStory);
    console.log(state?._id);

   

  const ownstoryView = (e)=>{
    e.preventDefault();
    setCurrentStory(ownStory);
      
  }
 

   

  

    // useEffect(()=>{
    // if(currentStory){
    //  setTimeout(() => {
    //      setCurrentStory(null);
    //      console.warn("end")
    //  },22000);
    //     }
    //  },[currentStory])

 
    

   const ofStory = ()=>{
    setCurrentStory(null);
   }
    

    useEffect(()=>{
      fetch(process.env.REACT_APP_BASE_URL+'/allstory',{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result.stories);
          setStroyId(result.stories)
          
          
      })
   },[])





   //story like & unlike logic starts here 
   
   const likeStory = (id) => {
    fetch(process.env.REACT_APP_BASE_URL + '/likestory', {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            storyId: id
        })
    }).then(res => res.json())
        .then(result => {
              console.log(result)
              setChng(chng+1)
            // const newData = data.map(item => {
            //     if (item._id === result._id) {
            //         return result
            //     } else {
            //         return item
            //     }
            // })

            // setData(newData)
           
        }).catch(err => {
            console.log(err)
        })
}




const unlikeStory = (id) => {
  fetch(process.env.REACT_APP_BASE_URL + '/unlikestory', {
      method: "put",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
          storyId: id
      })
  }).then(res => res.json())
      .then(result => {
            console.log(result)
            setChng(chng-1)
          // const newData = data.map(item => {
          //     if (item._id === result._id) {
          //         return result
          //     } else {
          //         return item
          //     }
          // })
          // setData(newData)
        
      }).catch(err => {
          console.log(err)
      })
}


   //story like & unlike  logic ends here 





  // story view push logic starts here 
   
  useEffect(()=>{
  if(storydata){
const data = storydata?.views.includes(state._id) 
    console.log(data)
    if(data===false){
      console.log("addd")
   fetch(process.env.REACT_APP_BASE_URL + '/viewstory', {
      method: "put",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
          storyId: currentStory?._id
      })
    }).then(res => res.json())
      .then(result => {
            console.log(result)
            setChng(chng+1)
          // const newData = data.map(item => {
          //     if (item._id === result._id) {
          //         return result
          //     } else {
          //         return item
          //     }
          // })

          // setData(newData)
         
      }).catch(err => {
          console.log(err)
      })
    }else{
      console.log("dont addd")
    }

  }
    
  
  
  },[currentStory,storydata])

 

   // story view push logic ends here 



    



   // getting story likes and views amount logic starts here 
  useEffect(()=>{
    if(currentStory){

        fetch(process.env.REACT_APP_BASE_URL+'/storyclone/'+currentStory?._id, {
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
     }).then(res => res.json())
      .then(result => {
          console.log(result)
          setStorydata(result.results)
         
          
      })
    }
  
  },[currentStory,chng])

  // getting story likes and views amount logic ends here 



  // toggle mention profile show on / off starts here

 const togglementionProfile =() =>{
   if(mentionprofile==="displayoff"){
     setMentionprofile("mentioned-profileView")
   }else{
     setMentionprofile("displayoff")
   }

 }




  // toggle mention profile show on / off ends here



  // toggle link website show on / off starts here
  
  const toggleLinkwebsite =() =>{
    if(linkwebsite==="displayoff"){
      setLinkwebsite("link-website-view")
    }else{
      setLinkwebsite("displayoff")
    }
 
  }


   // toggle link website show on / off ends here


  return <>

{ userStory  ?

<>

  <div className={currentStory?"allStoryoff":"allStory"}>
      <div className="story-header">
<div className="myStory">
    <img src={state?.pic} alt="" />
    <h3 style={{fontSize:"20px"}} >My Stories <span  style={{border:"1px solid black"}} > <Link to="/creatstory">  +   </Link>  </span>  </h3>
</div>


  {ownStory? <button style={{borderRadius:"25px",border:"0",marginTop:"7px",backgroundColor:"#20f620",padding:"7px 6px",color:"white"}} onClick={ownstoryView} > view Story </button> : <></> }



<hr />
</div>






{
userStory.map((e)=>{
   return <div key={e._id} >
    
    <div className='storyclick' onClick={() => setCurrentStory(e)} >
    <Story user={e} />

</div>

</div>

})


}
 


     </div> 
    


<div className={currentStory?"storyimage":"storyimageoff"}>
{/* <i  class="small material-icons">close</i> */}

<svg 
data-target="modal28" style={{position:"absolute",top:"80px",right:"20px"}}
xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-three-dots-vertical modal-trigger" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>

<svg onClick={ofStory} style={{position:"absolute",top:"80px",left:"20px",color:"#fb0000"}}
 xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>



{storydata?.likes.includes(state._id)  
?
<svg onClick={() => { unlikeStory(currentStory._id) }}
style={{position:"absolute",bottom:"50px",right:"60px",color:"red"}}
xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
:
    
<svg  onClick={() => { likeStory(currentStory._id) }}
style={{position:"absolute",bottom:"50px",right:"60px"}}
xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg> 

}

<div style={{position:"absolute",bottom:"42px",right:"100px",fontSize:"17px"}} className="likeCount"> <p>{storydata?.likes.length>0?storydata?.likes.length:null}</p> </div>




<svg data-target="modal29"
 style={{position:"absolute",bottom:"50px",left:"80px"}}
xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-eye modal-trigger " viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>





  {/* Link website starts here */}


  <div  className={linkwebsite}>


  <div style={{color:"white"}} className="mention-profile">
  
     <span style={{fontSize:"12px",marginLeft:"5px"}} ><a className='link-website-font-color' href={`https://${currentStory?.linkwebsite}/`}>www.{currentStory?.linkwebsite}</a> </span> <span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg></span>
  </div>


</div>



  <div onClick={toggleLinkwebsite}  className="link-website">

  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
</svg>

<p style={{margin:"0"}} >{currentStory?.linkwebsite}</p>

</div>

  
  {/* Link website ends here */}





  {/* mention profile name starts here  */}

  <div  className={mentionprofile}>

<Link to={currentStory ? 
    state?._id===currentStory?.mention?._id ? '/profile'  :   '/profile/'+currentStory?.mention?._id  
          :
          state?._id===ownStory?.mention?._id ? '/profile'  :   '/profile/'+ownStory?.mention?._id  } >
  <div style={{color:"white"}} className="mention-profile">
  <div className="mention-profilePic"> <img src={currentStory ?currentStory?.mention?.pic :  ownStory?.mention?.pic} alt="" srcset="" />
     <span style={{fontSize:"12px",marginLeft:"5px"}} >{currentStory ?currentStory?.mention?.name :  ownStory?.mention?.name}</span> <span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg></span> </div>  
  </div>
</Link> 

</div>





<div onClick={togglementionProfile}  className="mention-nameShow">



{currentStory?.mention? 
<>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>

<p style={{margin:"0"}} > @ {currentStory ?currentStory?.mention?.name :  ownStory?.mention?.name}</p>
</>
 :null }

</div>

{/* mention profile name ends here  */}

 
   

<div style={{position:"absolute",bottom:"42px",left:"60px",fontSize:"17px"}} className="viewCount"> <p>{storydata?.views.length}</p> </div>


<div  className="line"></div>
   
<img  src={currentStory?.photo} alt="" />

</div>

<StorySetting photo={currentStory?.photo} currentStory={currentStory} />
 
 <StoryView storydata={storydata} />

</>

: <Loading/>


}
  </>












}

export default StoryContainer;
