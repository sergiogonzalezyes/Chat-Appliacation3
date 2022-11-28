import React from "react"





export const PageLayout = (props) => {
return (<div class="container_1">
  <section className="First_Section_1">
  <div className="Describe_Web_Site_1">
      <p className="Title_1">{props.title}</p>
      <p>{props.text}</p>
    </div>
    <div>
      <img src={props.img} alt="" className="Layout_Image" />
    </div>
  </section>

</div>)


};