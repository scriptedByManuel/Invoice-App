import { ChevronRight, Trash2 } from 'lucide-react'
import ShowDate from './ShowDate'
import { toast } from 'sonner'
import { lineSpinner } from 'ldrs'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { Link } from 'react-router-dom'
import useCookie from 'react-use-cookie';
lineSpinner.register()

const VoucherListRow = ({ voucher: { id, voucher_id, customer_name, customer_email, created_at, total } }) => {

    const [token] = useCookie('my_token')

    const [isDeleting, setIsDeleting] = useState(false)

    const { mutate } = useSWRConfig()

    const handleDeleteBtn = async () => {
        setIsDeleting(true)
        await fetch(`${import.meta.env.VITE_URL_API}/vouchers/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        mutate(import.meta.env.VITE_URL_API + `/vouchers`)
        setIsDeleting(false)
        toast.success('Voucher deleted successfully')
    }

    return (
        <tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
            <td className="px-6 py-4">
                {id}
            </td>
            <td className="px-6 py-4 text-nowrap">
                {voucher_id}
            </td>
            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                <div>
                    <p className='font-semibold'> {customer_name}</p>
                    <p className='text-gray-600 text-xs'> {customer_email}</p>
                </div>
               
            </th>
            <td className="px-6 py-4 text-end">
               {total}
            </td>
            <td className="px-6 py-4 text-end">
                <ShowDate timestamp={created_at} />
            </td>
            <td className="px-6 py-4 text-end">
                <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
                    <Link
                        to={`voucher-detail/${id}`}
                        aria-label="Edit Product"
                        className="cursor-pointer font-medium text-blue-600 px-3 py-2 hover:bg-gray-50 transition border-r border-gray-300"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
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