import React, { useRef, useState } from 'react';
import { Container, Row, Col, CardImg, Breadcrumb, BreadcrumbItem, Form } from "react-bootstrap";
import { Product } from './NewArrival';
import men1 from "../images/mens/FALL-WINTER-TRENDS.jpg"
import men2 from "../images/mens/casual-dressing-tips1.jpg"
import men3 from "../images/mens/casual-men-dress-code-style-luxe-digital.jpg"
import men4 from "../images/mens/casual-dressing-tips1 phn.jpg"
import men5 from "../images/mens/FALL-WINTER-TRENDS phn.jpg"
import men6 from "../images/mens/casual-men-dress-code-style-luxe-digital phn.jpg"
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import required modules
import { EffectFade, Autoplay } from 'swiper/modules';
import "./card.css"
import MediaQuery from 'react-responsive';
import { motion } from 'framer-motion';

const Mens = (props) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    console.log(selectedCategories)

    const handleCategoryChange = (event) => {
      const { value, checked } = event.target;
      setSelectedCategories((prevCategories) => {
        if (checked) {
          return [...prevCategories, value];
        } else {
          return prevCategories.filter((category) => category !== value);
        }
      });
    };
  
    const filteredClothes = selectedCategories.length === 0
    ? props.clothes.clothes
    : props.clothes.clothes.filter((cloth) => 
        selectedCategories.every(category => cloth.category.includes(category))
      );

    if (props.clothes.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    
    else if (props.clothes.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.feats.errMess}</h4>
                </div>
            </div>
        )
    }

    else if (props.clothes.clothes) {

        const catdes = filteredClothes.map((cloth) => {
            return (
                <Col md={4} className='mb-5'>
                    <Product child={cloth} />
                </Col>
            );
          });

        return (
            <motion.div
            transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
            initial = {{x: 1000, opacity: 0}}
            animate= {{x: 0, opacity: 1}}
            exit= {{x: -1000, opacity: 0}}>
                <div style={{backgroundColor: "#EDEADF"}}>
                    <Container style={{maxWidth: "95%"}}>

                        <Row>
                        <Breadcrumb className="pl-3 pt-3">
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Men's</BreadcrumbItem>
                        </Breadcrumb>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <div className="side-panel">
                                    <h5>Categories</h5>
                                    <Form>
                                        <Form.Check 
                                        type="checkbox" 
                                        label="Fashion" 
                                        value="fashion" 
                                        onChange={handleCategoryChange} 
                                        />
                                        <Form.Check 
                                        type="checkbox" 
                                        label="Prescription" 
                                        value="prescription" 
                                        onChange={handleCategoryChange} 
                                        />
                                    </Form>
                                </div>
                            </Col>
                            <Col md={10}>
                                <Row>
                                    {catdes}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </motion.div>
        )
    }
}

export default Mens;