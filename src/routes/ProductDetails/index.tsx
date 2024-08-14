import ProductDetailsCard from "../../components/ProductDetailsCard";
import HeaderClient from "../../components/HeaderClient";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonInverse from "../../components/ButtonInverse";
import { ProductDTO } from "../../models/Producto";

const product: ProductDTO = {
  id: 2,
  name: 'Smart TV',
  description: "Essa TV é muito bonita!",
  price: 5000,
  imgUrl: "https://i.imgur.com/ay2qjMO.jpeg",
  categories: [
    {
      id: 1,
      name: "Eletrônicos"
    },
    {
      id: 2,
      name: "Computadores"
    },
    {
      id: 4,
      name: "Importados"
    }
  ]
}

export default function ProductDetails() {
  return (
    <>
      <HeaderClient />
      <main>
        <section id="product-details-section" className="dsc-container">
          <ProductDetailsCard product={product} />
          <div className="dsc-btn-page-container">
            <ButtonPrimary />
            <ButtonInverse />
          </div>
        </section>
      </main>
    </>
  );
}