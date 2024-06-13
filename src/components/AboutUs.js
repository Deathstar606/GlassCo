import React, { useEffect, useState } from 'react';
import { CardImg, Col, Container, Row } from 'react-bootstrap';
import demo from "../images/14.jpg"
import { SectionXNeg } from './Animations';
import about from "../images/About.png";
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutUs = () => {

  return (
    <div style={{ backgroundImage: `url(${demo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', padding: "50px 0px 50px 0px", marginTop: "70px", backgroundAttachment: "fixed", height: "70vh" }}>
      <Container id="aboutus" className='about-container'>
        <Row>
          <Col md={6}>
            <h4 className='text-white'>Some writings</h4>
          </Col>
          <Col md={6} className='border-left'> 
            <h4 className='text-white'>Some writings</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;