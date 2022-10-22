import React, { useState, useEffect, useContext, useRef } from 'react'
import homeicon from './../images/homeicon.jpeg'
import gaming from './../images/gaming.jpeg'
import homerecording from './../images/homerecording.jpeg'
import addphoto from './../images/addphoto.jpeg'
import writing from './../images/writing.jpeg'
import M from 'materialize-css'
import "./../style/homeicon.css"

function Homeicon() {
    const settingMenu = useRef(null);

    useEffect(() => {
        M.Modal.init(settingMenu.current)
    }, [])




    return (



        <>

            <div className="homeBotton">
                <img data-target="modal6" className='modal-trigger' src={homeicon} alt="" srcset="" />
            </div>


            <div className="homeBottonMenu">


                <div id="modal6" ref={settingMenu} class="modal homeiconModal modal-close waves-effect ">
                  

            
                        <ul>


                            <li>
                                <div className="gaming">
               <img src={gaming} alt="" srcset="" />
                                </div>


                            </li>



                            <li>

                                <div data-target="modal11" className="homeRecording modal-trigger "  >

                                    <img src={homerecording} alt="" srcset="" />

                                </div>


                            </li>




                            <li>
                                <div data-target="modal11" className="photoUploading modal-trigger ">

                                    <img src={addphoto} alt="" srcset="" />

                                </div>


                            </li>



                            <li>


                                <div data-target="modal10" className="tweetWriting modal-trigger">

                                    <img src={writing} alt="" srcset="" />

                                </div>

                            </li>


                        </ul>





                    </div>
                    {/* <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    </div> */}
                </div>



            




        </>











    )
}

export default Homeicon