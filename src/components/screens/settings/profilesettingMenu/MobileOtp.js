import React,{useState,useEffect,useContext,useRef} from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../../../style/accountsetting.css"

function MobileOtp() {
const [otp,setOtp] = useState("")
const history = useHistory();

// const data =  localStorage.getItem('newMail')
// const updatOtpData = JSON.parse(data)
// console.log(updatOtpData.otp)
// console.log(parseInt(otp))

const verfiyOtp =()=>{
    const data =  localStorage.getItem('newMail')
    const updatOtpData = JSON.parse(data)
   if(updatOtpData.otp===parseInt(otp)){
        
    fetch(process.env.REACT_APP_BASE_URL+'/verifymobileotp', {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
           email:updatOtpData.updatedmail
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data)
      
            // dispatch({ type: "UPDATEPROFILE", payload: { name: data.name, username: data.username, pic: data.pic, bio: data.bio } });
            // localStorage.setItem("user", JSON.stringify({ ...state, name: data.name, username: data.username, bio: data.bio, pic: data.pic }));

            history.push('/profile')
       
        }).catch(err => {
            console.log(err)
        })


   }else{
       alert("wrong otp")
   }

}


  return (

    <>
   <div style={{padding:"32px",marginTop:"100px" }} className="card">

 <input
 placeholder='type your otp...'
  value={otp}
  onChange={(e) => setOtp(e.target.value)}
  type="text" />


 
 <div style={{margin:"auto",padding:"29px 10px"}} className="acsettingbtn"> <button onClick={verfiyOtp} >Submit Otp</button> </div>
</div>

    </>
  )
}

export default MobileOtp