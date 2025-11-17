import { LockIcon, LogOutIcon, PencilIcon } from 'lucide-react'
import Container from '../../../components/Container'
import BreadCrumb from '../../../components/BreadCrumb'
import useUserStore from '../../../stores/useUserStore'
import ProfileCard from '../components/ProfileCard'

const UserProfile = () => {
    

    return (
        <section>
            <Container>
                <BreadCrumb currentPageTitle="User Profile" />
                <ProfileCard />
            </Container>
        </section>
    )
}

export default UserProfile
