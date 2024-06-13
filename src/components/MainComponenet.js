import React, { useEffect } from 'react';
import HeroSec from './HeroSec';
import NewArr from "./NewArrival";
import Deats from './Details';
import Catlist from './Cats';
import Mens from './Mens';
import Carts from './Cart';
import BestSell from './BestSellers';
/* import RenderItem from './Featured'; */
import AboutUs from "./AboutUs";
import Category from "./Category";
import Footer from "./Footer";
import { Container, Row, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import Example from './Navbar';
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleLogin, loginUser, logoutUser, fetchClothes, fetchDeals, fetchFeats,
          fetchReviews, postReview, fetchCarts, postCart, deleteCart } from '../Redux/ActionCreators';
import { AnimatePresence, motion } from 'framer-motion';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
/*     deals: state.deals,
    feats: state.feats, */
    clothes: state.clothes,
    reviews: state.reviews,
    //cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => ({    //method defination
  fetchDeals: () => {dispatch(fetchDeals())},
  fetchFeats: () => {dispatch(fetchFeats())},
  fetchClothes: () => {dispatch(fetchClothes())},
  fetchReviews: () => dispatch(fetchReviews()),
  postReview: (glassId, rating, comment) => dispatch(postReview(glassId, rating, comment)),
  fetchCarts: () => {dispatch(fetchCarts())},
  postCart: (clothId, image, size, color, price) => dispatch(postCart(clothId, image, size, color, price)),
  deleteCart: (clothId) => {dispatch(deleteCart(clothId))},
  googleLogin: () => dispatch(googleLogin()),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
});

const Main = (props) => {

  useEffect(() => {
    props.fetchClothes()
  }, []);

  const GlassId = () => {
    const match = useLocation();
      return (
        <motion.div
          transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
          initial = {{x: 1000, opacity: 0}}
          animate= {{x: 0, opacity: 1}}
          exit= {{x: -1000, opacity: 0}}>
          <div>
            <Deats
              clothes={
                props.clothes.clothes.filter(
                  (cloth) => cloth._id === match.pathname.split('/')[2]
                )[0]
              }
              reviews={
                props.reviews.reviews.filter(
                  (rev) => rev.cloth === match.pathname.split('/')[2]
                )
              }
              similar={props.clothes}
              isLoading={props.clothes.isLoading}
              errMess={props.clothes.errMess}
              postReview={props.postReview}
              //postCart={props.postCart}
            />
          </div>
        </motion.div>
      );
  };

  const Home = () => {
      return (
        <>
          <motion.div
            transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
            initial = {{x: 1000, opacity: 0}}
            animate= {{x: 0, opacity: 1}}
            exit= {{x: -1000, opacity: 0}}>
            <HeroSec />
            <NewArr clothe={props.clothes}/>
            <Category />
            <AboutUs />
            <BestSell/>
          </motion.div>
        </>
      );
  };

  return (
    <>
      <Example
        auth={props.auth}
        loginUser={props.loginUser}
        logoutUser={props.logoutUser}
        googleLogin={props.googleLogin}
      />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:clothId" element={<GlassId />} />
          <Route path="/home/men" element={<Mens clothes={props.clothes} />} />
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
        </Routes>
      <Footer />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);