import React,{useState,useEffect,useContext,useRef} from 'react'
import "../../style/socialshare.css"
import M from 'materialize-css'

import {UserContext} from '../../../App'
import { Link, useHistory } from 'react-router-dom'
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";


import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

function SocialShare({currentPost}) {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
   
    const settingMenu = useRef(null)


    useEffect(() => {
        M.Modal.init(settingMenu.current)
      }, [])


  return (
    <>
    
    
    <div id="modal5" ref={settingMenu} class="modal socialmodal">
<div class="modal-content">
  
  <p >Share   with the <span style={{color:"green"}} >World</span> </p>
  <div className="iconcontainer">


<div className="shareicon">
<FacebookShareButton url={`https://szylopost.in/#/post/${currentPost?._id}`}
                    quote='next gen socil media'
                    hashtag='#szylopost'
>
<FacebookIcon logoFillColor="white" round={true} ></FacebookIcon>
</FacebookShareButton  >
</div>


<div className="shareicon">
<WhatsappShareButton url={`https://szylopost.in/#/post/${currentPost?._id}`}
 title='Welcome to SzyloPost.....'
>
<WhatsappIcon logoFillColor="white" round={true}  ></WhatsappIcon>
</WhatsappShareButton>
</div>

<div className="shareicon">
<FacebookMessengerShareButton>
  <FacebookMessengerIcon  logoFillColor="white" round={true} ></FacebookMessengerIcon>
</FacebookMessengerShareButton>
</div>


<div className="shareicon">
<LinkedinShareButton>
<LinkedinIcon logoFillColor="white" round={true} ></LinkedinIcon>
</LinkedinShareButton>
</div>

<div className="shareicon">
<EmailShareButton>

<EmailIcon logoFillColor="white" round={true} ></EmailIcon>
</EmailShareButton>
</div>

<div className="shareicon">
<PinterestShareButton>
<PinterestIcon logoFillColor="white" round={true}></PinterestIcon>
</PinterestShareButton>
</div>

<div className="shareicon">
<TwitterShareButton >

 <TwitterIcon logoFillColor="white" round={true}  ></TwitterIcon> 
</TwitterShareButton>
</div>


<div className="shareicon">
<InstapaperShareButton>

<InstapaperIcon logoFillColor="white" round={true} ></InstapaperIcon>
</InstapaperShareButton>
</div>


<LineShareButton>
  <LineIcon logoFillColor="white" round={true} ></LineIcon>
</LineShareButton>


<div className="shareicon">
<ViberShareButton>
  <ViberIcon logoFillColor="white" round={true} ></ViberIcon>
</ViberShareButton>
</div>

<div className="shareicon">
<RedditShareButton>
  <RedditIcon logoFillColor="white" round={true} ></RedditIcon>
</RedditShareButton>
</div>

<div className="shareicon">
<TelegramShareButton>
  <TelegramIcon logoFillColor="white" round={true} ></TelegramIcon>
</TelegramShareButton>
</div>



  </div>
</div>

</div>
    
    
    
    </>
  )
}

export default SocialShare