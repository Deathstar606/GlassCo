import React, {useRef, useState} from "react";
import { Container, Row, CardImg, Col } from "reactstrap";
import { useInView } from "framer-motion";
import { StaggeredText } from "./Animations";
import dem1 from "../images/14.jpg"
import dem2 from "../images/15.jpg"
// Import Swiper React components
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "./card.css"

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

/* function Product({ child }) {
    return (
      <Col md={3}>
        <Section>
          <div className="curd card-container">
            <Link to={`/${child._id}`}>
              <div className="pro-img-container">
                <CardImg
                  className="pro-img"
                  src={child.images[child.colors[0]][0]}
                />
                <div className="pro-img-overlay">
                  <div className="pro-img-text">
                    <h4>Product Name</h4>
                    <p>Description</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Section>
      </Col>
    );
} */

function BestSell() {
  const [imgSrc, setImgSrc] = useState(dem1);

  return (
    <>
      <Container style={{ maxWidth: "95%" }}>
        <div className="d-flex justify-content-center mt-1">
          <h2 className="headerdec newarrh" id="casestu">
            <StaggeredText text={"Best Sellers"}></StaggeredText>
          </h2>
        </div>
        <Row className="mt-5 pb-5">
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
            >
                <SwiperSlide>
                    <div>
                        <div className="curd card-container">
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
                        </div>
                        <div className="p-2 pt-2 d-flex justify-content-between align-items-start">
                            <div>
                                <h5>Product Name</h5>
                            </div>
                            <div className="d-flex">Price</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className="curd card-container">
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
                        </div>
                        <div className="p-2 pt-2 d-flex justify-content-between align-items-start">
                            <div>
                                <h5>Product Name</h5>
                            </div>
                            <div className="d-flex">Price</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className="curd card-container">
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
                        </div>
                        <div className="p-2 pt-2 d-flex justify-content-between align-items-start">
                            <div>
                                <h5>Product Name</h5>
                            </div>
                            <div className="d-flex">Price</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className="curd card-container">
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
                        </div>
                        <div className="p-2 pt-2 d-flex justify-content-between align-items-start">
                            <div>
                                <h5>Product Name</h5>
                            </div>
                            <div className="d-flex">Price</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className="curd card-container">
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
                        </div>
                        <div className="p-2 pt-2 d-flex justify-content-between align-items-start">
                            <div>
                                <h5>Product Name</h5>
                            </div>
                            <div className="d-flex">Price</div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </Row>
      </Container>
    </>
  );
}

export default BestSell;