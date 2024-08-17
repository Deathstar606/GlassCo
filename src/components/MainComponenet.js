import React, { useEffect } from 'react';
import HeroSec from './HeroSec';
import NewArr from "./NewArrival";
import Deats from './Details';
import Order from './OrderPage';
import Catlist from './Cats';
import Mens from './ProductList';
import AppointmentForm from './Appointment';
import BestSell from './BestSellers';
/* import RenderItem from './Featured'; */
import AboutUs from "./AboutUs";
import Category from "./Category";
import Footer from "./Footer";
import { Container, Row, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import Example from './Navbar';
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSun, fetchOrders, addNewOrder, removeExistingOrder, loginUser, logoutUser } from '../Redux/ActionCreators';
import { AnimatePresence, motion } from 'framer-motion';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
/*     deals: state.deals,
    feats: state.feats, */
    sunglass: state.sunglass,
    orders: state.orders
    //cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => ({    //method defination
  fetchSun: () => {dispatch(fetchSun())},
  fetchOrders: () => {dispatch(fetchOrders())},
  addNewOrder: (order) => {dispatch(addNewOrder(order))},
  removeExistingOrder: (order_id) => {dispatch(removeExistingOrder(order_id))},
  loginUser: (creds) => {dispatch(loginUser(creds))},
  logoutUser: () => {dispatch(logoutUser())}
});

const Main = (props) => {

  useEffect(() => {
    props.fetchSun(),
    props.fetchOrders()
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
              deats={
                props.sunglass.sunglass.filter(
                  (glass) => glass._id === match.pathname.split('/')[2]
                )[0]
              }
              similar={props.sunglass.sunglass}
              addNewOrder={props.addNewOrder}
/*               reviews={
                props.reviews.reviews.filter(
                  (rev) => rev.cloth === match.pathname.split('/')[2]
                )
              }
              isLoading={props.clothes.isLoading}
              errMess={props.clothes.errMess}
              postReview={props.postReview} */
            />
          </div>
        </motion.div>
      );
  };

  const AllSun = ({ sunglasses }) => {
    return <Mens glasses={sunglasses.sunglass} />
  }

  const FilteredMensSun = ({ sunglasses }) => {
    const filteredSunglasses = sunglasses.sunglass.filter(sunglass => sunglass.gender === 'Men' || sunglass.gender === 'Unisex');
    return <Mens glasses={filteredSunglasses} />;
  };

  const FilteredWoMensSun = ({ sunglasses }) => {
    const filteredSunglasses = sunglasses.sunglass.filter(sunglass => sunglass.gender === 'Women' || sunglass.gender === 'Unisex');
    return <Mens glasses={filteredSunglasses} />;
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
            <NewArr sunglass={props.sunglass}/>
            <Category />
            <AboutUs />
            <BestSell sunglass={props.sunglass}/>
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
        orders={props.orders.orders}
        sunglass={props.sunglass.sunglass}
        removeExistingOrder={props.removeExistingOrder}
      />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:clothId" element={<GlassId />} />
          <Route path="/home/doctors" element={<AppointmentForm />} />
          <Route path="/home/sunglass" element={<AllSun sunglasses={props.sunglass} />} />
          <Route path="/home/sunglass/men" element={<FilteredMensSun sunglasses={props.sunglass} />} />
          <Route path="/home/sunglass/women" element={<FilteredWoMensSun sunglasses={props.sunglass} />} />
          <Route path="/home/orders" element={<Order orders={props.orders.orders} removeExistingOrder={props.removeExistingOrder}/>} />
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