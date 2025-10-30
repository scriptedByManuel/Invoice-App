import { PencilIcon, Trash2 } from 'lucide-react'
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { lineSpinner } from 'ldrs'
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import ShowDate from './ShowDate';
lineSpinner.register()


const ProductRow = ({ product: { id, product_name, price, created_at }, index }) => {

    const { mutate } = useSWRConfig()
    const [isDeleting, setIsDeleting] = useState(false)


    const handleDeleteBtn = async () => {
        setIsDeleting(true)
        const res = await fetch(`${import.meta.env.VITE_URL_API}/products/${id}`, {
            method: 'DELETE'
        })
        mutate(import.meta.env.VITE_URL_API + `/products`)
        setIsDeleting(false)
        toast.success('Product deleted successfully')
    }

    return (
        <tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
            <td className="px-6 py-4">
                {index + 1}
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {product_name}
            </th>
            <td className="px-6 py-4 text-end">
                ${price}
            </td>
            <td className="px-6 py-4 text-end">
                <ShowDate timestamp={created_at} />
            </td>
            <td className="px-6 py-4 text-end">
                <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
                    <Link
                        to={`/product/edit/${id}`}
                        aria-label="Edit Product"
                        className="cursor-pointer font-medium text-blue-600 px-3 py-2 hover:bg-gray-50 transition border-r border-gray-300"
                    >
                        <PencilIcon className="w-4 h-4" />
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
                        ) : (<Trash2 className = "w-4 h-4" />)}
                        
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default ProductRow