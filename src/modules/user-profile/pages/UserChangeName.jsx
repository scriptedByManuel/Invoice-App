import BreadCrumb from '../../../components/BreadCrumb'
import Container from '../../../components/Container'
import ChangeNameCard from '../components/ChangeNameCard'

const UserChangeName = () => {
    

    return (
        <section>
            <Container>
                <BreadCrumb
                    links={[{ title: 'User Profile', path: '/dashboard/user-profile' }]}
                    currentPageTitle="Change Name"
                />
                <ChangeNameCard />
            </Container>
        </section>
    )
}

export default UserChangeName
