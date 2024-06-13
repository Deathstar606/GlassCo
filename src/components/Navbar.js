import React, { useState } from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavItem, Button, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import Burger from './Burger';
import MediaQuery from 'react-responsive';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaGoogle, FaTimes, FaUser, FaShoppingBag } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const Example = (props) => {
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
        <Burger />
      </MediaQuery>
      <div className='d-flex justify-content-center' style={{ backgroundColor: "#EDEADF" }}>
        <div className='nav-c pt-2 pb-2'>
          <Navbar light expand="md">
            <NavbarBrand href="/" className='text-dark pr-4'>GlassCo</NavbarBrand>
            <Nav navbar className="mx-auto">
              <NavItem className='nav-ele'>
                <div>Category</div>
                <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                  <RouterLink to="/mens"><li className='text-center'>Men</li></RouterLink>
                  <li className='text-center'>Women</li>
                </ul>
              </NavItem>
              <NavItem className='nav-ele'>
                <div>Appeareal</div>
                <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                  <li className='text-center'>Shirts</li>
                  <RouterLink to="/pants"><li className='text-center'>Pants</li></RouterLink>
                  <li className='text-center'>Hoodies</li>
                </ul>
              </NavItem>
              <NavItem className='nav-ele'>
                <ScrollLink to="aboutus" spy={true} smooth={true} offset={-40} duration={500}><div>About Us</div></ScrollLink>
              </NavItem>
            </Nav>
            {/* <MediaQuery maxWidth={638}>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!props.auth.isAuthenticated ?
                    <div className='mr-4' style={{ paddingTop: "2px" }} onClick={toggleModal}>
                      <FaUser className='mr-1' /> Login
                      {props.auth.isFetching ?
                        null
                        : null
                      }
                    </div>
                    :
                    <div>
                      <div className="navbar-text text-dark mr-1">
                        <img
                          src={props.auth.user.photoURL}
                          alt={props.auth.user.displayName}
                          className="rounded-circle mr-2"
                          style={{ width: '30px' }}
                        />
                        Signout
                      </div>
                      <span onClick={handleLogout}>
                        <span className="fa fa-sign-out fa-lg mr-4"></span>
                        {props.auth.isFetching ?
                          <span className="fa fa-spinner fa-pulse fa-fw"></span>
                          : null
                        }
                      </span>
                    </div>
                  }
                </NavItem>
              </Nav>
            </MediaQuery> */}
            <MediaQuery minWidth={639}>
                <div style={{border: "1px solid black", borderRadius: "30px", padding: "10px 20px 10px 20px"}}>
                  {!props.auth.isAuthenticated ?
                    <div onClick={toggleModal}>
                      <FaUser className='mr-2 mb-1' />Login
                      {props.auth.isFetching ?
                        <i className="fa fa-sign-in" aria-hidden="true"></i>
                        : null
                      }
                    </div>
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
                <FaShoppingBag className='ml-3'/>
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
        </div>
      </div>
    </>
  );
};

export default Example;
