import { ChevronDown, ChevronUp, FilterIcon, Search, X } from 'lucide-react';
import VoucherRow from './VoucherRow';
import Pagination from '../../../components/Pagination';
import useVoucher from '../hooks/useVoucher';
import VoucherSkeletonLoader from './VoucherSkeletonLoader';
import VoucherEmptyStage from './VoucherEmptyStage';

const VoucherList = () => {
    
    const {data, isLoading, error, searchInput, handleSearch, handleClearSearch, handleSort, updateFetchUrl} = useVoucher()

    if (error)
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load vouchers.
            </div>
        );

    return (
        <>
            <div className="shadow-lg rounded-xl overflow-hidden bg-white">
                {/* Header */}
                <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-gray-50">
                    {/* Search */}
                    <div className="relative w-full sm:w-1/3">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />

                        <input
                            ref={searchInput}
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search"
                            className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg 
              focus:ring-primary focus:border-primary bg-gray-50"
                        />

                        <X
                            onClick={handleClearSearch}
                            size={14}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer bg-gray-50"
                        />
                    </div>

                    {/* Default Button */}
                    <button
                        onClick={() => handleSort({ sort_by: "id", sort_direction: "desc" })}
                        className="px-4 py-2 flex items-center gap-2 bg-primary text-white rounded-lg hover:bg-primary/80"
                    >
                        <FilterIcon size={14} />
                        <p className="text-sm">Default</p>
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-800">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-10">
                            <tr>
                                <th scope="col" className="px-6 py-3 flex items-center gap-2">
                                    <div>#</div>
                                    <div className="flex flex-col">
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleSort({ sort_by: "id", sort_direction: "asc" })}
                                        >
                                            <ChevronUp strokeWidth={6} size={10} />
                                        </button>
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleSort({ sort_by: "id", sort_direction: "desc" })}
                                        >
                                            <ChevronDown strokeWidth={6} size={10} />
                                        </button>
                                    </div>
                                </th>

                                <th scope="col" className="px-6 py-3">Voucher ID</th>
                                <th scope="col" className="px-6 py-3">Customer</th>

                                <th scope="col" className="px-6 py-3 justify-end flex items-center gap-2 text-end">
                                    <div>Total</div>
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => handleSort({ sort_by: "total", sort_direction: "asc" })}
                                            className="cursor-pointer"
                                        >
                                            <ChevronUp strokeWidth={6} size={10} />
                                        </button>
                                        <button
                                            onClick={() => handleSort({ sort_by: "total", sort_direction: "desc" })}
                                            className="cursor-pointer"
                                        >
                                            <ChevronDown strokeWidth={6} size={10} />
                                        </button>
                                    </div>
                                </th>

                                <th scope="col" className="px-6 py-3 text-end">Created At</th>
                                <th scope="col" className="px-6 py-3 text-end">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* No Vouchers */}
                            {data?.data?.length === 0 && !isLoading && (
                               <VoucherEmptyStage />
                            )}

                            {/* Loading Skeleton */}
                            {isLoading
                                ? <VoucherSkeletonLoader />
                                : data?.data?.map((voucher) => (
                                    <VoucherRow key={voucher.id} voucher={voucher} />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {!isLoading && (
                <Pagination links={data?.links} meta={data?.meta} updateFetchUrl={updateFetchUrl} />
            )}
        </>
    );
};

export default VoucherList;
