import React from "react"

export const PageLayout2 = (props) => {
return (<div class="container_1">
  <section className="First_Section_1">
  <div className="Describe_Web_Site_1">
      <img src={props.img} alt="" className="Layout_Image" />
    </div>
  <div className="Home_Image">
      <p className="Title_1">{props.title}</p>
      <p className="Text_Prop">{props.text}</p>
    </div>
  </section>
</div>)


};