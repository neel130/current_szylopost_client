import React,{useState,useEffect,useContext,useRef} from "react";
import "./exploreCard.css";
import apple from '../../../../images/icons/apple.png'
import pharmacy from '../../../../images/icons/medicines.png'
import mall from '../../../../images/icons/mall.png'
import hardware from '../../../../images/icons/tools.png'
import meat from '../../../../images/icons/meat.png'
import salon from '../../../../images/icons/makeover.png'
import electric from '../../../../images/icons/electrical-energy.png'
import food from '../../../../images/icons/hamburger.png'
import grocery from '../../../../images/icons/grocery-cart.png'
import mechanic from '../../../../images/icons/engine.png'
import stationery from '../../../../images/icons/stationery.png'
import electronic from '../../../../images/icons/responsive.png'
import { Link } from "react-router-dom";



const ExploreCard = ({ restaurant, i }) => {
  const [data,setData] = useState([])
  const [category,setCategory] = useState("")
  const [filterContainer,setFilterContainer] = useState([])

  useEffect(() => {

    fetch(process.env.REACT_APP_BASE_URL + '/allbusiness', {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(res => res.json())
        .then(result => {
            console.log(result.posts)
            setData(result.posts)
            setFilterContainer(result.posts)
          
        })



}, [])


       useEffect(()=>{
         
        const filterData = filterContainer.filter((e)=>e.catagory===category)
        setData(filterData)
        console.log(filterData)
       
       },[category])
  
    

  

  return (
    <div style={{marginBottom:"70px"}}>

      

    {  data.map((element)=>{
  //  console.log(element)
      return(
    
   <Link to={'/business/'+element._id} >  <div div key={element._id} >
    <div className="card" style={{borderRadius:"10px"}}>
    <div className="explore-card cur-po">
      <div className="explore-card-cover">
        <img
          src={element.pic}
          className="explore-card-image"
          alt=''
        />
        <div className="delivery-time">{element.opening}</div>
       {/* <div className="pro-off">Pro extra 20% OFF</div> */}
        {/* {goldOff && <div className="gold-off absolute-center">{goldOff}</div>} */}
         <div className="discount absolute-center"> Upto 30% OFF</div>
      </div>
      <div className="res-row">
        <div className="res-name">{element.name}</div>
  
        <div className="res-rating absolute-center">
            3.4 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
          </div>


      </div>
      <div className="res-row">
      
          <div className="res-cuisine">
           
                {element.catagory}
              
            
          
          </div>
     
         <div className="res-price">{element.website}</div>
      </div>
      
        <div>
          <div className="card-separator"></div>
          <div className="explore-bottom">
            <img
              src=''
              alt=""
              style={{ height: "18px" }}
            />
            <div className="res-bottom-text">
            {element.description}</div>
          </div>
        </div>
      
    </div>
    </div>
    </div> 

</Link> 

      )

    })  

     
    }


<div className="card-catagory">
  <div className="catagory-title">
    <h6>Popular Categories</h6>
  </div>

    <div    style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}} className="businessCatagory">

    <div onClick={()=>setCategory("Fruits and vegitables")} className="cataBox" style={{width:"25%"}} >
       <img src={apple} alt="" srcset="" />
     <p>fruits & vegitables</p>
    </div>
    
    <div  onClick={()=>setCategory("Pharmacy")} className="cataBox" style={{width:"25%"}} >
    <img src={pharmacy} alt="" srcset="" />  
    <p>pharmacy</p>
    </div>
     
     <div  onClick={()=>setCategory("Super Mart")} className="cataBox" style={{width:"25%"}} >
       <img src={mall} alt="" srcset="" />
       <p>super mart</p>
     </div>
     
     <div  onClick={()=>setCategory("Hardware Store")} className="cataBox" style={{width:"25%"}} >
       <img src={hardware} alt="" srcset="" />
       <p>hardware store</p>
     </div>

     <div  onClick={()=>setCategory("Meat Shop")} className="cataBox" style={{width:"25%"}} >
       <img src={meat} alt="" srcset="" />
       <p>meat store</p>
     </div>

     <div onClick={()=>setCategory("Salon & Spa")} className="cataBox" style={{width:"25%"}} >
       <img src={salon} alt="" srcset="" />
       <p>salon & spa</p>
     </div>

     <div onClick={()=>setCategory("Electric Store")} className="cataBox" style={{width:"25%"}} >
       <img src={electric} alt="" srcset="" />
       <p>electric store</p>
     </div>

     <div onClick={()=>setCategory("Food & Beverages")} className="cataBox" style={{width:"25%"}} >
       <img src={food} alt="" srcset="" />
       <p>food & beverages</p>
     </div>

     <div  onClick={()=>setCategory("Grocery Store")} className="cataBox" style={{width:"25%"}} >
       <img src={grocery} alt="" srcset="" />
       <p>grocery store</p>
     </div>

     <div  onClick={()=>setCategory("Mechanic Repair")} className="cataBox" style={{width:"25%"}} >
       <img src={mechanic} alt="" srcset="" />
       <p>mechanic repair</p>
     </div>

     <div  onClick={()=>setCategory("Stationery")} className="cataBox" style={{width:"25%"}} >
       <img src={stationery} alt="" srcset="" />
       <p>stationery</p>
     </div>

     <div  onClick={()=>setCategory("Electronic Store")} className="cataBox" style={{width:"25%"}} >
       <img src={electronic} alt="" srcset="" />
       <p>electronic store</p>
     </div>
      
    </div>



   </div>


</div>
  
  );
};

export default ExploreCard;
