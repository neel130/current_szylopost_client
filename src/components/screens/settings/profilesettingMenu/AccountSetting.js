import React,{useState,useEffect,useContext,useRef} from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../../../style/accountsetting.css"


function AccountSetting() {
  const [val,setVal]= useState("")
  const [mail,setMail]= useState("")
  const [phone,setPhone] = useState("")
  const history = useHistory();

    console.log(val)


   // logic for private mode activation starts here

  

    
   useEffect(()=>{

    if(val===true || val===false){
       fetch(process.env.REACT_APP_BASE_URL+'/privatemode', {
      method: "put",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
          privatemode:val
      })
  }).then(res => res.json())
      .then(data => {
          console.log(data.privatemode)
          localStorage.setItem("privatemode",data.privatemode)
         
      }).catch(err => {
          console.log(err)
      }) 
    }
  



   },[val])
     


   const privateStatus= localStorage.getItem('privatemode')

    





   // logic for private mode activation ends here






    // logic for new Mail id update starts here

    useEffect(()=>{
    const data =  localStorage.getItem('newMail')
    const a= JSON.parse(data)
    console.log(a)
    })

const newMail = ()=>{
    let otpcode = Math.floor((Math.random()*10000)+1);
    const newMail={
        updatedmail:mail,
        otp:otpcode
    }
    localStorage.setItem("newMail", JSON.stringify(newMail));

    console.log(otpcode)
    fetch(process.env.REACT_APP_BASE_URL+"/updateemail", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            updatedmail:mail,
            phone ,
            otp:otpcode
        })
       
    }) .then(res => res.json())
        .then(data => {

          console.log(data)
          history.push('/verifymobileotp')

        }).catch(err => {
            console.log(err)
        })


}


  // logic for new Mail id update ends here




    
  return (
    <>
<div style={{padding:"53px 20px"}} className="card">


    <h4 className='headertext' >Account privacy</h4>
    <hr />
    <div className="accountprivacy">
      <p>Private account</p>
      <p>
      <label style={{marginLeft:"25px"}} >
        <input onChange={(e)=>{setVal(e.target.checked)}} defaultChecked={JSON.parse(privateStatus)} type="checkbox"  />
        <span></span>
      </label>
    </p>
    </div>




    <h4 className='headertext' >Personal information</h4>
      <hr />


<div className="inputBox">

    <label htmlFor="">Change mail address</label>
 <input
 style={{width:"90%"}}
  value={mail}
  placeholder="New mail id"
  onChange={(e) => setMail(e.target.value)}
  type="text" />

 
 <input
 style={{width:"90%"}}
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
 type="text" placeholder='Phone ' />
<label htmlFor="">Phone no for Otp varification</label>

</div>

 <div className="acsettingbtn"> <button onClick={newMail} >Send OTP</button> </div> 



 </div>

        
    </>
  )
}

export default AccountSetting