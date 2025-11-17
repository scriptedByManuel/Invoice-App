import Container from '../../../components/Container'
import BreadCrumb from '../../../components/BreadCrumb'
import ChangeImageCard from '../components/ChangeImageCard'


const UserChangeImage = () => {


    return (
        <section>
            <Container>
                <BreadCrumb
                    links={[{ title: 'User Profile', path: '/dashboard/user-profile' }]}
                    currentPageTitle="Change Photo"
                />
                <ChangeImageCard />
            </Container>
        </section>
    )
}

export default UserChangeImage
