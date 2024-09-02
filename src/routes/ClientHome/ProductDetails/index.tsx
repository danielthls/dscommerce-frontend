import ProductDetailsCard from "../../../components/ProductDetailsCard";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonInverse from "../../../components/ButtonInverse";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/Product";
import './styles.css'
import * as productService from '../../../services/ProductService'
import * as cartService from '../../../services/CartService'


export default function ProductDetails() {

  const params = useParams();

  const [product, setProduct] = useState<ProductDTO>();
  const navigate = useNavigate();

  useEffect(() => {
    productService.findById(Number(params.productId))
      .then(response => {
        console.log(response.data)
        setProduct(response.data);
      })
      .catch(() => {
        navigate('/');
      })

  }, [params])

  function handleBuyClick() {
    if (product) {
      cartService.addProduct(product);
      navigate("/cart");
    }
  }

  return (
    <>
      <main>
        <section className="dsc-container" id="product-details-section">
          {
            product &&
            <ProductDetailsCard product={product} />
          }
          <div className="dsc-btn-page-container">
            <div onClick={handleBuyClick}>
              <ButtonPrimary caption="Comprar" />
            </div>
            <Link to={"/"}>
              <ButtonInverse caption="Início" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}