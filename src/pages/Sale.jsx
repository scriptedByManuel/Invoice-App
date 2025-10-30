import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import VoucherInfo from '../components/VoucherInfo'

const Sale = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={'Sale'} />
        <VoucherInfo />
      </Container>
    </section>
  )
}

export default Sale