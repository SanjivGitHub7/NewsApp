import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes  from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const  News =(props)=>{
    
    const [articles, setArticles]= useState([]);
    const [loading, setLoading]=useState(true);
    const [page, setPage] =useState(1);
    const [totalResults, setTotalResults]= useState(0);
    
    const capitalFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
   const updateNews= async ()=>{
        // console.log("cdm");
        props.setProgress(10);
       let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
       setLoading(true);
       let data=  await fetch(url);   //fetch url leti hai aur return karti hai promise. And await works only in async function
       props.setProgress(30);
       let parsedData= await data.json();
       props.setProgress(70);
       setArticles(parsedData.articles);
       setTotalResults(parsedData.totalResults);
    //    console.log(parsedData);
       setLoading(false);
    //  setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading: false,});
    props.setProgress(100);
    }
    useEffect(()=>{
          updateNews();
          //eslint-disable-next-line
 },[])
    
    const fetchMoreData = async ()=>{
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage( page + 1);
        let data=await fetch(url);                     //await can use only inside the async function
        let parsedData= await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
};
   
  //we write JSX inside the render() method in class based component to render the DOM
        return(
            <>
   <h1 className="text-center" style={{margin:"35px 0px"}}>NewsTalks - Top {capitalFirstLetter(props.category)}
          <span></span> News</h1>
       {loading && <Spinner /> } 
       <InfiniteScroll 
         dataLength={articles.length}
         next={fetchMoreData}
         hasMore={articles.length !== totalResults}
         loader={<Spinner/>}
        >
            <div className="container">
        <div className="row">       {/*title, description, imageUrl are the props and imported from NewsItem.js file*/}
        {articles.map((element)=>{
          return  <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title ? element.title.slice(0, 45):"No title"}
           description={element.description ? element.description.slice(0,80):"No description"} imageUrl={element.urlToImage? element.urlToImage:"https://i.pinimg.com/originals/bd/2f/29/bd2f290176e4e50540600ce92a847a3b.jpg"} 
           newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/></div> 
           //title,description,urlToImage,url are taken from the articles(keyword) of NewsAPI 
           //and storing it into the props like title,description,imageUrl,newsUrl respectively
    })}
       </div></div></InfiniteScroll>
        </>
        )}
     News.defaultPropTypes={
        country:'in',
        pageSize: 6,
        category: 'general',                 //this category will show as default at every time when the page is loaded
    }
    News.propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
export default News