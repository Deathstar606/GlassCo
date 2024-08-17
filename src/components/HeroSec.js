import React from "react";
import { Row, Col, CardImg, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MediaQuery from "react-responsive";
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
        <div style={{overflow: "hidden", background: "linear-gradient(to bottom, #EDEADF, white)"}}>
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