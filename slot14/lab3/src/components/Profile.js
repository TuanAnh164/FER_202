import { useState, useEffect, useReducer, useMemo, useCallback } from "react";
import {
    Tabs,
    Tab,
    Form,
    Button,
    ProgressBar,
    Card,
    Toast,
    Container,
    Row,
    Col,
    Modal,
} from "react-bootstrap";

const initialState = {
    about: { fullName: "", email: "" },
    account: { username: "", password: "", confirm: "", question: "", answer: "" },
    address: { country: "", city: "", street: "", number: "" },
};

function formReducer(state, action) {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...state,
                [action.step]: { ...state[action.step], [action.field]: action.value },
            };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

export default function Profile() {
    const [step, setStep] = useState("about");
    const [state, dispatch] = useReducer(formReducer, initialState);
    const [avatar, setAvatar] = useState(null);
    const [toast, setToast] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [touched, setTouched] = useState({});

    // Load avatar từ localStorage
    useEffect(() => {
        const savedAvatar = localStorage.getItem("avatar");
        if (savedAvatar) setAvatar(savedAvatar);
    }, []);

    // Upload avatar
    const onFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                localStorage.setItem("avatar", reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    // Validate
    const getErrors = useCallback(() => {
        const errors = {};
        if (step === "about") {
            if (!state.about.fullName) errors.fullName = "Full name is required";
            if (!/\S+@\S+\.\S+/.test(state.about.email))
                errors.email = "Valid email is required";
        }
        if (step === "account") {
            const { username, password, confirm, question, answer } = state.account;
            if (username.length < 6) errors.username = "Username ≥ 6 characters";
            if (
                password.length < 8 ||
                !/[A-Z]/.test(password) ||
                !/[0-9]/.test(password) ||
                !/[^A-Za-z0-9]/.test(password)
            ) {
                errors.password =
                    "Password ≥ 8 chars, 1 uppercase, 1 number, 1 special char";
            }
            if (confirm !== password) errors.confirm = "Passwords do not match";
            if (!question) errors.question = "Please select a question";
            if (!answer) errors.answer = "Answer is required";
        }
        if (step === "address") {
            const { country, city, street, number } = state.address;
            if (!street) errors.street = "Street is required";
            if (!number) errors.number = "Number is required";
            if (!city) errors.city = "City is required";
            if (!country) errors.country = "Country is required";
        }
        return errors;
    }, [step, state]);

    const errors = getErrors();
    const isStepValid = Object.keys(errors).length === 0;

    const progress = useMemo(() => {
        const steps = ["about", "account", "address"];
        const index = steps.indexOf(step) + 1;
        return Math.round((index / steps.length) * 100);
    }, [step]);

    const onFieldChange = useCallback((step, field, value) => {
        dispatch({ type: "SET_FIELD", step, field, value });
    }, []);

    const markTouched = useCallback((field) => {
        setTouched((prev) => ({ ...prev, [`${step}.${field}`]: true }));
    }, [step]);

    const nextStep = useCallback(() => {
        if (!isStepValid) return;
        if (step === "about") setStep("account");
        else if (step === "account") setStep("address");
        else if (step === "address") {
            setShowModal(true);   // Hiện modal khi hoàn thành
            setToast(true);       // Hiện toast message
        }
    }, [step, isStepValid]);

    const prevStep = useCallback(() => {
        if (step === "account") setStep("about");
        if (step === "address") setStep("account");
    }, [step]);

    return (
        <Container className="py-4">
            <h3 className="text-center mb-4">BUILD YOUR PROFILE</h3>
            <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />

            <Tabs activeKey={step} onSelect={(k) => { if (isStepValid) { setStep(k) } }} variant="pills" fill>
                {/* TAB ABOUT */}
                <Tab eventKey="about" title="About">
                    <Form className="mt-3">
                        <Form.Group className="text-center mb-3">
                            <div
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    margin: "0 auto",
                                    border: "2px solid #ccc",
                                }}
                            >
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt="Avatar"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#f0f0f0",
                                            color: "#aaa",
                                        }}
                                    >
                                        No Image
                                    </div>
                                )}
                            </div>
                            <Form.Label className="mt-2">Choose Picture</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={onFileChange} />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        value={state.about.fullName}
                                        isInvalid={touched["about.fullName"] && errors.fullName}
                                        onBlur={() => markTouched("fullName")}
                                        onChange={(e) =>
                                            onFieldChange("about", "fullName", e.target.value)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={state.about.email}
                                        isInvalid={touched["about.email"] && errors.email}
                                        onBlur={() => markTouched("email")}
                                        onChange={(e) =>
                                            onFieldChange("about", "email", e.target.value)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Tab>

                {/* TAB ACCOUNT */}
                <Tab eventKey="account" title="Account">
                    <Form className="mt-3">
                        <Form.Group className="mb-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                value={state.account.username}
                                isInvalid={touched["account.username"] && errors.username}
                                onBlur={() => markTouched("username")}
                                onChange={(e) =>
                                    onFieldChange("account", "username", e.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={state.account.password}
                                isInvalid={touched["account.password"] && errors.password}
                                onBlur={() => markTouched("password")}
                                onChange={(e) =>
                                    onFieldChange("account", "password", e.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={state.account.confirm}
                                isInvalid={touched["account.confirm"] && errors.confirm}
                                onBlur={() => markTouched("confirm")}
                                onChange={(e) =>
                                    onFieldChange("account", "confirm", e.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirm}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Secret Question</Form.Label>
                            <Form.Select
                                value={state.account.question}
                                isInvalid={touched["account.question"] && errors.question}
                                onBlur={() => markTouched("question")}
                                onChange={(e) =>
                                    onFieldChange("account", "question", e.target.value)
                                }
                            >
                                <option value="">Select...</option>
                                <option>What is your first pet’s name?</option>
                                <option>What is your mother’s maiden name?</option>
                                <option>In which city were you born?</option>
                                <option>Who was your favorite teacher?</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.question}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                value={state.account.answer}
                                isInvalid={touched["account.answer"] && errors.answer}
                                onBlur={() => markTouched("answer")}
                                onChange={(e) =>
                                    onFieldChange("account", "answer", e.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.answer}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Tab>

                {/* TAB ADDRESS */}
                <Tab eventKey="address" title="Address">
                    <Form className="mt-3 ">
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Street Name</Form.Label>
                                    <Form.Control
                                        value={state.address.street}
                                        isInvalid={touched["address.street"] && errors.street}
                                        onBlur={() => markTouched("street")}
                                        onChange={(e) =>
                                            onFieldChange("address", "street", e.target.value)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.street}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Street Number</Form.Label>
                                    <Form.Control
                                        value={state.address.number}
                                        isInvalid={touched["address.number"] && errors.number}
                                        onBlur={() => markTouched("number")}
                                        onChange={(e) =>
                                            onFieldChange("address", "number", e.target.value)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.number}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        value={state.address.city}
                                        isInvalid={touched["address.city"] && errors.city}
                                        onBlur={() => markTouched("city")}
                                        onChange={(e) =>
                                            onFieldChange("address", "city", e.target.value)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select
                                        value={state.address.country}
                                        isInvalid={touched["address.country"] && errors.country}
                                        onBlur={() => markTouched("country")}
                                        onChange={(e) =>
                                            onFieldChange("address", "country", e.target.value)
                                        }
                                    >
                                        <option value="">Select country...</option>
                                        <option>Viet Nam</option>
                                        <option>Korea</option>
                                        <option>Italy</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.country}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Tab>
            </Tabs>

            <div className="d-flex justify-content-between mt-3">
                {step !== "about" && (
                    <Button variant="secondary" onClick={prevStep}>
                        Previous
                    </Button>
                )}
                <Button variant="success" onClick={nextStep} disabled={!isStepValid}>
                    {step === "address" ? "Finish" : "Next"}
                </Button>
            </div>

            {/* MODAL HIỂN THỊ THÔNG TIN */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {avatar && (
                        <div className="text-center mb-3">
                            <img
                                src={avatar}
                                alt="Avatar"
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    )}
                    <h6>About</h6>
                    <p>{state.about.fullName}</p>
                    <p>{state.about.email}</p>

                    <h6>Account</h6>
                    <p>Username: {state.account.username}</p>
                    <p>Secret: {state.account.question}</p>
                    <p>Answer: {state.account.answer}</p>

                    <h6>Address</h6>
                    <p>
                        {state.address.street} {state.address.number}, {state.address.city},{" "}
                        {state.address.country}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* TOAST MESSAGE */}
            <Toast
                show={toast}
                onClose={() => setToast(false)}
                autohide
                delay={10000}
                className="position-fixed bottom-0 end-0 m-3"
                bg="success"
                style={{ zIndex: 9999 }}
            >
                <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
            </Toast>
        </Container>
    );
}
