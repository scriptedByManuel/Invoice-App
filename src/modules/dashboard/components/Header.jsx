import Container from '../../../components/Container'
import useUserStore from '../../../stores/useUserStore'

const Header = () => {
    const { user: { name, email, profile_image } } = useUserStore()

    return (
        <header className="mb-5">
            <Container>
                <div className="flex items-center justify-between">

                    {/* Branding */}
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Pixel Solutions</h1>
                        <p className="text-secondary">Invoice App</p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                        <img
                            src={
                                profile_image
                                    ? profile_image
                                    : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                            }
                            alt={`${name || "User"} profile`}
                            className="w-10 h-10 rounded-full object-cover border border-border"
                        />

                        <div className="flex flex-col">
                            <p className="font-medium text-foreground leading-tight">{name || "Guest User"}</p>
                            <p className="text-sm text-secondary truncate w-40">{email || "guest@example.com"}</p>
                        </div>
                    </div>

                </div>
            </Container>
        </header>
    )
}

export default Header
