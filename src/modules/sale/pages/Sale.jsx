import BreadCrumb from "../../../components/BreadCrumb";
import Container from "../../../components/Container";
import SaleCard from "../components/SaleCard";

const Sale = () => {
    return (
        <section>
            <Container>
                <BreadCrumb currentPageTitle={"Sale Module"} />
                <SaleCard />
            </Container>
        </section>
    );
};

export default Sale;