import React, { useState } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, CardImg, Button, ButtonGroup, Form, FormGroup, Input } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Product } from './NewArrival';
import MediaQuery from 'react-responsive';
import { Link } from "react-router-dom";
import ReactStars from 'react-stars';
import './details.css'

function RenderRev ({reviews}) {
    return (
        <ul className="list-unstyled">
            {reviews.map((rev) => {
                return (
                        <li>
                        <p>{rev.review}</p>
                        <p>{rev.rating} ⭐</p>
                        <p>-- {rev.author.firstname} {rev.author.lastname} </p>
                        </li>
                );
            })}
        </ul>
    )
}

const Deats = (props) => {

    const [mainImage, setMainImage] = useState(props.clothes ? props.clothes.images[0] : '');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = () => {
        props.postReview(props.clothes._id, rating, review);
    };

    const Similar = props.similar.clothes.map((element) => {
        if (element.shape == props.clothes.shape && element._id != props.clothes._id) {
            return (
                <Col md={3}>
                    <Product child={element} />
                </Col>
            )
        }
    })

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.clothes != null) {
        return (
            <Container style={{maxWidth: "95%"}}>
                <Row>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.clothes.name}</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                <Row>
                    <Col md={2} style={{scale: "0.7"}}>
                        <div className="image-previews">
                            {props.clothes.images.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img} 
                                    alt="Preview" 
                                    className="img-thumbnail mb-2"
                                    onClick={() => setMainImage(img)} 
                                />
                            ))}
                        </div>
                    </Col>
                    <Col md={7} className='mx-0'>
                        <CardImg src={mainImage}/>
                    </Col>
                    <Col md={3} className='d-flex align-items-center'>
                        <div className="w-100 ml-4">
                            <h4>{props.clothes.name}</h4>
                            <h5 className='text-muted'>price ${props.clothes.price}</h5>
                            <p>{props.clothes.desp}</p>
                            <div className="mt-3 w-100">
                                <Button color='dark'>Add to Cart</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                <Col>
                    <h5>Add a Review</h5>
                    <Row className='mt-4'>
                        <Col md={9}>
                        <ReactStars
                                className='mb-2'
                                count={5} // Number of stars
                                value={rating} // Current rating
                                onChange={handleRatingChange} // Handle rating change
                                size={24} // Size of the stars
                                activeColor="#ffd700" // Color of the active star
                            />
                            <Form>
                                <FormGroup>
                                    <Input
                                        type="textarea"
                                        placeholder="Write your review here"
                                        style={{
                                            borderColor: '#CDCDCD',
                                            borderRadius: '7px',
                                            padding: '10px',
                                            minHeight: '100px',
                                            overflow: 'hidden',
                                            resize: 'none'
                                        }}
                                        onChange={handleReviewChange}
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                        <MediaQuery minWidth={639}>
                            <Col md={2} className='mt-5'>
                                <Button color="dark" onClick={handleSubmit}>
                                    Submit Review
                                </Button>
                            </Col>
                        </MediaQuery>
                        <MediaQuery maxWidth={638}>
                            <Col md={3} className='mt-1 mb-4'>
                                <Button color="dark" onClick={handleSubmit}>
                                    Submit Review
                                </Button>
                            </Col>
                        </MediaQuery>
                    </Row>
                    <RenderRev reviews={props.reviews}/>
                </Col>
            </Row>
            <h2 className='mt-5'>You Might Also Like</h2>
            <Row className='mt-5 mb-5'>
                {Similar}
            </Row>
            </Container>
        );
    }
};

export default Deats;