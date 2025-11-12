import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import ProductCreateCard from '../components/ProductCreateCard'

const ProductCreate = () => {
   
    return (
        <section>
            <Container>
                <BreadCrumb currentPageTitle={'Create Product'} links={[{ title: 'Product', path: '/dashboard/product' }]} />
                <ProductCreateCard />
            </Container>
      </section>
  )
}

export default ProductCreate