import { ChevronDown, ChevronUp, FilterIcon, Plus, Search, X } from 'lucide-react';
import useSWR from 'swr';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import ProductSkeleton from './ProductSkeleton';
import ProductRow from './ProductRow';
import ProductListEmptyStage from './ProductListEmptyStage';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import useCookie from 'react-use-cookie';
import Pagination from './Pagination';


const ProductList = () => {
    const location = useLocation()
    const [params, setParams] = useSearchParams()

    const [token] = useCookie('my_token')
    const fetcher = (url) => fetch(url, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json());


    const [fetchUrl, setFetchUrl] = useState(`${import.meta.env.VITE_URL_API}/products${location.search}`)
    const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

    const searchInput = useRef()

    const handleSearch = debounce(e => {
        if (e.target.value) {
            setParams({ q: e.target.value });
            setFetchUrl(
                `${import.meta.env.VITE_URL_API}/products?q=${e.target.value}`
            );
        } else {
            setParams({});
            setFetchUrl(`${import.meta.env.VITE_URL_API}/products`);
        }
    }, 500)

    const handleClearSearch = () => {
        searchInput.current.value = ''
        setParams({});
        setFetchUrl(`${import.meta.env.VITE_URL_API}/products`);
    }

    const updateFetchUrl = (url) => {
        const currentUrl = new URL(url)
        const searchParams = new URLSearchParams(currentUrl.search)
        const paramObject = Object.fromEntries(searchParams)
        setParams(paramObject);
        setFetchUrl(url);
    };

    const handleSort = (sortData) => {
        const queryString = new URLSearchParams(sortData).toString();
        setParams(sortData)
        setFetchUrl(`${import.meta.env.VITE_URL_API}/products?${queryString}`)
    }


    if (error)
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load products.
            </div>
        );

    return (
        <>
            <div className="relative overflow-x-auto shadow-lg rounded-xl bg-white">
                {/* Header: Search + Add Button */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {/* Left Section — Search Input */}
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
            focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />

                        {/* Clear (X) Icon */}
                        <X
                            onClick={handleClearSearch}
                            size={14}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                        />
                    </div>

                    {/* Right Section — Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        {/* Sort Button */}
                        <button
                            onClick={() =>
                                handleSort({ sort_by: "id", sort_direction: "desc" })
                            }
                            className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white text-sm rounded-lg 
            hover:bg-blue-700 transition-colors justify-center"
                        >
                            <FilterIcon size={14} />
                            <p className="text-sm">Default</p>
                        </button>

                        {/* Add Product Button */}
                        <Link
                            to="/dashboard/product/create"
                            className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium 
            px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors justify-center"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New Product</span>
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full text-sm text-left text-gray-800">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-6 py-3 flex items-center gap-2">
                                <div>#</div>
                                <div className='flex flex-col'>
                                    <button className='cursor-pointer' onClick={() => handleSort({ sort_by: 'id', sort_direction: 'asc' })}>
                                        <ChevronUp strokeWidth={6} size={10} />
                                    </button>
                                    <button className='cursor-pointer' onClick={() => handleSort({ sort_by: 'id', sort_direction: 'desc' })}>
                                        <ChevronDown strokeWidth={6} size={10} />
                                    </button>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">Product name</th>
                            <th scope="col" className="px-6 py-3 text-end flex items-center gap-2 justify-end">
                                <div>Price</div>
                                <div className='flex flex-col'>
                                    <button className='cursor-pointer' onClick={() => handleSort({ sort_by: 'price', sort_direction: 'asc' })}>
                                        <ChevronUp strokeWidth={6} size={10} />
                                    </button>
                                    <button className='cursor-pointer' onClick={() => handleSort({ sort_by: 'price', sort_direction: 'desc' })}>
                                        <ChevronDown strokeWidth={6} size={10} />
                                    </button>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-end">Created At</th>
                            <th scope="col" className="px-6 py-3 text-end">Updated At</th>
                            <th scope="col" className="px-6 py-3 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <ProductSkeleton />
                        ) : data?.data?.length === 0 ? (
                            <ProductListEmptyStage />
                        ) : (
                            data?.data?.map((product, index) => (
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
            {
                !isLoading && (
                    <Pagination links={data?.links} meta={data?.meta} updateFetchUrl={updateFetchUrl} />
                )
            }
        </>
    );
};

export default ProductList;
