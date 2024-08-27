import './styles.css'
import '../../../components/HeaderClient'
import SearchBar from '../../../components/SearchBar'
import CatalogCard from '../../../components/CatalogCard'
import ButtonNextPage from '../../../components/ButtonNextPage'
import * as productService from '../../../services/ProductService'
import { ProductDTO } from '../../../models/Product'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Catalog() {

  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    productService.findAll()
      .then(response => {
        console.log(response.data.content)
        setProducts(response.data.content);
      })


  }, [])

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar />

        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">

          {products &&
            products.map(product =>
              <CatalogCard key={product.id} product={product} />
            )
          }
        </div>

        <ButtonNextPage />
      </section>
    </main>
  );
}