import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      id="hero1"
      className="d-flex align-items-center justify-content-between flex-wrap "
    >
      <Container>
        <div className="col-lg-3 col-md-8 col-12 text-md-start text-center">
          <h1 className="display-2 fa-bold"> shampoo Nice </h1>
          <h3 style={{ color: "gray" }} className="fa-normal">
            Another nice Thing which is used by someone i don't know
          </h3>
          <Link
            to="/shop"
            className="btn btn-primary mt-3 py-3 px-4 fa-bold text-light"
          >
            Shop Now
          </Link>
        </div>
      </Container>
    </div>
  );
}
