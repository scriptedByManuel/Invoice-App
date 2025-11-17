import Container from "../../../components/Container";
import BreadCrumb from "../../../components/BreadCrumb";
import VoucherTable from "../components/VoucherTable";

const Voucher = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={"Voucher"} />
        <VoucherTable />
      </Container>
    </section>
  );
};

export default Voucher;