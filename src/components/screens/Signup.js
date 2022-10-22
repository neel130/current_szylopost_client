import React,{useState,useEffect,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const SignIn  = ()=>{
   
    const history = useHistory()
    const [name,setName] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    const [cuser,setCuser] = useState("")
    const [cname,setCname] = useState("displayoff")
    const [cemail,setCemail] = useState("displayoff")
    const [cpassword,setCpassword] = useState("displayoff")
    const [signup,setSignup] = useState("displayoff")
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","neel1304")
        fetch("https://api.cloudinary.com/v1_1/neel1304/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch(process.env.REACT_APP_BASE_URL+"/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
          
           
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/subotp')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

 const userdata = ()=>{
  setCuser("displayoff");
  setCname("");
  setCemail("displayoff")
  setCpassword("displayoff")
  setSignup("displayoff")

 }

 const namedata = ()=>{
    setCuser("displayoff");
    setCname("displayoff");
    setCemail("")
    setCpassword("displayoff")
    setSignup("displayoff")
 }

 const emaildata = ()=>{
    setCuser("displayoff");
    setCname("displayoff");
    setCemail("displayoff")
    setCpassword("")
    setSignup("displayoff")
}

const passworddata = ()=>{
    setCuser("displayoff");
    setCname("displayoff");
    setCemail("displayoff")
    setCpassword("displayoff")
    setSignup("")
}


   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Szylopost</h2>

           <div className={cuser}> 
           <input 
            type="text"
            placeholder="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <button onClick={userdata} className='btn btn-primary' >Next</button>
            </div>

            <div className={cname}>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <button onClick={namedata} className='btn btn-primary' >Next</button>
            </div>

            <div className={cemail}>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button onClick={emaildata} className='btn btn-primary' >Next</button>
            </div>
 
           <div className={cpassword}>
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button onClick={passworddata} className='btn btn-primary' >Next</button>
            </div>


         <div className={signup}>
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button style={{width:"100%"}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={PostData}
            >
                SignUP
            </button>
             </div>



            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>
             
               
         
            
    
        </div>
      </div>
   )
}


export default SignIn