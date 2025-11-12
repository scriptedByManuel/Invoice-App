import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import VoucherCard from '../components/VoucherCard'


const VoucherDetail = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={'Voucher Detail'} links={[{ title: 'Voucher', path: '/dashboard/voucher' }]} />
        <VoucherCard />
      </Container>
    </section>
  )
}

export default VoucherDetail