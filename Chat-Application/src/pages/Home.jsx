// import { PageLayout } from "../components/pagelayout";
import { PageLayout } from "../components/pagelayout";
import { PageLayout2 } from "../components/pagelayout2";
import computerGuy from "../images/section1.png";
import Travel from "../images/Saly-1.png";
import World from "../images/Saly-40.png";
import SpaceShip from "../images/Saly-43.png";
import { useNavigate } from "react-router-dom";






export const Home = () => {


    

    return (<div class="container">
        <section className="First_Section">
                <div>
                <img src={computerGuy} alt=""  className="computerGuy"/>
               </div>
               <div className="Describe_Web_Site">
                <p className="Title">Aliquet lectus proin nibh nisl condimentum id venenatis a</p>
                <p className="Bottom_title">Morbi leo urna molestie at elementum eu facilisis. Lacus sed viverra tellus in hac. Velit dignissim sodales ut eu sem integer vitae justo eget.</p>
                <button className="Home_Buttons">Login</button>
                <button className="Home_Buttons_1">Create Account</button>
               </div>
        </section>
            <PageLayout img={Travel} title="Nunc sed augue lacus viverra." text="Nam aliquam sem et tortor consequat id. Molestie nunc non blandit massa enim nec. Nunc sed augue lacus viverra. Ultrices dui sapien eget mi."/>
            <PageLayout2 img={SpaceShip} title="Donec et odio pellentesque diam." text="  Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Sem et tortor consequat id porta nibh venenatis cras."/>  
            <PageLayout img={World} title="Amet facilisis magna etiam tempor orci." text="Libero volutpat sed cras ornare. Sodales neque sodales ut etiam sit amet nisl purus in. Elementum eu facilisis sed odio morbi quis commodo odio aenean."/>
        <section className="contact_us">
            
            </section>             
            </div>)
        
   
};
