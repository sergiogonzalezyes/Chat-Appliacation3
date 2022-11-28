import React from "react"

export const PageLayout2 = (props) => {
return (<div class="container_2">
  <section className="First_Section_1">
  <div>
      <img src={props.img} alt="" className="Layout_Image" />
    </div>
  <div className="Describe_Web_Site_2">
      <p className="Title_1">{props.title}</p>
      <p>{props.text}</p>
    </div>
  </section>

</div>)


};