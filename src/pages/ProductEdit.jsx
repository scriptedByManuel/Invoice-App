import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import ProductEditCard from '../components/ProductEditCard'

const ProductEdit = () => {
    return (
        <section>
            <Container>
                <BreadCrumb currentPageTitle={'Edit Product'} links={[{ title: 'Product', path: '/product' }]} />
                <ProductEditCard />
            </Container>
        </section>
    )
}

export default ProductEdit