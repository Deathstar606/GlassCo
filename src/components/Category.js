import React from "react";
import { Container, Row, Col, CardImg, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./card.css"
import demo from "../images/14.jpg"
import men from "../images/category/man-with-sunglasses-wearing-white-t-shirt-posing.jpg"
import women from "../images/category/cute-pretty-beautiful-woman-wears-loose-sweater-black-trousers-holds-her-hands-pocket.jpg"
 
function Category () {
    return (
        <Container className="lg-container pb-5 pt-5 mt-5">
            <Row className="mt-5">
                <Col md={6} className="py-2">
                    <div className="catcard">
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to= "/mens">
                            <div>
                                <CardImg className="catimg" src={men}/>
                                <div className="cat-body">
                                    <h4 className="text-white" style={{borderBottom: "1px solid #ccc", paddingBottom: "5px", display: "inline-block"}}>Men's</h4>
                                    <p className="text-white">Some Demo Text</p>
                                    <Button outline className="mb-4 pl-4 pr-4">Demo</Button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col md={6} className="py-2">
                    <div className="catcard">
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to= "/mens">
                            <div>
                                <CardImg className="catimg" src={women}/>
                                <div className="cat-body">
                                    <h4 className="text-white" style={{borderBottom: "1px solid #ccc", paddingBottom: "5px", display: "inline-block"}}>Women's</h4>
                                    <p className="text-white">Some Demo Text</p>
                                    <Button outline className="mb-4 pl-4 pr-4">Demo</Button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col md={12} className="py-2">
                    <div className="catcard">
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to= "/mens">
                            <div style={{maxHeight: "80vh", overflow: "hidden"}}>
                                <CardImg className="catimg" src={demo}/>
                                <div className="cat-body">
                                    <h4 className="text-white" style={{borderBottom: "1px solid #ccc", paddingBottom: "5px", display: "inline-block"}}>Women's</h4>
                                    <p className="text-white">Some Demo Text</p>
                                    <Button outline className="mb-4 pl-4 pr-4">Demo</Button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>         
            </Row>
        </Container>
    )
}

export default Category;