import ProductDetailsCard from "../../../components/ProductDetailsCard";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonInverse from "../../../components/ButtonInverse";
import * as productService from '../../../services/ProductService'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/Product";
import axios from "axios";


export default function ProductDetails() {

  const params = useParams();

  const [product, setProduct] = useState<ProductDTO>();

  useEffect(() => {
    productService.findById(Number(params.productId))
      .then(response => {
        console.log(response.data)
        setProduct(response.data);
      })


  }, [params])

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