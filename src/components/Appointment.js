import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Form, FormGroup, Label, Input, Container, Col } from 'reactstrap';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        time: '',
        name: '',
        phone: '',
        address: '',
        email: '',
    });

    const [currentPanel, setCurrentPanel] = useState('age');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNext = () => {
        if (currentPanel === 'age' && formData.age) {
            setCurrentPanel('time');
        } else if (currentPanel === 'time' && formData.time) {
            setCurrentPanel('details');
        }
    };

    const handlePrevious = () => {
        if (currentPanel === 'time') {
            setCurrentPanel('age');
        } else if (currentPanel === 'details') {
            setCurrentPanel('time');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log form data to the console
        console.log(formData);
    };

    return (
        <Container className="d-flex justify-content-center" style={{ height: '100vh', paddingTop: "10vh" }}>
            <Col sm="12" md="6">
                <Form onSubmit={handleSubmit} style={{ overflow: "hidden" }}>
                    <AnimatePresence mode='wait'>
                        {currentPanel === 'age' && (
                            <motion.div
                                key="age"
                                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                                initial={{ x: 1000, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -1000, opacity: 0 }}
                            >
                                <p className='text-center pb-2'>Book an appointment for an eye exam</p>
                                <h3 className='text-center pb-4'>Enter Patient Age</h3>
                                <FormGroup>
                                    <Label for="age">Age</Label>
                                    <Input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <div className='d-flex justify-content-center pt-2'>
                                    <button
                                        className='butt'
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!formData.age}
                                    >
                                        Next
                                    </button>
                                </div>
                            </motion.div>
                        )}
                        {currentPanel === 'time' && (
                            <motion.div
                                key="time"
                                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                                initial={{ x: 1000, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -1000, opacity: 0 }}
                            >
                                <h3 className='text-center pb-4'>Select Appointment Time</h3>
                                <FormGroup>
                                    <Label for="time">Time</Label>
                                    <Input
                                        type="time"
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <div className='d-flex justify-content-center pt-2'>
                                    <button
                                        className='butt'
                                        type="button"
                                        onClick={handlePrevious}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className='butt'
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!formData.time}
                                    >
                                        Next
                                    </button>
                                </div>
                            </motion.div>
                        )}
                        {currentPanel === 'details' && (
                            <motion.div
                                key="details"
                                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                                initial={{ x: 1000, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -1000, opacity: 0 }}
                            >
                                <h3 className='text-center pb-4'>Patient Information</h3>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">Phone Number</Label>
                                    <Input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <div className='d-flex justify-content-center pt-2'>
                                    <button
                                        className='butt'
                                        type="button"
                                        onClick={handlePrevious}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className='butt'
                                        type="submit"
                                        disabled={!formData.name || !formData.phone || !formData.address || !formData.email}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Form>
            </Col>
        </Container>
    );
};

export default AppointmentForm;
