import { Axios } from "../../../../Api/axios";
import { useEffect, useState } from "react";
import { LatestSale } from "../../../../Api/Api";
import SaleProducts from "./SaleProducts";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../../Skeleton/SkeletonShow";

export default function ShowLatestSaleProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product) => (
    <SaleProducts
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      Sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
      col="3"
    />
  ));

  return (
    <Container>
      <h1>Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap mb-5">
        {loading ? (
          <>
            <SkeletonShow
              height="300px"
              length="4"
              classess="col-lg-3 col-md-6 col-12"
            />
          </>
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
