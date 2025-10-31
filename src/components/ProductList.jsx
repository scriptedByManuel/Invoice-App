import { Plus, Search, X } from 'lucide-react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import ProductSkeleton from './ProductSkeleton';
import ProductRow from './ProductRow';
import ProductListEmptyStage from './ProductListEmptyStage';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const ProductList = () => {

    const searchInput = useRef()
    const [search, setSearch] = useState('')

    const { data, isLoading, error } = useSWR(
        search ? `${import.meta.env.VITE_URL_API}/products?product_name_like=${search}` : `${import.meta.env.VITE_URL_API}/products`,
        fetcher
    );

    const handleSearch = debounce(e => {
        setSearch(e.target.value)
      }, 500)
    
      const handleClearSearch = () => {
        searchInput.current.value = ''
        setSearch('')
      }
    

    if (error)
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load products.
            </div>
        );

    return (
        <div className="relative overflow-x-auto shadow-lg rounded-xl bg-white">
            {/* Header: Search + Add Button */}
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative w-full sm:w-1/3">
                    {/* Search Icon */}
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />

                    {/* Input */}
                    <input
                        ref={searchInput}
                        onChange={handleSearch}
                        type="text"
                        id="simple-search"
                        placeholder="Search"
                        className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    />

                    {/* Clear (X) Icon */}
                    <X
                        onClick={handleClearSearch}
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer bg-gray-50"
                    />
                </div>

                {/* Add Product Button */}
                <Link
                    to="/product/create"
                    className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium 
                     px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                </Link>
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left text-gray-800">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-6 py-3">#</th>
                        <th scope="col" className="px-6 py-3">Product name</th>
                        <th scope="col" className="px-6 py-3 text-end">Price</th>
                        <th scope="col" className="px-6 py-3 text-end">Created At</th>
                        <th scope="col" className="px-6 py-3 text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <ProductSkeleton />
                    ) : data?.length === 0 ? (
                        <ProductListEmptyStage />
                    ) : (
                        data?.map((product, index) => (
                            <ProductRow
                                product={product}
                                index={index}
                                key={product.id}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
