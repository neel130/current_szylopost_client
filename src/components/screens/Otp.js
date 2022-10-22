import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

function Otp() {
  const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [otp,setOtp] = useState("")
    const PostData = ()=>{
        fetch(process.env.REACT_APP_BASE_URL+'/verifyotp',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                otp
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
             console.log(data.error)
           }
           else{
              console.log(data);
              localStorage.setItem("jwt",data.token)
              localStorage.setItem("user",JSON.stringify(data.user))
              dispatch({type:"USER",payload:data.user})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }


  return (
    <>
    
     <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Szylopost</h2>
            <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Submit
            </button>
            
    
        </div>
      </div>
    
    
    </>
  )
}

export default Otp