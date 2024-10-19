import './styles.css'
import '../../../components/HeaderClient'
import SearchBar from '../../../components/SearchBar'
import CatalogCard from '../../../components/CatalogCard'
import ButtonNextPage from '../../../components/ButtonNextPage'
import * as productService from '../../../services/ProductService'
import { ProductDTO } from '../../../models/Product'
import { useEffect, useState } from 'react'
import { hasAnyRoles, isAuthenticated } from '../../../services/AuthService'

type QueryParams = {
  page: number;
  name: string;
}

export default function Catalog() {

  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParam] = useState<QueryParams>({
    page: 0,
    name: ''
  });

  useEffect(() => {
    console.log("teste: ", hasAnyRoles(['ROLE_CLIENT']))
    productService.findPageRequest(queryParams.page, queryParams.name)
      .then(response => {
        const nextPage = response.data.content
        setProducts(products.concat(nextPage));
        setIsLastPage(response.data.last)
      })
  }, [queryParams])

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParam({ ...queryParams, page: 0, name: searchText });
  }

  function handleNextPage() {
    setQueryParam({ ...queryParams, page: queryParams.page + 1 })
    console.log(queryParams.page)
  }

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar onSearch={handleSearch} />

        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">

          {products &&
            products.map(product =>
              <CatalogCard key={product.id} product={product} />
            )
          }
        </div>
        {
          !isLastPage &&
          <div onClick={handleNextPage}>
            <ButtonNextPage />
          </div>
        }
      </section>
    </main>
  );
}