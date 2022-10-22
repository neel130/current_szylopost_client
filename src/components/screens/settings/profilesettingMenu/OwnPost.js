import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../../../App";
import M from "materialize-css";
import { Link } from "react-router-dom";
// import Loading from './Loading'
import PostSetting from "./../PostSetting";
// import Homeicon from './Homeicon'
import SocialShare from "../../settings/SocialShare";

function OwnPost() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [load, setLoad] = useState(null);
  const [comment, setComment] = useState("");
  const [currentPost, setCurrentPost] = useState(null);
  const [chng, setChng] = useState("");

  console.log(currentPost);
  console.log(state);

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/getownpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result.posts.length);
        setData(result.posts);
        setLoad(result);
      });
  }, [chng]);

  const childData = (el) => {
    setData(el);
  };

  const likePost = (id) => {
    fetch(process.env.REACT_APP_BASE_URL + "/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
        setChng("like");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch(process.env.REACT_APP_BASE_URL + "/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        setChng("unlike");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch(process.env.REACT_APP_BASE_URL + "/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
        setChng("comment");
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deletecomment = (postid)=>{
  //     fetch(`/deletecomment/${postid}`,{
  //         method:"delete",
  //         headers:{
  //             Authorization:"Bearer "+localStorage.getItem("jwt")
  //         }
  //     }).then(res=>res.json())
  //     .then(result=>{
  //         // console.log(result)
  //         const newData = data.filter(record=>{
  //             return record._id !== result._id
  //         })
  //         setData(newData)
  //     })
  // }

  const deleteComment = (postId, commentId) => {
    fetch(
      process.env.REACT_APP_BASE_URL + `/deletecomment/${postId}/${commentId}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            result.postedBy = item.postedBy;
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  return (
    <>
{load ?

<>
      <div className="home" style={{padding:"0"}} > 
        {data.map((item) => {
          console.log(item);
          return (
            <div className="card home-card" style={{marginTop:"0"}} key={item._id}>
              <h5 style={{ padding: "5px", fontSize: "19px" }}>
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {" "}
                  <span className="profilepic2">
                    {" "}
                    <img src={item.postedBy.pic} alt="" />{" "}
                  </span>{" "}
                  {item.postedBy.name}
                </Link>

                <svg
                  style={{
                    float: "right",
                    marginRight: "5px",
                  }}
                  data-target="modal2"
                  onClick={() => setCurrentPost(item)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-gear-wide-connected modal-trigger "
                  viewBox="0 0 16 16"
                >
                  <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
                </svg>
              </h5>

              {item.catagory === "audio" ? (
                <div
                  className="audiobox"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <audio
                    style={{
                      width: "80%",
                      marginTop: "50px",
                      marginBottom: "30px",
                    }}
                    controls
                  >
                    <source src={item.photo} type="audio/mp3" />
                  </audio>
                </div>
              ) : (
                <>
                  {!item.photo ? (
                    <div> </div>
                  ) : (
                    <div className="card-image">
                      {item.catagory === "video" ? (
                        <div className="videoplay">
                          <video width="100%" height="400" controls>
                            <source src={item.photo} type="video/mp4" />
                          </video>
                        </div>
                      ) : (
                        <Link to={"/post/" + item._id}>
                          {" "}
                          <img src={item.photo} />{" "}
                        </Link>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="card-content">
                {item.photo ? (
                  <div className="changelikeposition">
                    <i className="material-icons" style={{ color: "red" }}>
                      favorite
                    </i>
                    {item.likes.includes(state._id) ? (
                      <i
                        className="material-icons"
                        onClick={() => {
                          unlikePost(item._id);
                        }}
                      >
                        thumb_down
                      </i>
                    ) : (
                      <i
                        className="material-icons"
                        onClick={() => {
                          likePost(item._id);
                        }}
                      >
                        thumb_up
                      </i>
                    )}

                    <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    <div className="textScroller">
                      {item.comments.map((record) => {
                        console.log(record);
                        return (
                          <div key={record._id}>
                            <h6>
                              <span style={{ fontWeight: "500" }}>
                                {record.postedBy.name}
                              </span>{" "}
                              {record.text}{" "}
                              {record.postedBy._id === state._id && (
                                <svg
                                  style={{ float: "right" }}
                                  onClick={() =>
                                    deleteComment(item._id, record._id)
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-three-dots-vertical"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                              )}{" "}
                            </h6>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="changelikeposition2">
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>

                    <br />

                    <i className="material-icons" style={{ color: "red" }}>
                      favorite
                    </i>
                    {item.likes.includes(state._id) ? (
                      <i
                        className="material-icons"
                        onClick={() => {
                          unlikePost(item._id);
                        }}
                      >
                        thumb_down
                      </i>
                    ) : (
                      <i
                        className="material-icons"
                        onClick={() => {
                          likePost(item._id);
                        }}
                      >
                        thumb_up
                      </i>
                    )}

                    <h6>{item.likes.length} likes</h6>
                    <div className="textScroller">
                      {item.comments.map((record) => {
                        return (
                          <div key={record._id}>
                            <h6>
                              <span style={{ fontWeight: "500" }}>
                                {record.postedBy.name}
                              </span>{" "}
                              {record.text}{" "}
                              {record.postedBy._id === state._id && (
                                <svg
                                  style={{ float: "right" }}
                                  onClick={() =>
                                    deleteComment(item._id, record._id)
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-three-dots-vertical"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                              )}{" "}
                            </h6>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <input
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    type="text"
                    placeholder="add a comment"
                  />
                </form>
              </div>
            </div>
          );
        })}
      </div>


      <PostSetting allPost ={data} currentPost = {currentPost} parentData={childData} / >

    <SocialShare currentPost = {currentPost}/ >
        </>
  :  
  
  <div class="d-flex justify-content-center text-success">
  <div class="spinner-border" role="status">
    <span class="sr-only"></span>
  </div>
</div>
   
}  
    </>
  );
}

export default OwnPost;
