// import { PageLayout } from "../components/pagelayout";
import { PageLayout } from "../components/pagelayout";
import { PageLayout2 } from "../components/pagelayout2";
import computerGuy from "../images/section1.png";
import Travel from "../images/Saly-1.png";
import Girl from "../images/Saly-22.png";
import SpaceShip from "../images/Saly-43.png";
import { Fade } from "react-awesome-reveal"
import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";





export const Home = () => {
    const [createNewUser, setCreateNewUser] = useState(false);
    const [userLogin, setUserLogin] = useState(false);


    if (userLogin) {
        return <Navigate to="/Login" />;
    }

    if (createNewUser) {
        return <Navigate to="/createUser" />;
    }

    return (<div class="container">
        <section className="First_Section">
                <div className="Home_Page_Image">
                <img src={computerGuy} alt=""  className="computerGuy"/>
               </div>
               <div className="Describe_Web_Site">
                <p className="Title">Aliquet lectus proin nibh nisl condimentum id venenatis a</p>
                <p className="Title_Description">Morbi leo urna molestie at elementum eu facilisis. Lacus sed viverra tellus in hac. Velit dignissim sodales ut eu sem integer vitae justo eget.</p>
                <div className="Button_Container">
                <button className="Home_Buttons" onClick={setUserLogin}>Login</button>
                <button className="Home_Buttons_1" onClick={setCreateNewUser}>Create an Account</button>
                </div>
               </div>
        </section>
        <Fade cascade>
            <PageLayout img={Travel} title="Nunc sed augue lacus viverra." text="Nam aliquam sem et tortor consequat id. Molestie nunc non blandit massa enim nec. Nunc sed augue lacus viverra. Ultrices dui sapien eget mi."/>
            </Fade>
            <Fade cascade>
            <PageLayout2 img={SpaceShip} title="Donec et odio pellentesque diam." text="Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Sem et tortor consequat id porta nibh venenatis cras."/>  
            </Fade>
            <Fade cascade>
            <PageLayout img={Girl} title="Amet facilisis magna etiam tempor orci." text="Libero volutpat sed cras ornare. Sodales neque sodales ut etiam sit amet nisl purus in. Elementum eu facilisis sed odio morbi quis commodo odio aenean."/>
            </Fade>
        <section className="contact_us"> 
        
            </section>             
            </div>)
        
};
