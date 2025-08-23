import { Carousel } from 'react-bootstrap';
export default function Carousels() {
  return (
    <Carousel className="mb-4 mt-5">
      <Carousel.Item>
        <img className="d-block w-100" src="/images/elaicheesecake.png" alt="Galactic Wars banner" />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/uthappizza.png" alt="The Time Traveler banner" />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/vadonut.png" alt="Hidden Truth banner" />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
