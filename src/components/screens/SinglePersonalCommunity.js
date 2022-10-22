import React from "react";
import "./../style/singlepersonalcommunity.css";

function SinglePersonalCommunity() {
  return (
    <>
      <div className="community-header">
        <img
          src="https://learn.g2.com/hubfs/What_is_Information_Technology.jpg"
          alt=""
          srcset=""
        />
      </div>

      <div className="community-body">
        <div className="community-title">
          <div className="community-name">
            <h4>szylopost tech</h4>
          </div>

          <div className="join-community">
            <h6> Join</h6>
          </div>
        </div>
        <hr />

        <div className="community-description">
          <h6>ABOUT</h6>

          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur id, nam, incidunt tenetur consequatur et architecto
            provident, odit harum repellat libero? Ea cupiditate fugit, placeat,
            distinctio odit fugiat 
            mollitia accusamus quos.{" "}
          </p>
        </div>

       <div className="community-post">
   
         
  <div class="row">


    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"/>
         
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <input type="text" /> <span> <span> <input type="file" name="" id="" /> </span> <button className="btn btn-primary" > Submit </button> </span>
        </div>
      </div>
    </div>
  </div>


  

  <div class="row">


<div class="col s12 m7">
  <div class="card">
    <div class="card-image">
      <img src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg"/>
     
    </div>
    <div class="card-content">
      <p>I am a very simple card. I am good at containing small bits of information.
      I am convenient because I require little markup to use effectively.</p>
    </div>
    <div class="card-action">
      <input type="text" /> <span> <span> <input type="file" name="" id="" /> </span> <button className="btn btn-primary" > Submit </button> </span>
    </div>
  </div>
</div>
</div>





       </div>



      </div>
    </>
  );
}

export default SinglePersonalCommunity;
