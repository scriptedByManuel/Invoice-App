import React from 'react'
import Container from '../../../components/Container'
import BreadCrumb from '../../../components/BreadCrumb'
import ProductCreateForm from '../components/ProductCreateForm'

const ProductCreate = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={'Create Product'} links={[{ title: 'Product', path: '/dashboard/product' }]} />
        <ProductCreateForm />
      </Container>
    </section>
  )
}

export default ProductCreate