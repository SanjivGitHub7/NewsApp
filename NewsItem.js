
import React from "react";

const NewsItem =(props)=>{ //constr. runs when a object is created
    
   let {title, description, imageUrl, newsUrl, source, author, date} =props;      //destructuring the props
        return(
            <div className="my-3">
            <div className="card" >
           <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}}>
                <span className="badge rounded-pill bg-danger">{source}</span></div>
  <img style={{width:'355px', height:'300px'}} src={!imageUrl?"https://www.google.com/search?q=dhoni&sxsrf=AJOqlzV6ySfa76O519Z5xYK8bGzOd8K-6Q:1676354770637&source=lnms&tbm=isch&sa=X&ved=2ahUKEwic3PuUrJT9AhXxcGwGHUleB1gQ_AUoAnoECAEQBA&biw=1366&bih=657&dpr=1#imgrc=4p08OGntp18RFM":imageUrl} className="card-img-top" alt="..."/> {/*imaegUrl keyword should matches with the props passed in <NewsItem/> in News.js */}
  <div className="card-body">
    <h5 className="card-title"> {title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
  <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
</div>
        ) } 
export default NewsItem