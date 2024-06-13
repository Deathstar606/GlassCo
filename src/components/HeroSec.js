import React from "react";
import { Row, Col, CardImg, Button } from 'reactstrap';
import { motion } from "framer-motion";
import { SectionXPos } from "./Animations";
import { SectionYPos } from "./Animations";
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
        <div style={{overflow: "hidden"}}>
            <Row style={{height: "80vh"}}>
                <Col md={6} className="d-flex justify-content-center align-items-center">
                    <div>
                        <h1>Hello There</h1>
                        <div className="d-flex pt-3">
                            <Button outline className="mr-3">Shop Men</Button> 
                            <Button outline className="mr-3">Shop Women</Button>
                        </div>
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