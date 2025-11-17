import { BadgeDollarSign, Database, ReceiptText, User2Icon } from 'lucide-react'
import ModuleBtn from '../components/ModuleBtn'
import Container from '../../../components/Container'

const Dashboard = () => {

    const modules = [
        {
            id: 1,
            name: 'Product',
            icon: <Database strokeWidth={2} size={40} />,
            url: '/dashboard/product'
        },
        {
            id: 2,
            name: 'Sale',
            icon: <BadgeDollarSign strokeWidth={2} size={40} />,
            url: '/dashboard/sale'
        },
        {
            id: 3,
            name: 'Voucher',
            icon: <ReceiptText strokeWidth={2} size={40} />,
            url: '/dashboard/voucher'
        },
        {
            id: 4,
            name: 'Profile',
            icon: <User2Icon strokeWidth={2} size={40} />,
            url: '/dashboard/user-profile'
        }
    ]

    return (
        <section className="py-10 font-montserrat">
            <Container>

                {/* Page Heading */}
                <h1 className="text-2xl font-semibold text-foreground mb-6">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {modules.map(module => (
                        <div key={module.id} className="col-span-1">
                            <ModuleBtn
                                name={module.name}
                                url={module.url}
                                icon={module.icon}
                                className="
                  bg-card border border-border px-6 py-8 rounded-xl shadow-sm
                  hover:shadow-md hover:bg-accent transition-all duration-200
                  flex flex-col items-center justify-center gap-4
                  text-foreground cursor-pointer
                "
                            />
                        </div>
                    ))}

                </div>
            </Container>
        </section>
    )
}

export default Dashboard
