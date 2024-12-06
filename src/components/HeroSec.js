import React from "react";
import { Row, Col, CardImg, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MediaQuery from "react-responsive";
import heroImg from "../images/23002_speye15757vminnovatorportraitassets_image_hires_307830.jpg"
import glass from "../images/Hero/sunglass.png"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";

const headerImg = {
    hidden: { y: 0 },
    visible: {
      y: [15, -15, 15, -15, 15],
      transition: {
        duration: 10,
        ease: "easeInOut", // Can use other easing functions like "linear", "easeOut", etc.
        repeat: Infinity,
        repeatType: "loop",
        delay: 0
      }
    }
};

const HeroSec = () => {
    return (
        <div   
        style={{
            overflow: "hidden",
            background: `
              linear-gradient(
                to top, 
                white, 
                rgba(237, 234, 223, 0.2)
              ), 
              url(${heroImg})
            `,
            backgroundSize: "cover", // Ensures the image covers the entire container
            backgroundPosition: "center", // Centers the image
            height: "100vh", // Full height of the viewport
          }}>
            <Row style={{height: "80vh"}}>
                <Col md={6} className="d-flex justify-content-center align-items-center">
                    <div>
                        <MediaQuery maxWidth={639}>
                            <h3 className="text-center p-3">Discover Your Perfect Vision</h3>
                            <p className="text-center text-muted pb-2">Stylish, High-Quality Eyewear for Every Look</p>
                            <div className="d-flex justify-content-center pt-3">
                                <div>
                                    <Link to="/home/sunglass/men">
                                        <button
                                            className='butt'
                                            type="button"
                                        >
                                            Men
                                        </button>
                                    </Link>
                                    <Link to="/home/sunglass/women">
                                        <button
                                            className='butt'
                                            type="button"
                                        >
                                            Women
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </MediaQuery>
                        <MediaQuery minWidth={640}>
                            <h1>Discover Your Perfect Vision</h1>
                            <p className="text-muted">Stylish, High-Quality Eyewear for Every Look</p>
                            <div className="d-flex pt-3">
                                <div>
                                    <Link to="/home/sunglass/men">
                                        <button
                                            className='butt'
                                            type="button"
                                        >
                                            Men
                                        </button>
                                    </Link>
                                    <Link to="/home/sunglass/women">
                                        <button
                                            className='butt'
                                            type="button"
                                        >
                                            Women
                                        </button>
                                    </Link>
                                </div>
                            </div>                            
                        </MediaQuery>
                    </div>
                </Col>
                <Col md={6} className="d-flex justify-content-center align-items-center">
                    <motion.div 
                    variants={headerImg}
                    initial="hidden"
                    animate="visible"
                    >
                        <CardImg src={glass}/>
                    </motion.div>
                </Col>
            </Row>
        </div>
    );
};

export default HeroSec;