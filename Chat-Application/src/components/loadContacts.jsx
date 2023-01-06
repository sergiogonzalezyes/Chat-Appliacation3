import React from "react"
import axios from 'axios';


export const LoadContacts = (props) => {

  
  axios.get('http://localhost:5000/loadContacts')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

return (<div>
        <ul>
          <li>miguel</li>
          <li>serg</li>
          <li>miguel</li>
        </ul>
      </div>)
};