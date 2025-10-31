import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import ProductList from '../components/ProductList'


const Product = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={'Product'} />
        <ProductList />
      </Container>
    </section>
  )
}

export default Product