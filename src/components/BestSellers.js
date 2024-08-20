import React, { useEffect, useRef, useState } from "react";
import { Product } from "./NewArrival";
import { Link } from "react-router-dom";
import { Container, Row, CardImg, Col } from "reactstrap";
import { useInView } from "framer-motion";
import { StaggeredText } from "./Animations";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { baseUrl } from "../Redux/shared/baseurl";
import "./card.css";
import MediaQuery from "react-responsive";
import { Loading } from "./LoadingComponent";

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

function BestSell(props) {
    if (props.sunglass.isLoading) {
        return (
            <Loading/>
        )
    }
    
    const glasses = props.sunglass.sunglass.map((glass, index) => {
        if (glass.best) {
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
                    <StaggeredText text={"Best Sellers"} />
                </h2>
            </div>
            <Section>
                <Row className="mt-1 pb-5">
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

export default BestSell;
