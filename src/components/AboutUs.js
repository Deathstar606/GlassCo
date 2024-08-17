import React, { useEffect, useState } from 'react';
import { CardImg, Col, Container, Row } from 'react-bootstrap';
import about from "../images/about.jpg"
import { SectionXNeg } from './Animations';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutUs = () => {

  return (
    <div style={{
      position: "relative", 
      backgroundImage: `url(${about})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat', 
      padding: "50px 0px 50px 0px", 
      marginTop: "70px", 
      backgroundAttachment: "fixed", 
      height: "70vh",
    }}>
      <Container id="aboutus" className='about-container'>
        <Row>
          <Col md={6} className='mb-4'>
            <h4 className='text-dark'>Eyewear Collection</h4>
            <p className='text-dark'>Explore our curated selection of stylish and functional eyewear, designed to meet diverse tastes. From classic frames to modern designs, we offer glasses that blend fashion with comfort, ensuring the perfect fit for every face.</p>  
          </Col>
          <Col md={6} className='d-flex align-items-center' style={{borderLeft: "1px solid black"}}>
            <div>
              <h4 className='text-dark'>Vision & Innovation</h4>
              <p className='text-dark'>At the heart of our brand is a commitment to enhancing vision through innovation. We continuously invest in research and development to bring you the latest advancements in eyewear and lens technology.</p>  
            </div> 
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;