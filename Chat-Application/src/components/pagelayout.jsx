import React from "react"
import World from "../images/Saly-1.png";




export const PageLayout = (props) => {
return (<div class="container_1">
  <section className="First_Section_1">
  <div className="Describe_Web_Site_1">
      <p className="Title_1">Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit.</p>
      <p>Nunc sed velit dignissim sodales ut eu sem. Ornare massa eget egestas purus viverra accumsan. Erat nam at lectus urna duis.</p>
    </div>
    <div>
      <img src={World} alt="" className="Layout_Image" />
    </div>
  </section>

</div>)


};