/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import Background from '../../assets/student-reading-program.jpg';
import Bookgreen from '../../assets/book-green2.jpg';
import { Link } from 'react-router-dom';



function Home() {
  const top = () => {
    window.scrollTo(0,0);
  };
  
  return (
    <div className='container text-center bg-warning'>
      <div className="row align-items-start">
      <div className="col image">
      <img className="rounded float-start" style={{height:"350px", marginLeft:"70px"}} src= {Background}/>
      </div>
      <div className="col text text-white">
      <h1 className='text-white'>Books That Defined <br/> <span className='text-dark' style={{float:"right", marginRight:"80px", fontWeight:"bold"}}> MY JOURNEY</span> </h1>
      <br /><br/><br/>
      <button className='btn bg-dark text-white' style={{float:"right",marginRight:"70px", padding:"10px" }}>See More</button>
      </div>
      <div className='container text-white' style={{marginTop:"30px"}}>
       <div className='row'>
        <div className='col'>
        <h1 className='text-dark bookyy'><b style={{fontSize:"70px"}}> For</b>  Your Every Adventure</h1>
      </div>
    <div className='col txt'>
    <p className='text-secondary'> <b style={{fontSize:"30px"}}>Bookyy</b>, a themed space dedicated to the stories we've journeyed through.This website serves as a virtual shelf and
            allows you to catalog your reading journey, showcasing the books that have made an impact on your life. 
           Each entry not only marks a title but also encapsulates the emotions and insights gained along the way. 
           Whether it's a beloved classic or a recent discovery, this space invites you to reflect on your literary adventures. 
           Engage with fellow readers through reviews, recommendations, and shared experiences, as we build a vibrant community celebrating the written word.
            Join us in preserving the pages that have enriched our lives.</p>
 
         </div>
    </div>
         <Link to={"/about"}>See the Books... </Link>
         </div>
        <br />
        <button onClick={top} className='b-t-top' >Back to Top</button>
    </div>
    </div>
   
  )
}

export default Home