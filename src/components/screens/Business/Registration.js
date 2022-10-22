import React,{useState,useEffect,useContext} from 'react'
import LocationAutocomplete from '../LocationAutocomplete';
import "./exploreSection/exploreCard/exploreCard.css";
import { useHistory } from 'react-router-dom'

const Registration = () => {
   const history = useHistory();
   const [name,setName]= useState("")
   const [website,setWebsite]= useState("")
   const [opening,setOpening] = useState("")
   const [phone,setPhone] = useState("")
   const [location,setLocation] = useState("")
   const [image, setImage] = useState("")
   const [url, setUrl] = useState("")
   const [catagory,setCatagory] = useState("");
   const [delivery,setDelivery] = useState("")
   const [desc,setDesc] = useState("")
   const [load, setLoad] = useState(false)




   const uploadPic = () => {
       setLoad(true)
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
console.log(url)

console.log(image)




useEffect(()=>{
  if(url){
   fetch(process.env.REACT_APP_BASE_URL+"/createbusinesscircle", {
    method: "post",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body: JSON.stringify({
        name,
        website,
        opening,
        phone,
        location,
        description:desc,
         pic: url,
         delivery,
          catagory,
       
    })
}).then(res => res.json())
    .then(data => {

       console.log(data)
       history.push('/storelist')
    }).catch(err => {
        console.log(err)
    })  
  }
            },[url])








  const LocationData =(data)=>{
    console.log(data?.label);
    setLocation(data?.label)
   
}

console.log(delivery)
console.log(catagory)

  return (
    <div>
       
       <div class="containerBusiness">
    <div class="title">Registration</div>
    <div className="subTitle">Business Circle</div>
    <div class="content">

      <form >
        <div class="user-details">
          <div class="input-box">
            
            <span class="details">Circle Name</span>
            <input
             value={name}
                    onChange={(e) => setName(e.target.value)}
            type="text" placeholder="Enter name" required/>
          </div>
          <div class="input-box">
            <span class="details">Website/Online store</span>
            <input
             value={website}
                    onChange={(e) => setWebsite(e.target.value)}
            type="text" placeholder="Enter Website/online store" required/>
          </div>
          <div class="input-box">
            <span class="details">Opening Hour</span>
            <input
             value={opening}
                    onChange={(e) => setOpening(e.target.value)}
            type="text" placeholder="24 Hours" required/>
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input
             value={phone}
                    onChange={(e) => setPhone(e.target.value)}
            type="text" placeholder="Enter your number" required/>
          </div>
          <div class="input-box">
            <span class="details">Location</span>
            <LocationAutocomplete LocationData={LocationData} />
          </div>
          <div class="input-box">
            <span class="details">Circle description</span>
            <textarea
             value={desc}
                    onChange={(e) => setDesc(e.target.value)}
            style={{height:"6rem"}} placeholder="Enter Circel description" required name="" id="" cols="80" rows="70"></textarea>
            {/* <input type="text" /> */}
          </div>
          <div class="input-box">
            <span class="details">Cover Photo</span>
            <input type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required/>
          </div>
        </div>
  


        <div style={{display:"flex"}} className="bottomBox">

        <div class="gender-details">
          <input onChange={(e)=>setDelivery("Physical Visiting")} type="radio" name="gender" id="dot-1"/>
          <input onChange={(e)=>setDelivery("Online Delivery")} type="radio" name="gender" id="dot-2"/>
          <input onChange={(e)=>setDelivery("Physical Visiting & Online Delivery")} type="radio" name="gender" id="dot-3"/>
          <span class="gender-title">Business</span>
          <div class="category">
            <label for="dot-1">
            <span class="dot one"></span>
            <span class="gender">Physical Visiting</span>
          </label>
          <label for="dot-2">
            <span class="dot two"></span>
            <span class="gender">Online Delivery</span>
          </label>
          <label for="dot-3">
            <span class="dot three"></span>
            <span class="gender">Both</span>
          </label>
          </div>
           </div>

          <div style={{margin:"0"}} class="input-field col s12 ">

         <select onChange={(e)=>setCatagory(e.target.value)} className='browser-default select2' >
          <option value="" >Choose Category</option>
         <option value="Pharmacy">Pharmacy</option>
         <option value="Super Mart">Super Mart</option>
         <option value="Stationery">Stationery</option>
         <option value="Fruits and vegitables">Fruits and vegitables</option>
         <option value="General Store">General Store</option>
         <option value="Meat Shop">Meat Shop</option>
         <option value="Salon & Spa">Salon & Spa</option>
         <option value="Hardware Store">Hardware Store</option>
         <option value="Food & Beverages">Food & Beverages</option>
         <option value="Mechanic Repair">Mechanic Repair</option>
         <option value="Electric Store">Electric Store</option>
         <option value="Electronic Store">Electronic Store</option>
         <option value="Grocery Store">Grocery Store</option>
        </select>
         
         
         </div>
             </div>

    {load ? <div class="text-center">
     <div class="spinner-border text-primary" role="status">
         <span class="sr-only"></span>
     </div>
 </div> : null}
       
       
        <div onClick={uploadPic} class="button">
          <input  type="submit" value="Register"/>
        </div>
      
        
      </form>

    
  </div>
     
  </div>

    </div>
     
  )
}

export default Registration