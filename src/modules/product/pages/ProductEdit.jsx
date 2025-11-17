import BreadCrumb from '../../../components/BreadCrumb'
import Container from '../../../components/Container'
import ProductEditForm from '../components/ProductEditForm'

const ProductEdit = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={'Edit Product'} links={[{ title: 'Product', path: '/dashboard/product' }]} />
        <ProductEditForm />
      </Container>
    </section>
  )
}

export default ProductEdit