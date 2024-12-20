import React, { useState, useEffect } from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavItem, Button, Form, FormGroup, Input, Label, Col, Row, CardImg } from 'reactstrap';
import BurgerMenu from "./Burger"
import MediaQuery from 'react-responsive';
import { Link as RouterLink } from 'react-router-dom';
import { FaGoogle, FaTimes, FaUser, FaShoppingBag } from 'react-icons/fa';
import { baseUrl } from '../Redux/shared/baseurl';
import { AnimatePresence, motion } from 'framer-motion';

export const OrderBar = ({ orders, handleOrdPage, removeOrder }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log(orders)
  const total = orders.reduce((sum, order) => sum + order.price, 0);
  const sidebarWidth = windowWidth < 640 ? '70vw' : '500px';

  return (
    <motion.div
      onClick={handleOrdPage}
      className='modal-back'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click event propagation
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: "white",
          width: sidebarWidth, // Use the calculated width
          height: '100vh', // Full height of the viewport
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Box shadow for some depth
          position: 'fixed', // Fix to the right side
          top: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          flex: 1, // Allow this container to grow and take up available space
          maxHeight: 'calc(100vh - 80px)', // Adjust max height to account for footer space
          overflowY: orders.length > 0 ? 'auto' : 'hidden',
          padding: '0 1rem', // Add padding for aesthetics
        }}>
          <ul className='p-3' style={{ padding: 0, listStyleType: 'none' }}>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <React.Fragment key={index}>
                  <Row style={{ marginBottom: '20px' }}>
                    <Col md={4} className="mx-0">
                      <CardImg className='mb-4' src={baseUrl + order.image} alt={order.name} />
                    </Col>
                    <Col md={8}>
                      <strong>{order.name}<br /></strong>
                      <strong>Lens Material:</strong> {order.lensMat} + 0 Tk<br />
                      <strong>Left Eye Power:</strong> {order.leftEye} diapter<br />
                      <strong>Right Eye Power:</strong> {order.rightEye} diapter<br />
                      <strong>Price:</strong> {order.price} Tk<br />
                    </Col>
                  </Row>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className='butt' outline onClick={() => removeOrder(order._id)}>Remove</button>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <h3 className='text-center'>No items in cart</h3>
            )}
          </ul>
        </div>
        <div className='p-3'>
          <div className='ml-3 mb-2 ml-2'>Total: {total} Tk </div>
          <RouterLink to="home/orders">
            <button onClick={handleOrdPage} className='butt ml-3'>Place Order</button>
          </RouterLink>
        </div>
      </motion.div>
    </motion.div>
  );
}

const Example = (props) => {
  const [ordPage, setOrdPage] = useState(false)
  const handleOrdPage = () => {
    setOrdPage(!ordPage)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = (event) => {
    toggleModal();
    props.loginUser({ username: username.value, password: password.value });
    event.preventDefault();
  };

  const handleGoogleLogin = (event) => {
    toggleModal();
    props.googleLogin();
    event.preventDefault();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  let username, password;

  return (
    <>
      <MediaQuery maxWidth={639}>
        {!ordPage && (
          <>
          <BurgerMenu/>
            <div className='mobile-shoping'>
              <FaShoppingBag onClick={handleOrdPage} className='ml-3'/>
                {props.orders.length > 0 && (
                  <div className="bubble">
                    {props.orders.length}
                  </div>
                )}
            </div>          
          </>
        )}
      </MediaQuery>
      <div className='d-flex justify-content-center'>
        <div className='nav-c pt-2 pb-2'>
          <Navbar light expand="md">
            <NavbarBrand href="/" className='text-dark pr-4'>GlassCo</NavbarBrand>
            <MediaQuery minWidth={640}>
              <Nav navbar className="mx-auto">
                <NavItem className='nav-ele'>
                  <div>Sunglasses</div>
                  <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                    <RouterLink style={{textDecoration: "none", color: "inherit"}} to="/home/sunglass"><li className='text-center'>All Sunglasses</li></RouterLink>
                    <RouterLink style={{textDecoration: "none", color: "inherit"}} to="/home/sunglass/men"><li className='text-center'>For Men</li></RouterLink>
                    <RouterLink style={{textDecoration: "none", color: "inherit"}} to="/home/sunglass/women"><li className='text-center'>For Women</li></RouterLink>
                  </ul>
                </NavItem>
                <NavItem className='nav-ele'>
                  <div>Eyeglasses</div>
                  <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                    <li className='text-center'>Unisex</li>
                    <li className='text-center'>For Men</li>
                    <li className='text-center'>For Women</li>
                  </ul>
                </NavItem>
                <NavItem>
                  <RouterLink
                    className='nav-ele' 
                    to="/home/doctors" 
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <li className='text-center'>Make an Appointment</li>
                  </RouterLink>
                </NavItem>
                <NavItem className='nav-ele'>
                  <div>Visit us</div>
                </NavItem>
              </Nav>
            </MediaQuery>
            <MediaQuery minWidth={639}>
                <div>
                  {!props.auth.isAuthenticated ?
                    <button className='butt' onClick={toggleModal}>
                      <FaUser className='mr-2 mb-1' />Login
                      {props.auth.isFetching ?
                        <i className="fa fa-sign-in" aria-hidden="true"></i>
                        : null
                      }
                    </button>
                    :
                    <div>
                      <RouterLink to="/cart"><FaShoppingBag className='mr-3' /></RouterLink>
                      <div className="navbar-text text-dark mr-3">
                        <img
                          src={props.auth.user.photoURL}
                          alt={props.auth.user.displayName}
                          className="rounded-circle mr-2"
                          style={{ width: '30px' }}
                        />
                      </div>
                      <span onClick={handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                        {props.auth.isFetching ?
                          <span className="fa fa-spinner fa-pulse fa-fw"></span>
                          : null
                        }
                      </span>
                    </div>
                  }
                </div>
                <div style={{position: "relative"}}>
                  <FaShoppingBag onClick={handleOrdPage} className='ml-3'/>
                    {props.orders.length > 0 && (
                      <div className="bubble">
                        {props.orders.length}
                      </div>
                    )}
                </div>
            </MediaQuery>
          </Navbar>
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className='modal-back'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <motion.div
                  className='d-flex justify-content-center m-5'
                  initial={{ opacity: 0, y: -70 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -70 }}>
                  <Container className='d-flex justify-content-center' style={{ position: "absolute" }}>
                    <Col md={5} xs={12} className="p-4" style={{ borderRadius: "20px", backgroundColor: '#EDEADF' }}>
                      <h2 className="text-center mb-4">Login</h2>
                      <Form onSubmit={handleLogin}>
                        <FormGroup>
                          <Label htmlFor="username">Email</Label>
                          <Input type="text" id="username" name="username"
                            placeholder='Your Name'
                            innerRef={(input) => username = input} />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Input type="password" id="password" name="password"
                            placeholder='Password'
                            innerRef={(input) => password = input} />
                        </FormGroup>
                        <div className='d-flex justify-content-center pb-2'>
                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                        </div>
                        <div className='d-flex justify-content-center pb-2'>Or</div>
                        <div className='d-flex justify-content-center'>
                          <Button onClick={handleGoogleLogin} variant="secondary outline">
                            <FaGoogle className="mr-1" /> Sign in with Google
                          </Button>
                        </div>
                        <FaTimes onClick={toggleModal} style={{ position: "absolute", top: "10", right: "10" }} />
                      </Form>
                    </Col>
                  </Container>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode='wait'>
            {ordPage && (
              <OrderBar orders={props.orders} handleOrdPage={handleOrdPage} removeOrder={props.removeExistingOrder}/>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Example;
