export default function Carousels() {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/images/mediterranean-chickpea-salad.jpg"
            className="d-block w-100"
            alt="Mediterranean Chickpea Salad"
            style={{ objectFit: "cover", height: "500px" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="/images/avocado-tomato-toast.jpg"
            className="d-block w-100"
            alt="Avocado Tomato Toast"
            style={{ objectFit: "cover", height: "500px" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="/images/one-pan-lemon-garlic-salmon.jpg"
            className="d-block w-100"
            alt="One Pan Lemon Garlic Salmon"
            style={{ objectFit: "cover", height: "500px" }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
