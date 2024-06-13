import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, CardImg, Col } from "reactstrap";
import { useInView } from "framer-motion";
import { StaggeredText } from "./Animations";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
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
    const dem1 = child.images[0];
    const dem2 = child.images[1];

    const [imgSrc, setImgSrc] = useState(dem1);

    useEffect(() => {
        const img1 = new Image();
        const img2 = new Image();
        img1.src = dem1;
        img2.src = dem2;
    }, [dem1, dem2]);

    return (
        <>
            <div className="curd card-container">
                <Link to={`/home/${child._id}`}>
                    <div
                        className="pro-img-container"
                        onMouseEnter={() => setImgSrc(dem2)}
                        onMouseLeave={() => setImgSrc(dem1)}
                    >
                        <CardImg className="pro-img" src={imgSrc} />
                        <div className="pro-img-overlay">
                            <div className="pro-img-text">
                                <h4>Add to cart</h4>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="p-2 pt-2 d-flex justify-content-between align-items-start">
                <div>
                    <h5>{child.name}</h5>
                </div>
                <div className="d-flex">Price</div>
            </div>
        </>
    );
}

function NewArr(props) {
/*     const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (props.clothe.clothes.length === 0) {
                await props.fetchClothes();
            }
            setIsLoading(false);
        };

        fetchData();
    }, [props.fetchClothes, props.clothe.clothes.length]);

    if (isLoading) {
        return <div>Loading...</div>;
    } */

    const glasses = props.clothe.clothes.map((glass, index) => (
        <SwiperSlide key={index}>
            <Product child={glass} />
        </SwiperSlide>
    ));

    return (
        <Container style={{ maxWidth: "85%" }}>
            <div className="d-flex justify-content-center mt-1 pb-5">
                <h2 className="headerdec newarrh" id="casestu">
                    <StaggeredText text={"New Addition"} />
                </h2>
            </div>
            <Section>
                <Row className="mt-5">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={50}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        {glasses}
                    </Swiper>
                </Row>
            </Section>
        </Container>
    );
}

export default NewArr;
