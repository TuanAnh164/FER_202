import { Carousel } from 'react-bootstrap';
export default function Carousels() {
  return (
    <Carousel className="mb-4 mt-5">
      <Carousel.Item>
        <img className="d-block w-100" src="/images/movie1.jpg" alt="Galactic Wars banner" />
        <Carousel.Caption>
          <h3>Galactic Wars</h3>
          <p>Epic space battles across a fractured galaxy.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/movie6.jpg" alt="The Time Traveler banner" />
        <Carousel.Caption>
          <h3>The Time Traveler</h3>
          <p>Bend time, pay the price.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/movie8.jpg" alt="Hidden Truth banner" />
        <Carousel.Caption>
          <h3>Hidden Truth</h3>
          <p>Some secrets refuse to stay buried.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
