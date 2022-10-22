import React,{useState,useEffect,useContext,useRef} from 'react'
import Product from './Products/Product'
import { UserContext } from '../../../App'
import {useParams,useHistory,Link} from 'react-router-dom'
import AddProducts from '../settings/AddProducts'





const SingleBusiness = () => {
  const {state,dispatch}= useContext(UserContext);
  const {businessid} = useParams();
  const [bcircle,setBcircle] = useState("")


  useEffect(()=>{
    fetch(process.env.REACT_APP_BASE_URL+`/business/${businessid}`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
       console.log(result)
       setBcircle(result)
       
    })
   },[businessid])

  console.log(businessid)


  return (
    <>
    <div style={{margin:"60px 4px 15px ",padding:"20px 0px 0 15px",border:"1px solid #8080805e",borderRadius:"3px",boxShadow:"0px 0px 9px 3px #8080804a"}} className='headBox' >

      <div style={{float:"right",marginRight:"15px",marginTop:"10px"}} className="head-image businessCircle">
         <img src={bcircle.pic} alt="Loading" srcset="" />
     </div>  
      <div className="head-title">
          <p style={{fontSize:"24px",fontWeight:"600",marginBottom:"0"}} >{bcircle.name}</p>
      </div>
     

      <div style={{display:"inline"}} className="head-catagory">
          <h4 style={{fontSize:"17px",fontWeight:"",display:"inline",padding:"0 0px 0 3px",color:"grey"}} >{bcircle.catagory}</h4>
      </div>
      <div className="head-location">
          <p style={{padding:"0 0px 0 3px",fontSize:"12px",color:"blueviolet"}}  >{bcircle.location}</p>
      </div>
      <div style={{display:"flex"}} className="head-rating">
     
      <svg style={{color:"orange"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg> <span><p style={{marginLeft:"5px"}} >4.0</p></span> 
      </div>
   <div className="head-delivery">
       <p style={{margin:"0 30px 5px",backgroundColor:"GrayText",display:"inline",borderRadius:"10px",color:"white",padding:"2px 12px"}} >{bcircle.delivery}<span style={{marginLeft:"6px",backgroundColor:"transparent"}} > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bicycle" viewBox="0 0 16 16">
  <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5zm1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139L5.5 6.943zM8 9.057 9.598 6.5H6.402L8 9.057zM4.937 9.5a1.997 1.997 0 0 0-.487-.877l-.548.877h1.035zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765l1.027-1.643zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53L11.55 8.623z"/>
</svg> </span> </p>
   </div>



   { state?._id===bcircle.createdBy 
      ?
 <div data-target="modal31" style={{float:"right",margin:"0 29px 0px 14px",position:"relative",bottom:"-11px"}} className="head-addItems modal-trigger">
      <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" class="bi bi-folder-plus" viewBox="0 0 16 16">
  <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
  <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
</svg>
<p style={{fontSize:"10px"}} >add items</p>
      </div>
      :
      null

   }


     


   <div className="head-openinghour">
       <p style={{marginTop:"14px",marginBottom:"3px"}} > <span style={{color:"grey"}} > Opening Hours : </span>{bcircle.opening}</p>
   </div>

   <div className="head-website">
        <p style={{margin:"17px 80px 10px ",fontWeight:"500",color:"rgb(151 142 130)",fontSize:"12px"}} > <span><svg style={{color:"black",marginRight:"6px"}} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-broadcast" viewBox="0 0 16 16">
  <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
</svg></span>{bcircle.website}</p>
   </div>
 
  <hr />

   <div style={{display:"flex",justifyContent:"space-around",color:"#870ae5"}} className="sub-header">

       <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="call">
       <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
     <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
      </svg>
      <p style={{fontSize:"12px",marginTop:"5px",color:"grey"}} >call</p>
       </div>

       <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="chat">
       <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
     <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
      </svg>
     <p style={{fontSize:"12px",marginTop:"5px",color:"grey"}} >chat</p>

       </div>


       { state?._id===bcircle.createdBy 
                 ? 
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="setting">
                 <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
             <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
             <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
             </svg>
             <p style={{fontSize:"12px",marginTop:"5px",color:"grey"}} >setting</p>
                 </div> 
                  :

                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="setting">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
           <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
              <p style={{fontSize:"12px",marginTop:"5px",color:"grey"}} >cart</p>
                  </div> 

       }





       


   </div>

        </div>

     <hr />
      <div className="product-box" style={{margin:"0 0 90px"}} >
        {
          bcircle.products?.map((elem)=>{
             return (
               <div key={elem._id} >
                  <Product elem={elem} />
               </div>
             )
          })
        }
           
      </div>



   <AddProducts   businessid={businessid}  />
      </>
  )
}

export default SingleBusiness