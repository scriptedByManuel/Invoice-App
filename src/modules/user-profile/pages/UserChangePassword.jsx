import { useForm } from 'react-hook-form'
import useCookie from 'react-use-cookie'
import { toast } from 'sonner'
import Container from '../../../components/Container'
import BreadCrumb from '../../../components/BreadCrumb'
import { changePassword } from '../../../services/profile'
import { useNavigate } from 'react-router-dom'
import ChangePasswordCard from '../components/ChangePasswordCard'

const UserChangePassword = () => {
    

    

    return (
        <section>
            <Container>
                <BreadCrumb
                    links={[{ title: 'User Profile', path: '/dashboard/user-profile' }]}
                    currentPageTitle="Change Password"
                />
                <ChangePasswordCard />
            </Container>
        </section>
    )
}

export default UserChangePassword
