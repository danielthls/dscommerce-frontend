import ProductDetailsCard from "../../../components/ProductDetailsCard";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonInverse from "../../../components/ButtonInverse";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductDTO } from "../../../models/Product";
import './styles.css'
import * as productService from '../../../services/ProductService'
import * as cartService from '../../../services/CartService'
import { ContextCartCount } from "../../../utils/context-cart";


export default function ProductDetails() {

  const params = useParams();

  const [product, setProduct] = useState<ProductDTO>();

  const navigate = useNavigate();

  const { setContextCartCount } = useContext(ContextCartCount)

  useEffect(() => {
    productService.findById(Number(params.productId))
      .then(response => {
        setProduct(response.data);
      })
      .catch(() => {
        navigate('/');
      })

  }, [params])

  function handleBuyClick() {
    if (product) {
      cartService.addProduct(product);
      setContextCartCount(cartService.getCart().items.length)
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
            <ButtonPrimary caption="Comprar" onClick={handleBuyClick} />
            <Link to={"/"}>
              <ButtonInverse caption="Início" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}