import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, CardImg, Col } from "reactstrap";
import { useInView } from "framer-motion";
import { StaggeredText } from "./Animations";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { baseUrl } from "../Redux/shared/baseurl";
import MediaQuery from "react-responsive";
import { Loading } from "./LoadingComponent";
import "./card.css";

function Section({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
        <section ref={ref}>
            <div
                style={{
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                }}>
                {children}
            </div>
        </section>
    );
}

export const Product = ({ child }) => {
    const [defCol, setDefCol] = useState(child.color[0]);
    const dem1 = baseUrl + child.images[defCol][0];
    const dem2 = baseUrl + child.images[defCol][1];
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        setImgSrc(dem1);
    }, [defCol]);

    const changeCol = (col) => {
        setDefCol(col);
    };

    // Calculate discounted price if discount is available
    const discountedPrice = child.discount ? 
        (child.price - (child.price * (child.discount / 100))).toFixed(2) : 
        null;

    return (
        <>
            <div className="curd">
                <Link to={`/home/${child._id}`}>
                    <div
                        className="pro-img-container"
                        onMouseEnter={() => setImgSrc(dem2)}
                        onMouseLeave={() => setImgSrc(dem1)}
                    >
                        <img className="pro-img" src={imgSrc} alt={child.name} />
                        <div className="pro-img-overlay" style={{borderRadius: "20px"}}>
                            <div className="pro-img-text">
                                <h4>View</h4>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="p-2 pt-2 d-flex justify-content-between align-items-start">
                <div>
                    <h5>{child.name}</h5>
                    {child.discount && (
                        <span className="badge bg-danger">{child.discount}% OFF</span>
                    )}
                </div>
                <div className="d-flex">
                    {child.discount ? (
                        <>
                            <span className="text-muted mr-2" style={{ textDecoration: 'line-through' }}>
                                {child.price} Tk
                            </span>
                            <span className="ms-2 text-danger">
                                {discountedPrice} Tk
                            </span>
                        </>
                    ) : (
                        <span>{child.price} Tk</span>
                    )}
                </div>
            </div>
            <div className="color-options d-flex pt-1 pb-2 ml-1">
                {child.color.map((col, index) => (
                    <div
                        key={index}
                        className="color-box"
                        style={{ backgroundColor: col, width: '25px', height: '25px', marginRight: '10px', borderRadius: '50%' }}
                        onClick={() => changeCol(col)}
                    />
                ))}
            </div>
        </>
    );
};

function NewArr(props) {
    if (props.sunglass.isLoading) {
        return (
            <Loading/>
        )
    }

    const glasses = props.sunglass.sunglass.map((glass, index) => {
        if (glass.new) {
            return (
                <SwiperSlide key={index}>
                    <Product child={glass} />
                </SwiperSlide>
            )
        }
    })

    return (
        <Container style={{ maxWidth: "90%" }}>
            <div className="d-flex justify-content-center mt-1 pb-5">
                <h2 className="headerdec newarrh" id="casestu">
                    <StaggeredText text={"New Addition"} />
                </h2>
            </div>
            <Section>
                <Row className="mt-1">
                    <MediaQuery minWidth={640}>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={50}
                        >
                            {glasses}
                        </Swiper>
                    </MediaQuery>
                    <MediaQuery maxWidth={639}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={50}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            modules={[Autoplay]}
                        >
                            {glasses}
                        </Swiper>
                    </MediaQuery>
                </Row>
            </Section>
        </Container>
    );
}

export default NewArr;
