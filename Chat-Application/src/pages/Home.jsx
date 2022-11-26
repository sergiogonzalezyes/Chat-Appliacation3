import computerGuy from "../images/section1.png";
// import { PageLayout } from "../components/pagelayout";
import { PageLayout } from "../components/pagelayout";
import { PageLayout2 } from "../components/pagelayout2";





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
        <PageLayout/>
        <PageLayout2/>  
        <section className="contact_us">
            </section>             
            </div>)
        
   
};
