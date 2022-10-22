import React, { useState, useEffect,useContext,useRef } from 'react'
import M from 'materialize-css'
import '../style/createstory.css'
import { UserContext } from '../../App';
import {Link,useHistory} from 'react-router-dom'



function CreatStory() {
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("");
    const [story,setStory] = useState("");
    const [storyvl,setStoryvl] = useState(null)
    const [filterListBox,setFilterListBox] = useState("displayoff")
    const searchModal = useRef(null)
   const [search, setSearch] = useState('')
   const [userDetails, setUserDetails] = useState([])
   const [mention,setMention] = useState({})
   const [linkWebisite,setLinkWebsite] = useState("")
    const history = useHistory();


    console.log(linkWebisite);
   

     console.log(mention)
    useEffect(() => {
        M.Modal.init(searchModal.current)
      }, [])


       const fetchUsers = (query) => {
        setSearch(query)
        fetch(process.env.REACT_APP_BASE_URL+'/search-users', {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query
          })
        }).then(res => res.json())
          .then(results => {
            setUserDetails(results.user)
            console.log(results);
          })
      }


    console.log(state)
    useEffect(()=>{
        if(state){
              fetch(process.env.REACT_APP_BASE_URL+`/story/${state?._id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
             setStory(result.stories)
            console.log(result.stories.length)
            
        })
        }
      
     },[state])



console.log(storyvl)



     useEffect(()=>{


        if(storyvl){
              fetch(process.env.REACT_APP_BASE_URL+"/storyclone", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                storyId: storyvl
            })
        }).then(res => res.json())
            .then(data => {
             
             console.log(data)
            


            }).catch(err => {
                console.log(err)
            })  
        }
    
     },[storyvl])







    useEffect(()=>{
     if(url){
    const uploadFields = () => {

        fetch(process.env.REACT_APP_BASE_URL+"/createstory", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                pic: url,
                mention,
               linkwebsite:linkWebisite
            })
        }).then(res => res.json())
            .then(data => {
        
                setStoryvl(data.post._id)
             console.log(data)
             history.push('/story')

            }).catch(err => {
                console.log(err)
            })

    }

    uploadFields();



}



    },[url])

    const uploadPic = () => {
       if(story.length==1){
           alert("You have already added One story : please try after 8 hours")
       }
       else{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "story-post")
        //    data.append("neel1304")
        fetch("https://api.cloudinary.com/v1_1/neel1304/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                   console.log(data)

                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
        }


    }



    const ToggleFilterBox = ()=>{
        if(filterListBox==="displayoff"){
            setFilterListBox("filterList-box")
        }else{
            setFilterListBox("displayoff")
        }

    }




  return <>
  <div className="creatStorymain">
      <div className="creatStory">
  <label class="btn btn-primary storybtn">
   + Upload File <input type="file" hidden  onChange={(e) => setImage(e.target.files[0])} />
</label>



  {/* add filter button show /hide section starts here  */}

  {  image  ?


 <div className="filter-btn">      <button onClick={ToggleFilterBox} >  
      
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
   class="bi bi-filter-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1
     .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
   </svg>
      
        <span style={{marginLeft:"9px"}} >filters </span> </button>   </div> 

   :

   null


  }

 {/* add filter button show /hide section ends here  */}




 {/* filter lists box starts here  */}

    <div className={filterListBox}>

    <div data-target="modal40" style={{margin:"25px 0"}} className="mention-Name f-center modal-trigger">
     <h5 style={{margin:"0"}}  >@</h5> <p className='filterIcon-text'>mention-name</p>
    </div>



    <div data-target="modal41" style={{margin:"25px 0"}} className="Link-website f-center modal-trigger">

      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
     class="bi bi-link-45deg" viewBox="0 0 16 16">
    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 
    6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018
     4.018 0 0 1-.128-1.287z"/>
    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83
     2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
        </svg>
        <p className='filterIcon-text' >link-website</p>
    </div>
 

   <div style={{margin:"25px 0"}} className="add-music f-center">
   <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
    class="bi bi-music-note-beamed" viewBox="0 0 16 16">
  <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 
  1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
  <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
  <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
</svg>
    <p className='filterIcon-text'>add-music</p>
   </div>


   <div style={{margin:"25px 0"}} className="add-Location f-center">
   <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
    class="bi bi-geo-alt" viewBox="0 0 16 16">
   <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8
    14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 
    3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
   <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
     </svg>
    <p className='filterIcon-text'>add-location</p>
   </div>

   <div style={{margin:"25px 0"}} className="add-emoji f-center">
   <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
    class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0
  0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124
   1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756
    4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952
     3.434-3.067-3.554.19-4.858.952-3.434z"/>
     </svg>
     <p className='filterIcon-text'>add-emoji</p>
   </div>

    </div>

 {/* filter lists box ends here  */}




   {/* mention name code starts here  */}

   <div id="modal40" className="modal" ref={searchModal} style={{ color: "black", borderRadius:"15px" }}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="@ mention"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map(item => {
              return <div onClick={() => {
                M.Modal.getInstance(searchModal.current).close()
                setSearch('')
              }}><li onClick={()=>{ return setMention(item),setFilterListBox("displayoff")}} className="collection-item"><span className='profilepic2' ><img src={item.pic} alt="" /> </span> {item.name}</li></div>
            })}

          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>close</button>
        </div>
      </div>








 {/* mention name code ends here  */}
 




{/* Link website code starts here  */}

<div id="modal41" className="modal" ref={searchModal} style={{ color: "black", borderRadius:"15px",height:"190px" }}>
        <div className="modal-content">
          <input
            value={linkWebisite}
           onChange={(e)=>setLinkWebsite(e.target.value)}
            type="text"
            placeholder="Ex - abc.com"
           
          />


          <div className='story-link-website-btn modal-close waves-effect'>
          <button>submit</button>
        </div>
         
        </div>


        
       
      </div>








 {/* Link website code ends here  */}









<div className="storyBtnSubmit">
<button onClick={uploadPic} class="btn waves-effect waves-light" type="submit" name="action">Submit
    <i class="material-icons right">send</i>
  </button>
</div>

</div>
  </div>
  
  </>;
}

export default CreatStory;
