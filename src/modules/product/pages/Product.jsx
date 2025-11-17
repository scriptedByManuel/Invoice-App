import BreadCrumb from "../../../components/BreadCrumb"
import Container from "../../../components/Container"
import ProductTable from "../components/ProductTable"


const Product = () => {
    return (
        <section>
            <Container>
                <BreadCrumb currentPageTitle={'Product'} />
                <ProductTable />
            </Container>
        </section>
    )
}

export default Product