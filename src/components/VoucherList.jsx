import { ChevronDown, ChevronUp, FilterIcon, Search, Trash2, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import useSWR from 'swr';
import VoucherListRow from './VoucherListRow';
import { debounce } from 'lodash';
import useCookie from 'react-use-cookie';
import Pagination from './Pagination';
import { useLocation, useSearchParams } from 'react-router-dom';


const VoucherList = () => {
  const location = useLocation()
  const [params, setParams] = useSearchParams()

  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_URL_API + "/vouchers" + location.search
  );

  const [token] = useCookie('my_token')

  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  const searchInput = useRef()

  const handleSearch = debounce(e => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(
        `${import.meta.env.VITE_URL_API}/vouchers?q=${e.target.value}`
      );
    } else {
      setParams({});
      setFetchUrl(`${import.meta.env.VITE_URL_API}/vouchers`);
    }
  }, 500)

  const handleClearSearch = () => {
    searchInput.current.value = ''
    setParams({});
    setFetchUrl(`${import.meta.env.VITE_URL_API}/vouchers`);
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
    setFetchUrl(`${import.meta.env.VITE_URL_API}/vouchers?${queryString}`)
  }


  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load vouchers.
      </div>
    );


  return (
    <>
      <div className="shadow-lg rounded-xl overflow-hidden bg-white">
        <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-gray-50">
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

          <button onClick={() => handleSort({sort_by: 'id', sort_direction: 'desc'})} className='px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-lg'>
            <FilterIcon size={14} />
            <p className='text-sm'>Default</p>
          </button>
        </div>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 flex items-center gap-2">
                  <div>#</div>
                  <div className='flex flex-col'>
                    <button className='cursor-pointer' onClick={() => handleSort({ sort_by: 'id', sort_direction: 'asc'})}>
                      <ChevronUp strokeWidth={6} size={10} />
                    </button>
                    <button className='cursor-pointer' onClick={() => handleSort({ sort_by: 'id', sort_direction: 'desc' })}>
                      <ChevronDown strokeWidth={6} size={10} />
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Voucher ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 justify-end flex items-center gap-2 text-end">
                  <div>Total</div>
                  <div className='flex flex-col'>
                    <button className='cursor-pointer' onClick={() => handleSort({ sort_by: 'total', sort_direction: 'asc' })}>
                      <ChevronUp strokeWidth={6} size={10} />
                    </button>
                    <button className='cursor-pointer' onClick={() => handleSort({ sort_by: 'total', sort_direction: 'desc' })}>
                      <ChevronDown strokeWidth={6} size={10} />
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-end">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* No Voucher Row */}
              {data?.data?.length === 0 && !isLoading && (
                <tr className="bg-white border-b border-gray-200">
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    There is no Voucher
                  </td>
                </tr>
              )}

              {/* Loading State */}
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 rounded-md bg-gray-200 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-56 rounded-md bg-gray-200 animate-pulse" />
                    </td>
                    <td className="px-6 py-4 text-end">
                      <div className="flex flex-col items-end gap-1">
                        <div className="h-3 w-24 rounded-md bg-gray-200 animate-pulse" />
                        <div className="h-3 w-16 rounded-md bg-gray-200 animate-pulse" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-end">
                      <div className="h-8 w-10 rounded bg-gray-200 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : (
                data?.data?.map((voucher) => (
                  <VoucherListRow key={voucher.id} voucher={voucher} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {
        !isLoading && (
          <Pagination links={data?.links} meta={data?.meta} updateFetchUrl={updateFetchUrl} />
        )
      }
    </>
  );
};

export default VoucherList;
