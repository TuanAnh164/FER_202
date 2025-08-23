import { Form, Row, Col } from "react-bootstrap";

export default function Sort({ sortItem, setSortItem, darkMode }) {
    return (
        <Form className="my-3">
            <Form.Select
                value={sortItem}
                onChange={(e) => setSortItem(e.target.value)}
                className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
            >
                <option value="title-asc">Name A → Z</option>
                <option value="title-desc">Name Z → A</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
            </Form.Select>
        </Form>
    );
}
