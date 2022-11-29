import React from "react"

export const PageLayout2 = (props) => {
return (<div class="Home_Page_Container">
  <section className="Home_Section_Container_2">
  <div className="Image_Container">
      <img src={props.img} alt="" className="Layout_Image" />
    </div>
  <div className="Home_Section_Text">
      <p className="Title_1">{props.title}</p>
      <p className="Text_Prop">{props.text}</p>
    </div>
  </section>
</div>)


};