/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import Background from "../../assets/library.jpg"


function About() {

    const top = () => {
        window.scrollTo(0,0);
      };

  return (
    <div className="text-white">
        <h1 className='text-warning'>Reads for Your every adventure</h1> 
        <Link to="#" className='text-white'><FaTwitter /> <FaFacebookF /> <LuInstagram /> <MdOutlineMailOutline /> </Link><br /><br />
        <img className='container' style={{height:"400px", width:"600px"}} src={Background}  />
       <div className='container abt'>
       <p className='d-text  '><span className='warning'>Welcome to <b>Bookyy</b> website!.</span>
         This platform allows you to easily manage your personal library.
          You can add, edit, and delete books in just a few clicks, ensuring that your collection stays organized.</p><br />
         
          <p className='text-warning'> Whether you're an avid reader or just starting to build your collection, this site is designed to 
            make managing your books simple and enjoyable. We hope this tool helps you track and curate your
             favorite reads effortlessly. </p><br />
             <p>It's is an user-friendly platform designed to help you organize and manage your book collection.
               Whether you’re a casual reader or a dedicated book collector. 
                Our goal is to make managing your book collection a hassle-free task. 
                We hope you find the platform helpful in tracking your reading journey. <b>Happy Reading!!!</b></p>
        </div> 
        <h3 className='h3'>Choose your journey and let your reading adventure begin.<br />
                            Here are the books !!!</h3>
        <ul className='b-links' style={{listStyle:"none"}}>
            <li ><Link to={`/books/harry-potter`} className='text-warning' >Harry Potter</Link></li>
            <li><Link to={`/books/the-power-of-your-subconscious-mind`} className='text-warning'>The Power of Your Subconscious Mind</Link></li>
            <li><Link to={`/books/it-ends-with-us`} className='text-warning'>It Ends With Us</Link></li>
            <li><Link to={`/books/you-belong-with-me`} className='text-warning'>You Belongs With Me</Link></li>
            <li><Link to={`/books`} className='text-warning'>Show All</Link></li>
        </ul>
        <br />
        <button onClick={top} className='b-t-top' style={{marginRight:"850px"}}>Back to Top</button>
       
    </div>
  )
}

export default About