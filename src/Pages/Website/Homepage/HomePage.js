import "./Home.css";
import Landing from "../../../Components/Website/Landing/Landing";
import ShowLatestSaleProduct from "../../../Components/Website/Product/SalesProduct/ShowLatestSaleProduct";
import BeforeTopRated from "../../../Components/Website/Beforetoprated/BeforeTopRated";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import ShowLatestProducts from "../../../Components/Website/Product/LatestProducts/ShowLatestproducts";
import { Container } from "react-bootstrap";

export default function HomePage() {
  return (
    <div>
      <Landing />
      <ShowLatestSaleProduct />
      <BeforeTopRated />
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
    </div>
  );
}
