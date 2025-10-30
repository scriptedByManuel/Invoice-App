import React from 'react'
import Container from '../components/Container'
import { BadgeDollarSign, Database, ReceiptText } from 'lucide-react'
import ModuleBtn from '../components/ModuleBtn'

const Dashboard = () => {
  const modules = [
    {
      id: 1,
      name: 'Product',
      icon: <Database strokeWidth={2} size={40} />,
      url: '/product'
    },
    {
      id: 2,
      name: 'Sale',
      icon: <BadgeDollarSign strokeWidth={2} size={40} />,
      url: '/sale'
    },
    {
      id: 3,
      name: 'Voucher',
      icon: <ReceiptText strokeWidth={2} size={40} />,
      url: '/voucher'
    }
  ]
  return (
    <section>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {modules.map(module => (
            <div key={module.id} className='col-span-1'>
              <ModuleBtn name={module.name} url={module.url} icon={module.icon} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Dashboard