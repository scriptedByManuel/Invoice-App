import { Trash2 } from 'lucide-react'
import ShowDate from './ShowDate'
import { toast } from 'sonner'
import { lineSpinner } from 'ldrs'
import { useState } from 'react'
import { mutate, useSWRConfig } from 'swr'
lineSpinner.register()

const VoucherListRow = ({ voucher: { id, voucher_id, customer_name, customer_email, created_at } }) => {
    
    const [isDeleting, setIsDeleting] = useState(false)

    const { mutate } = useSWRConfig()
    
    const handleDeleteBtn = async () => {
        setIsDeleting(true)
        await fetch(`${import.meta.env.VITE_URL_API}/vouchers/${id}`, {
            method: 'DELETE'
        })
        mutate(import.meta.env.VITE_URL_API + `/vouchers`)
        setIsDeleting(false)
        toast.success('Voucher deleted successfully')
    }

  return (
      <tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
          <td className="px-6 py-4">
              {voucher_id}
          </td>
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {customer_name}
          </th>
          <td className="px-6 py-4 ">
              {customer_email}
          </td>
          <td className="px-6 py-4 text-end">
              <ShowDate timestamp={created_at} />
          </td>
          <td className="px-6 py-4 text-end">
              <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">

                  <button
                      onClick={handleDeleteBtn}
                      aria-label="Delete Product"
                      className="cursor-pointer  font-medium text-red-600 px-3 py-2 hover:bg-gray-50 transition"
                  >
                      {isDeleting ? (
                          <l-line-spinner
                              size="16"
                              stroke="1"
                              speed="1"
                              color="red"
                          ></l-line-spinner>
                      ) : (<Trash2 className="w-4 h-4" />)}

                  </button>
              </div>
          </td>
      </tr>
  )
}

export default VoucherListRow