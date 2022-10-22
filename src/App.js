import React,{useEffect,createContext,useReducer,useContext,Suspense,lazy} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory,HashRouter} from 'react-router-dom'
// import Home from './components/screens/Home'
import Loading from './components/screens/Loading';
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import Footer from './components/Footer';
import Messenger from './components/messenger/Messenger';
import Story from './components/screens/Story';
import StoryContainer from './components/screens/StoryContainer';
import CreatStory from './components/screens/CreatStory';
import PostSetting from './components/screens/settings/PostSetting';
import UserProfileSetting from './components/screens/settings/UserProfileSetting';
import ProfileSetting from './components/screens/settings/ProfileSetting';
import Post from './components/screens/Post';
import SocialShare from './components/screens/settings/SocialShare';
import Community from './components/screens/Community';
import PersonalCommunity from './components/screens/PersonalCommunity';
import SinglePersonalCommunity from './components/screens/SinglePersonalCommunity';
import Recording from './components/screens/settings/Recording';
import HIconWriting from './components/screens/settings/HIconWriting';
import HIconPosting from './components/screens/settings/HIconPosting';
import EditProfile from './components/screens/settings/profilesettingMenu/EditProfile';
import Otp from './components/screens/Otp';

import StoreList from './components/screens/Business/StoreList';
import Cropping from './components/screens/ImageFilter/ImageCropping/Cropping';
import ProfileImage from './components/screens/settings/profilesettingMenu/ProfileImage';
import Notifications from './components/screens/Notifications';
import ProfileFollower from './components/screens/ProfileFollower';
import ProfileFollowing from './components/screens/ProfileFollowing';
import SkeletonLoader from './components/screens/SkeletonLoader';
import LocationAutocomplete from './components/screens/LocationAutocomplete';
import CommentSetting from './components/screens/settings/CommentSetting';
import Comments from './components/screens/Comments';
import AccountSetting from './components/screens/settings/profilesettingMenu/AccountSetting';
import MobileOtp from './components/screens/settings/profilesettingMenu/MobileOtp';
import StorySetting from './components/screens/settings/StorySetting';
import StoryView from './components/screens/settings/StroyView';
import SingleStory from './components/screens/SingleStory';
import StoryShare from './components/screens/settings/StoryShare';
import Registration from './components/screens/Business/Registration';
import SingleBusiness from './components/screens/Business/SingleBusiness';
import AddProducts from './components/screens/settings/AddProducts';



export const UserContext = createContext();

const Home = lazy(()=>import('./components/screens/Home'))

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return(
    <Switch>
      
      <Route exact path="/" >
        <Suspense fallback={<Loading/>}>
      <Home />
      </Suspense>
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route exact path="/profilefollower">
       <ProfileFollower/>
      </Route>

      <Route exact path="/profilefollowing">
       <ProfileFollowing />
      </Route>

      <Route exact path="/editprofile">
        <EditProfile/>
      </Route>

      <Route exact path="/post/:postid">
       <Post/>
      </Route>

      <Route path="/messenger">
        <Messenger/>
      </Route>

      <Route path="/skeloader">
       <SkeletonLoader/>
      </Route>

      <Route path="/locationauto">
      <LocationAutocomplete/>
      </Route>

      <Route exact path="/story">
        <StoryContainer/>
      </Route>

      <Route exact path="/story/:storyid">
       <SingleStory />
      </Route>

      <Route path="/notifications">
        <Notifications/>
      </Route>

      <Route path="/creatstory">
        <CreatStory/>
      </Route>

     
      <Route path="/comments/:postid">
        <Comments/>
      </Route>

             

      <Route exact path="/personalcommunity">
      <PersonalCommunity/>
      </Route>

     
      <Route exact path="/singlepersonalcommunity">
      <SinglePersonalCommunity/>
      </Route>


      <Route exact path="/storelist">
      <StoreList/>
      </Route>


          
      <Route exact path="/accountsetting">
      <AccountSetting />
      </Route>

      <Route exact path="/verifymobileotp">
      <MobileOtp />
      </Route>

      <Route exact path="/imagefilter">
      <Cropping/>
      </Route>
      
      <Route exact path="/businesscircleregistration">
      <Registration />
      </Route>

      <Route exact path="/business/:businessid">
      <SingleBusiness />
      </Route>

      <Route path="/create">
        <CreatePost/>
      </Route>

      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>

      <Route exact path="/subotp">
       <Otp/>
      </Route>

      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <HashRouter>
      <NavBar />
      <Routing />
      <Footer/>
      
      <PostSetting/>

       <ProfileSetting/>

      <UserProfileSetting/>

      <CommentSetting/>

      <StorySetting />

      <AddProducts />

      <SocialShare/>

      <StoryShare />

      <StoryView />

      <HIconWriting/>

      <HIconPosting/>

      <ProfileImage/>

    </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
