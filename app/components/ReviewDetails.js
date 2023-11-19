//React component that renders the details of a movie review.
//The component recieves a single prop called props, which is an 
//object containing another object called review. Review contains details 
//of the movie review such as 'headline', 'summary_short', 'by_line'
//and 'link'. These details will be returned  

import React from "react";

function ReviewDetails(props){
    return(
    <div style={{ height: "auto", overflow: "hidden" }}>
      <h4>{props.review.headline}</h4>
      <p>{props.review.summary_short}</p>
      <p>By: {props.review.byline}</p>
      <a  href={props.review.link.url} target="_blank"rel="noopener noreferrer" ><b>Read full review</b></a>
    </div> 
    )
}
export default ReviewDetails