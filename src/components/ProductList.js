import React, { useRef, useState } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input } from 'reactstrap';
import { Product } from './NewArrival';
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";
import { BsFilterSquare, BsX  } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa6";
import { CgUnavailable } from "react-icons/cg";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./Breadcrumb.css"
import "./filterPanel.css"
import MediaQuery from 'react-responsive';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Range } from 'react-range';

export const Breadcrumbs = ({ items }) => {
    return (
        <div className="custom-breadcrumb ml-1">
            {items.map((item, index) => (
                <div key={index} className="custom-breadcrumb-item">
                    {index === 0 ? (
                        <Link to={item.link}>
                            <span><FaAngleLeft color='rgb(0, 0, 0)'/></span>
                        </Link>
                    ) : item.active ? (
                        item.name
                    ) : (
                        <Link to={item.link}>{item.name}</Link>
                    )}
                </div>
            ))}
        </div>
    );
};

const activeButtonStyles = {
    padding: "5px",
    backgroundColor: 'black',
    border: "1px solid black",
    color: "rgb(255, 249, 225)",
  };
  
const inactiveButtonStyles = {
    padding: "5px",
    backgroundColor: 'transparent',
    border: "1px solid black",
    color: 'black',
    '&:hover': {
      backgroundColor: 'darkgray',
      cursor: 'pointer',
    },
};

const activeColor = {
    opacity: 0.5
  };

const Mens = (props) => {
    const [isMat, setIsMat] = useState(false);
    const [isShape, setIsShape] = useState(false);
    const [isColor, setIsColor] = useState(false);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    const ref = useRef(null)
    const isInview = useInView(ref)

    const toggleCol = () => {
        setIsColor(!isColor);
    };
  
    const toggleMat = () => {
        setIsMat(!isMat);
    };

    const toggleShape = () => {
        setIsShape(!isShape);
    };

    const [selectedCategories, setSelectedCategories] = useState({
        priceRange: [0, 100],  // Default range
        color: '',
        material: '',
        shape: ''
    });

    const handlePriceChange = (values) => {
        setSelectedCategories(prevState => ({
            ...prevState,
            priceRange: values
        }));
    };

    const handleMaterialChange = (material) => {
        setSelectedCategories(prevState => ({ ...prevState, material }));
    };

    const handleShapeChange = (shape) => {
        setSelectedCategories(prevState => ({ ...prevState, shape }));
    };

    const handleColorChange = (color) => {
        setSelectedCategories(prevState => ({ ...prevState, color }));
    };

    if (props.glasses.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.glasses.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.glasses.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.glasses) {
        
        const filteredGlasses = props.glasses.filter(cloth => {
            const withinPriceRange = cloth.price >= selectedCategories.priceRange[0] && cloth.price <= selectedCategories.priceRange[1];
            const matchesMaterial = selectedCategories.material ? cloth.material === selectedCategories.material : true;
            const matchesShape = selectedCategories.shape ? cloth.shape === selectedCategories.shape : true;
            const matchesColor = selectedCategories.color ? cloth.color.includes(selectedCategories.color) : true;
        
            return withinPriceRange && matchesMaterial && matchesShape && matchesColor;
        });

        const catdes = filteredGlasses.map((cloth) => (
            <Col md={4} className='mb-5' key={cloth._id}>
                <Product child={cloth} />
            </Col>
        ));

        return (
            <motion.div
                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1000, opacity: 0 }}>
                <Container style={{ maxWidth: "97%" }}>
                    <div className="row" ref={ref}>
                        <Breadcrumbs items={[
                            { link: '/home', active: false },
                            { name: "Home", link: '', active: true }
                        ]} />
                        <MediaQuery maxWidth={639}>
                            <motion.button
                                className='butt mt-1'
                                style={isInview ? 
                                    { marginBottom: "10px", right: 10, zIndex: 100, position: "absolute" } : 
                                    { position: "fixed", top: 10, right: 10, zIndex: 100, border: "1px solid black", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}
                                onClick={toggleFilter}
                            >
                                Filters
                            </motion.button>
                        </MediaQuery>
                    </div>
                    <Row>
                    <MediaQuery minWidth={639}>
                        <Col md={2} className="sidebar">
                            <div className="sidebar-content">
                                <h4>Filter</h4>
                                <Form>
                                    <FormGroup>
                                        <Label className='pb-2' for="priceRange">Price Range</Label>
                                        <div className="price-range pr-3">
                                            <Range
                                                values={selectedCategories.priceRange}
                                                step={1}
                                                min={0}
                                                max={100}
                                                onChange={handlePriceChange}
                                                renderTrack={({ props, children }) => (
                                                    <div
                                                        {...props}
                                                        className="track"
                                                    >
                                                        {children}
                                                    </div>
                                                )}
                                                renderThumb={({ props }) => (
                                                    <div
                                                        {...props}
                                                        className="thumb"
                                                    />
                                                )}
                                            />
                                            <div className="price-values">
                                                <span>Min: {selectedCategories.priceRange[0]}</span>
                                                <span>Max: {selectedCategories.priceRange[1]}</span>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <div className='text-center pt-3 pb-3' onClick={toggleMat} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                                        Material
                                    </div>
                                    <AnimatePresence>
                                        {isMat && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ paddingTop: "10px", display: 'flex', flexWrap: 'wrap', gap: '10px' }} // Added styles
                                            >
                                                <button
                                                onClick={() => handleMaterialChange("")}
                                                style={{ flex: '1 1 45%', ...(selectedCategories.material === "" ? activeButtonStyles : inactiveButtonStyles) }}
                                                >
                                                All
                                                </button>
                                                <button
                                                onClick={() => handleMaterialChange("Plastic")}
                                                style={{ flex: '1 1 45%', ...(selectedCategories.material === "Plastic" ? activeButtonStyles : inactiveButtonStyles) }}
                                                >
                                                Plastic
                                                </button>
                                                <button
                                                onClick={() => handleMaterialChange("Steel")}
                                                style={{ flex: '1 1 45%', ...(selectedCategories.material === "Steel" ? activeButtonStyles : inactiveButtonStyles) }}
                                                >
                                                Steel
                                                </button>
                                                <button
                                                onClick={() => handleMaterialChange("Mixed")}
                                                style={{ flex: '1 1 45%', ...(selectedCategories.material === "Mixed" ? activeButtonStyles : inactiveButtonStyles) }}
                                                >
                                                Mixed
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className='text-center pt-3 pb-3' onClick={toggleShape} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                                        Shape
                                    </div>
                                    <AnimatePresence>
                                        {isShape && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ paddingTop: "10px", display: 'flex', flexWrap: 'wrap', gap: '10px' }} // Added styles
                                            >
                                                <button
                                                onClick={() => handleShapeChange("")}
                                                style={{ flex: '1 1 45%', ...(selectedCategories.shape === "" ? activeButtonStyles : inactiveButtonStyles) }}
                                                >
                                                All
                                                </button>
                                                <button
                                                onClick={() => handleShapeChange("Rectangle")}
                                                style={{ flex: '1 1 45%', ...(selectedCategories.shape === "Rectangle" ? activeButtonStyles : inactiveButtonStyles) }}
                                                >
                                                Rectangle
                                                </button>
                                                <button
                                                onClick={() => handleShapeChange("Square")}
                                                style={{ flex: '1 1 45%', ...(selectedCategories.shape === "Square" ? activeButtonStyles : inactiveButtonStyles) }}
                                                >
                                                Square
                                                </button>
                                                <button
                                                onClick={() => handleShapeChange("Round")}
                                                style={{ flex: '1 1 45%', ...(selectedCategories.shape === "Round" ? activeButtonStyles : inactiveButtonStyles) }}
                                                >
                                                Round
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className='text-center pt-3 pb-3' onClick={toggleCol} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                                        Color
                                    </div>
                                    {isColor && (
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="color-options d-flex pt-2 pb-2"
                                            >
                                                <div
                                                    className="color-box"
                                                    style={{
                                                        backgroundColor: "black",
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '10px',
                                                        borderRadius: '50%',
                                                        ...(selectedCategories.color === "black" ? activeColor : {})
                                                    }}
                                                    onClick={() => {
                                                        if (selectedCategories.color !== "") {
                                                            handleColorChange("");
                                                        } else {
                                                            handleColorChange("black");
                                                        }
                                                    }}
                                                />
                                                <div
                                                    className="color-box"
                                                    style={{
                                                        backgroundColor: "blue",
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '10px',
                                                        borderRadius: '50%',
                                                        ...(selectedCategories.color === "blue" ? activeColor : {})
                                                    }}
                                                    onClick={() => {
                                                        if (selectedCategories.color !== "") {
                                                            handleColorChange("");
                                                        } else {
                                                            handleColorChange("blue");
                                                        }
                                                    }}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    )}
                                </Form>
                            </div>
                        </Col>
                    </MediaQuery>
                    {isFilterOpen && (
                        <AnimatePresence mode='wait'>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ duration: 0.5, type: 'tween', ease: 'easeInOut' }}
                                style={{
                                    position: 'fixed',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '80%',
                                    backgroundColor: 'rgba(255, 255, 255)',
                                    zIndex: 1000,
                                    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.3)',
                                    padding: '20px',
                                    overflowY: "auto"
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <BsX size={30} onClick={toggleFilter} style={{ cursor: 'pointer' }} />
                                </div>
                                <div>
                                    <h4>Filter</h4>
                                    <Form>
                                        <FormGroup>
                                            <Label className='pb-2' for="priceRange">Price Range</Label>
                                            <div className="price-range pr-3">
                                                <Range
                                                    values={selectedCategories.priceRange}
                                                    step={1}
                                                    min={0}
                                                    max={100}
                                                    onChange={handlePriceChange}
                                                    renderTrack={({ props, children }) => (
                                                        <div
                                                            {...props}
                                                            className="track"
                                                        >
                                                            {children}
                                                        </div>
                                                    )}
                                                    renderThumb={({ props }) => (
                                                        <div
                                                            {...props}
                                                            className="thumb"
                                                        />
                                                    )}
                                                />
                                                <div className="price-values">
                                                    <span>Min: {selectedCategories.priceRange[0]}</span>
                                                    <span>Max: {selectedCategories.priceRange[1]}</span>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <div className='text-center pt-3 pb-3' onClick={toggleMat} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                                            Material
                                        </div>
                                        <AnimatePresence>
                                            {isMat && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ paddingTop: "10px", display: 'flex', flexWrap: 'wrap', gap: '10px' }} // Added styles
                                                >
                                                    <button
                                                    onClick={() => handleMaterialChange("")}
                                                    style={{ flex: '1 1 45%', ...(selectedCategories.material === "" ? activeButtonStyles : inactiveButtonStyles) }}
                                                    >
                                                    All
                                                    </button>
                                                    <button
                                                    onClick={() => handleMaterialChange("Plastic")}
                                                    style={{ flex: '1 1 45%', ...(selectedCategories.material === "Plastic" ? activeButtonStyles : inactiveButtonStyles) }}
                                                    >
                                                    Plastic
                                                    </button>
                                                    <button
                                                    onClick={() => handleMaterialChange("Steel")}
                                                    style={{ flex: '1 1 45%', ...(selectedCategories.material === "Steel" ? activeButtonStyles : inactiveButtonStyles) }}
                                                    >
                                                    Steel
                                                    </button>
                                                    <button
                                                    onClick={() => handleMaterialChange("Mixed")}
                                                    style={{ flex: '1 1 45%', ...(selectedCategories.material === "Mixed" ? activeButtonStyles : inactiveButtonStyles) }}
                                                    >
                                                    Mixed
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <div className='text-center pt-3 pb-3' onClick={toggleShape} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                                            Shape
                                        </div>
                                        <AnimatePresence>
                                            {isShape && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ paddingTop: "10px", display: 'flex', flexWrap: 'wrap', gap: '10px' }} // Added styles
                                                >
                                                    <button
                                                    onClick={() => handleShapeChange("")}
                                                    style={{ flex: '1 1 45%', ...(selectedCategories.shape === "" ? activeButtonStyles : inactiveButtonStyles) }}
                                                    >
                                                    All
                                                    </button>
                                                    <button
                                                    onClick={() => handleShapeChange("Rectangle")}
                                                    style={{ flex: '1 1 45%', ...(selectedCategories.shape === "Rectangle" ? activeButtonStyles : inactiveButtonStyles) }}
                                                    >
                                                    Rectangle
                                                    </button>
                                                    <button
                                                    onClick={() => handleShapeChange("Square")}
                                                    style={{ flex: '1 1 45%', ...(selectedCategories.shape === "Square" ? activeButtonStyles : inactiveButtonStyles) }}
                                                    >
                                                    Square
                                                    </button>
                                                    <button
                                                    onClick={() => handleShapeChange("Round")}
                                                    style={{ flex: '1 1 45%', ...(selectedCategories.shape === "Round" ? activeButtonStyles : inactiveButtonStyles) }}
                                                    >
                                                    Round
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <div className='text-center pt-3 pb-3' onClick={toggleCol} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                                            Color
                                        </div>
                                        {isColor && (
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="color-options d-flex pt-2 pb-2"
                                            >
                                                <div
                                                    className="color-box"
                                                    style={{
                                                        backgroundColor: "black",
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '10px',
                                                        borderRadius: '50%',
                                                        ...(selectedCategories.color === "black" ? activeColor : {})
                                                    }}
                                                    onClick={() => {
                                                        if (selectedCategories.color !== "") {
                                                            handleColorChange("");
                                                        } else {
                                                            handleColorChange("black");
                                                        }
                                                    }}
                                                />
                                                <div
                                                    className="color-box"
                                                    style={{
                                                        backgroundColor: "blue",
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '10px',
                                                        borderRadius: '50%',
                                                        ...(selectedCategories.color === "blue" ? activeColor : {})
                                                    }}
                                                    onClick={() => {
                                                        if (selectedCategories.color !== "") {
                                                            handleColorChange("");
                                                        } else {
                                                            handleColorChange("blue");
                                                        }
                                                    }}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                        )}
                                    </Form>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}   
                        <Col md={10}>
                            <Row>
                                {catdes}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        );
    }
};

export default Mens;