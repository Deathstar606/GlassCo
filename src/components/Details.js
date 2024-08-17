import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, CardImg, Form, FormGroup, Input } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Product } from './NewArrival';
import { Breadcrumbs } from './ProductList';
import { baseUrl } from '../Redux/shared/baseurl';
import MediaQuery from 'react-responsive';
import { Link } from "react-router-dom";
import ReactStars from 'react-stars';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './details.css'
import "./deatsPanel.css"
import { AnimatePresence, motion } from 'framer-motion';

/* function RenderRev ({reviews}) {
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
} */

const Deats = (props) => {
    const [mainImage, setMainImage] = useState('');
    const [fullscreenImage, setFullscreenImage] = useState("");
    const [colors, setColor] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [currentPanel, setCurrentPanel] = useState(''); // 'material' or 'power'
    const [lensMat, setLensMat] = useState("");
    const [leftEye, setLeftEye] = useState("");
    const [rightEye, setRightEye] = useState("");

    const handleOpenFullscreen = (imageUrl) => {
        setFullscreenImage(imageUrl);
      };

    const handleCloseFullscreen = () => {
        setFullscreenImage(null);
      };

    useEffect(() => {
        if (props.deats) {
            if (colors === '' || !props.deats.color.includes(colors)) {
                setColor(props.deats.color[0]);  // Set colors to the first color in the new props.deats.color
            }

            if (props.deats.color.includes(colors)) {
                const imageUrl = props.deats.images[colors]?.[0];
                if (imageUrl) {
                    setMainImage(baseUrl + imageUrl);
                }
            }
        } else {
            setColor('');
        }
    }, [props.deats, colors]);

    const discountedPrice = props.deats?.discount
    ? Math.round(props.deats.price - (props.deats.price * (props.deats.discount / 100)))
    : null;

    const handleChange = (c) => {
        setColor(c)
    }

    const similar = props.similar
        .filter((element) => element.shape === props.deats.shape && element._id !== props.deats._id)
        .slice(0, 6) // Limit to 6 products
        .map((element) => (
            <Col md={3} key={element._id}>
                <Product child={element} />
            </Col>
        ));

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = () => {
        props.postReview(props.deats._id, rating, review);
    };

    const handleOpenPanel = (panelType) => {
        setCurrentPanel(panelType);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setCurrentPanel('');
    };

    const handleMaterialSelect = (material) => {
        setLensMat(material);
        handleOpenPanel('power');
    };

    const handleRightEye = (event) => {
        setRightEye(event.target.value);
    };

    const handleLeftEye = (event) => {
        setLeftEye(event.target.value);
    };

    const handleOrder = () => {
        props.addNewOrder(
            {
                _id: props.deats._id,
                name: props.deats.name,
                price: discountedPrice? discountedPrice : props.deats.price,
                color: colors,
                image: props.deats.images[colors][0],
                lensMat: lensMat,
                leftEye: leftEye,
                rightEye: rightEye
            }
        )
    };

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.deats?.color?.length > 0 && colors) {
        return (
            <Container style={{ maxWidth: "95%" }}>
                <Row>
                    <Breadcrumbs items={[
                        { link: '/home', active: false },
                        { name: props.deats.name, link: '', active: true }
                    ]} />
                </Row>
                <Row>
                    <MediaQuery minWidth={640}>
                        <Col md={2} style={{ scale: "0.7" }}>
                            <div className="image-previews">
                                {props.deats.images[colors]?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={baseUrl + img}
                                        alt="Preview"
                                        className="img-thumbnail mb-2"
                                        onClick={() => setMainImage(baseUrl + img)}
                                    />
                                ))}
                            </div>
                        </Col>
                        <Col md={7} className='mx-0' style={{height: "50vh"}}>
                            <img onClick={() => handleOpenFullscreen(mainImage)} src={mainImage} alt="Main" style={{ width: '100%', content: 'center' }} />
                        </Col>
                    </MediaQuery>
                    <MediaQuery maxWidth={639}>
                        <Swiper
                            className='mb-2'
                            effect={'coverflow'}
                            slidesPerView={'1'}
                            spaceBetween={15}
                            centeredSlides={true}
                            coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 50,
                            modifier: 1,
                            slideShadows: true,
                            }}
                            pagination={{
                            clickable: true,
                            }}
                            modules={[ Pagination, EffectCoverflow]}
                        >
                            {props.deats.images[colors]?.map((img, index) => (
                                <SwiperSlide>
                                    <div className='d-flex align-items-center' style={{height: "40vh"}}>
                                        <CardImg onClick={() => handleOpenFullscreen(baseUrl + img)} className="acrd" style={{position: "relative"}} src={baseUrl + img}/>
                                    </div>
                                </SwiperSlide>
                            ))}                            
                        </Swiper>
                    </MediaQuery>
                    <Col md={3} className='d-flex align-items-center'>
                        <div className="w-100">
                            <h4>{props.deats.name}</h4>
                            <div className='mb-2'>
                                {props.deats.discount && (
                                    <span className="badge bg-danger">{props.deats.discount}% OFF</span>
                                )}
                            </div>
                            <h5>
                                {discountedPrice ? (
                                    <>
                                        <span className='text-muted mr-2' style={{ textDecoration: 'line-through' }}>
                                            ${props.deats.price}
                                        </span>
                                        <span className="text-danger ms-2">
                                            ${discountedPrice}
                                        </span>
                                    </>
                                ) : (
                                    `$${props.deats.price}`
                                )}
                            </h5>
                            <div className="color-options d-flex pt-2 pb-2">
                                {props.deats.color.map((col, index) => (
                                    <div
                                        key={index}
                                        className="color-box"
                                        style={{ backgroundColor: col, width: '25px', height: '25px', marginRight: '10px', borderRadius: '50%' }}
                                        onClick={() => handleChange(col)} // Add logic for color selection if needed
                                    />
                                ))}
                            </div>
                            <div className="mt-3 w-100">
                                <button className='butt' onClick={() => handleOpenPanel('material')}>Choose Lens and Buy</button>
                            </div>
                        </div>
                    </Col>
                </Row>
                        {fullscreenImage && (
                            <motion.div
                                className="fullscreen-preview"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{duration: 0.25}}
                                layoutId="fullscreen-preview"
                            >
                                <div onClick={handleCloseFullscreen} style={{position: "absolute", top:10, right: 10}}>✖</div>
                                <CardImg src={fullscreenImage} alt="Full Screen Preview" />
                            </motion.div>
                        )}
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
                                    <button className='butt' onClick={handleSubmit}>
                                        Submit Review
                                    </button>
                                </Col>
                            </MediaQuery>
                            <MediaQuery maxWidth={638}>
                                <Col md={3} className='mt-1 mb-4'>
                                    <button className='butt' onClick={handleSubmit}>
                                        Submit Review
                                    </button>
                                </Col>
                            </MediaQuery>
                        </Row>
                        {/* <RenderRev reviews={props.reviews} /> */}
                    </Col>
                </Row>
                <h2 className='mt-5'>You Might Also Like</h2>
                <Row className='mt-5 mb-5'>
                    {similar}
                </Row> 
                {/* Side Panel */}
                {isPanelOpen && (
                    <AnimatePresence mode='wait'>
                        <motion.div
                            className='modal-back'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{zIndex: "10"}}
                        />
                        <motion.div 
                            className="side-panel"
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
                        >
                            <button className="close-btn" onClick={handleClosePanel}>×</button>
                            {currentPanel === 'material' && (
                                <div>
                                    <h3 className='pt-3 pb-3 text-center'>Select Lens Material</h3>
                                    <div className='d-flex justify-content-center'>
                                        <button className='mr-2 butt' onClick={() => handleMaterialSelect('cosmetic')}>Cosmetic</button>
                                        <button className='mr-2 butt' onClick={() => handleMaterialSelect('photosun')}>Photosun</button>
                                    </div>
                                </div>
                            )}
                            {currentPanel === 'power' && (
                                <div className="panel-content">
                                    <h3 className='text-center'>Select Power for Each Eye</h3>
                                    <div className='d-flex'>
                                        <Input
                                            style={{ margin: "5px", borderRadius: "10px" }}
                                            type="number"
                                            placeholder="Left Eye Power"
                                            value={leftEye}
                                            onChange={handleLeftEye}
                                        />
                                        <Input
                                            style={{ margin: "5px", borderRadius: "10px" }}
                                            type="number"
                                            placeholder="Right Eye Power"
                                            value={rightEye}
                                            onChange={handleRightEye}
                                        />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button className='butt' onClick={handleOrder}>Place Order</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </Container>
        );
    }
};

export default Deats;