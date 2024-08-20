import ProductDetailsCard from "../../../components/ProductDetailsCard";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonInverse from "../../../components/ButtonInverse";
import * as productService from '../../../services/ProductService'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function ProductDetails() {

  const params = useParams();

  const product = productService.findById(Number(params.productId));

  return (
    <>
      <main>
        <section id="product-details-section" className="dsc-container">
          {
            product &&
            <ProductDetailsCard product={product} />
          }
          <div className="dsc-btn-page-container">

            <ButtonPrimary caption="Comprar" />
            <Link to={"/"}>
              <ButtonInverse caption="Início" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}