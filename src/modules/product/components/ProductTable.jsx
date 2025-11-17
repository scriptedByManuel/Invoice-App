import { ChevronDown, ChevronUp, FilterIcon, Plus, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductListEmptyStage from './ProductListEmptyStage';
import Pagination from '../../../components/Pagination';
import ProductSkeletonLoader from './ProductSkeletonLoader';
import ProductRow from './ProductRow';
import useProduct from '../hooks/useProduct';

const ProductTable = () => {
   const {data, error, isLoading, searchInput, handleSearch, updateFetchUrl, handleClearSearch, handleSort} = useProduct()

    if (error)
        return (
            <div className="p-6 text-center text-destructive">
                Failed to load products.
            </div>
        );

    return (
        <>
            <div className="relative overflow-x-auto shadow rounded-xl bg-card border border-border">
                {/* Header: Search + Add Button */}
                <div className="p-4 border-b border-border bg-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {/* Left Section — Search Input */}
                    <div className="relative w-full sm:w-1/3">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
                        />

                        <input
                            ref={searchInput}
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search"
                            className="w-full pl-9 pr-10 py-2 text-sm border border-border rounded-lg 
                                bg-card text-foreground focus:ring-primary focus:border-primary"
                        />

                        <X
                            onClick={handleClearSearch}
                            size={14}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary cursor-pointer hover:text-primary"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">

                        <button
                            onClick={() =>
                                handleSort({ sort_by: "id", sort_direction: "desc" })
                            }
                            className="cursor-pointer px-4 py-2 flex items-center gap-2 bg-primary text-white text-sm rounded-lg 
                                hover:opacity-90 transition justify-center"
                        >
                            <FilterIcon size={14} />
                            <p>Default</p>
                        </button>

                        <Link
                            to="/dashboard/product/create"
                            className="flex items-center gap-2 bg-primary text-white text-sm font-medium 
                                px-4 py-2 rounded-lg hover:opacity-90 transition justify-center"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New Product</span>
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full text-sm text-foreground">
                    <thead className="text-xs text-secondary uppercase bg-muted border-b border-border sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 flex items-center gap-2">
                                <div>#</div>
                                <div className="flex flex-col">
                                    <button onClick={() => handleSort({ sort_by: 'id', sort_direction: 'asc' })}>
                                        <ChevronUp strokeWidth={6} size={10} />
                                    </button>
                                    <button onClick={() => handleSort({ sort_by: 'id', sort_direction: 'desc' })}>
                                        <ChevronDown strokeWidth={6} size={10} />
                                    </button>
                                </div>
                            </th>

                            <th className="px-6 py-3">Product name</th>

                            <th className="px-6 py-3 text-end flex items-center gap-2 justify-end">
                                <div>Price</div>
                                <div className="flex flex-col">
                                    <button onClick={() => handleSort({ sort_by: 'price', sort_direction: 'asc' })}>
                                        <ChevronUp strokeWidth={6} size={10} />
                                    </button>
                                    <button onClick={() => handleSort({ sort_by: 'price', sort_direction: 'desc' })}>
                                        <ChevronDown strokeWidth={6} size={10} />
                                    </button>
                                </div>
                            </th>

                            <th className="px-6 py-3 text-end">Created At</th>
                            <th className="px-6 py-3 text-end">Updated At</th>
                            <th className="px-6 py-3 text-end">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <ProductSkeletonLoader />
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

            {!isLoading && (
                <Pagination
                    links={data?.links}
                    meta={data?.meta}
                    updateFetchUrl={updateFetchUrl}
                />
            )}
        </>
    );
};

export default ProductTable;
