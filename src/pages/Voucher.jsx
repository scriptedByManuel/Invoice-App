import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import VoucherList from '../components/VoucherList'

const Voucher = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={'Voucher'} />
        <VoucherList />
      </Container>
    </section>
  )
}

export default Voucher