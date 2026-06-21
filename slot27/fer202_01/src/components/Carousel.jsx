import { Carousel } from 'react-bootstrap';
export default function Carousels() {
  return (
    <Carousel variant="dark" className="mb-4 mt-5">
      <Carousel.Item>
        <img className="d-block w-100" style={{ maxHeight: "100%", maxWidth: "100%" }} src="/images/carousel/mobile1.jpg" alt="mobile1" />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" style={{ maxHeight: "100%", maxWidth: "100%" }} src="/images/carousel/mobile2.jpg" alt="mobile2" />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" style={{ maxHeight: "100%", maxWidth: "100%" }} src="/images/carousel/mobile3.jpg" alt="mobile3" />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
