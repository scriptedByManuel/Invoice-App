import { Search, Trash2, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import useSWR from 'swr';
import VoucherListRow from './VoucherListRow';
import { debounce } from 'lodash';

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherList = () => {

  const searchInput = useRef()
  const [search, setSearch] = useState('')
  const { data, isLoading, error } = useSWR(
    search ? `${import.meta.env.VITE_URL_API}/vouchers?voucher_id_like=${search}` : `${import.meta.env.VITE_URL_API}/vouchers`,
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
        Failed to load vouchers.
      </div>
    );


  return (
    <div className="shadow-lg rounded-xl overflow-hidden bg-white">
      <div className="p-4 flex border-b border-gray-200 bg-gray-50">
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
      </div>


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3">
                Voucher ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* No Voucher Row */}
            {data?.length === 0 && !isLoading && (
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
              data?.map((voucher) => (
                <VoucherListRow key={voucher.id} voucher={voucher} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherList;
