import React, { useContext } from 'react'
import { useRef, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import profilepic from './images/defaultprofile.png'



function Footer() {
    const { state, dispatch } = useContext(UserContext)
    const searchModal = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserDetails] = useState([])
  const history = useHistory()

console.log(userDetails);


useEffect(() => {
  M.Modal.init(searchModal.current)
}, [])

    const Footervis = () => {

        if (state) {
            return [
                <>
                    <div className='footerin'>
                        <li key="1">  <Link to={state ? "/" : "/signin"} ><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                        </svg></Link></li>
                        
                        <li className='inshead' key="2"><i data-target="modal1" className="small material-icons modal-trigger" style={{ color: "black",height:"26px",width:"26px" }}>search</i></li>

                        <li key="3"><Link to="/create"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg></Link></li>

                        {/* <li key="3"><Link to="/myfollowingpost">followings</Link></li> */}
                        <li key="4"> <Link to="/notifications"> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                        </svg>  </Link></li>
                     <li className='profilepic' key="5"><Link to="/profile"><span  > <img src={state.pic ? state.pic : profilepic} alt="" /> </span></Link></li>

                    </div>
                </>
            ]
        }
        else {
            return (
                <div>

                </div>
            )
        }

    }

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


    return (
        <>
            <div>
                <ul key="1">

                    <Footervis />
                </ul>

                <div id="modal1" className="modal" ref={searchModal} style={{ color: "black", borderRadius:"15px" }}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map(item => {
              return <Link to={item._id !== state._id ? "/profile/" + item._id : '/profile'} onClick={() => {
                M.Modal.getInstance(searchModal.current).close()
                setSearch('')
              }}><li className="collection-item"><span className='profilepic2' ><img src={item.pic} alt="" /> </span> {item.name}</li></Link>
            })}

          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>close</button>
        </div>
      </div>


            </div>

        </>

    )
}

export default Footer;
