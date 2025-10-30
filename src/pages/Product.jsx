import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import ProductList from '../components/ProductList'
import { Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={'Product'} />
        <div className="flex items-center justify-between mb-4">
          {/* Search Input */}
          <div className="relative w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className='text-gray-500' />
            </div>
            <input
              type="text"
              id="simple-search"
              placeholder="Search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              required
            />
          </div>

          {/* Add Product Button */}
          <Link to={'/product/create'} className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <span>Add New Product</span>
            <Plus className="w-4 h-4" />
          </Link>
        </div>

        <ProductList />
      </Container>
    </section>
  )
}

export default Product