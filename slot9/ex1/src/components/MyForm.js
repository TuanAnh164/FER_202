import React, { useState, useReducer } from "react";
import { Button, Form, Container, Alert, Check } from "react-bootstrap";
import PropTypes from "prop-types";

// Reducer để quản lý trạng thái form
const initialState = {
    name: "",
    age: "",
    email: "",
    phonenumber: "",
    gender: "",
    check: "",
    isSubmitted: false,
};

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SUBMIT":
            return { ...state, isSubmitted: true };
        default:
            return state;
    }
};
// Component Form
const MyForm = ({ onSubmit }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false); // Biến để kiểm soát việc hiển thị alert

    // Hàm xử lý thay đổi giá trị input
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    };

    // Hàm kiểm tra lỗi trước khi submit
    const handleValidation = () => {
        const newErrors = {};
        if (!state.name) newErrors.name = "Tên không được để trống!";
        if (!state.age) newErrors.age = "Tuổi không được để trống!";
        if (!state.email) newErrors.email = "Email không được để trống!";
        if (!state.gender) newErrors.gender = "Giới tính không được để trống!";
        if (!state.phonenumber) newErrors.phonenumber = "Số điện thoại không được để trống!";
        if (!state.check) newErrors.check = "Vui lòng xác nhận thông tin!";

        // Nếu có lỗi, hiển thị alert
        if (Object.keys(newErrors).length > 0) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            dispatch({ type: "SUBMIT" });
            onSubmit(state);
        }
    };

    return (
        <Container>
            <h1></h1>

            {showAlert && (
                <Alert variant="danger">
                    <strong>Lỗi:</strong> Vui lòng điền đầy đủ thông tin.
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formage">
                    <Form.Label>Tuổi</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        value={state.age}
                        onChange={handleChange}
                        isInvalid={!!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.age}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formgender">
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Control
                        type="text"
                        name="gender"
                        value={state.gender}
                        onChange={handleChange}
                        isInvalid={!!errors.gender}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.gender}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formphonenumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        name="phonenumber"
                        value={state.phonenumber}
                        onChange={handleChange}
                        isInvalid={!!errors.phonenumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phonenumber}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formCheck">
                    <div className="mb-3 ">
                        <Form.Check
                            type="checkbox"
                            name="check"
                            onChange={(e) => {
                                dispatch({ type: "SET_FIELD", field: "check", value: e.target.checked})
                            }}
                            label={`Đồng ý với điều khoản`}
                        />
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errors.check}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};
// Xác định PropTypes cho MyForm
MyForm.propTypes = {
    onSubmit: PropTypes.func.isRequired, // Hàm onSubmit phải là một function
};
export default MyForm;
