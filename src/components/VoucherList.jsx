import { Trash2 } from 'lucide-react'
import React from 'react'
import useSWR from 'swr'
import VoucherListRow from './VoucherListRow';

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherList = () => {

  const { data, isLoading, error } = useSWR(`${import.meta.env.VITE_URL_API}/vouchers`, fetcher)
  
  return (
    <div className="relative overflow-x-auto shadow-lg rounded-xl">
      <table className="w-full text-sm text-left rtl:text-right text-gray-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
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
          
          {data?.length === 0 && (
            <tr className="bg-white border-b border-gray-200">
              <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                There is no Voucher
              </td>
            </tr>
          )}

          {isLoading ? (
            <tr className="bg-white border-b border-gray-200">
              {/* ID column */}
              <td className="px-6 py-4">
                <div className="h-4 w-20 rounded-md bg-gray-200 animate-pulse" />
              </td>


              {/* Name column */}
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <div className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
              </th>


              {/* Email column */}
              <td className="px-6 py-4">
                <div className="h-4 w-56 rounded-md bg-gray-200 animate-pulse" />
              </td>


              {/* Date & Time column (right aligned) */}
              <td className="px-6 py-4 text-end">
                <div className="flex flex-col items-end gap-1">
                  <div className="h-3 w-24 rounded-md bg-gray-200 animate-pulse" />
                  <div className="h-3 w-16 rounded-md bg-gray-200 animate-pulse" />
                </div>
              </td>


              {/* Actions column (button group) */}
              <td className="px-6 py-4 text-end">
                <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
                  <div className="h-8 w-10 rounded bg-gray-200 animate-pulse" />
                </div>
              </td>
            </tr>
          ) : (
              data.map(voucher => <VoucherListRow key={voucher.id} voucher={voucher} />)
          )}
          
        </tbody>
      </table>
    </div>
  )
}

export default VoucherList