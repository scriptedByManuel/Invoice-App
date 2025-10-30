import { lineSpinner } from 'ldrs'
import { Minus, Plus, Trash2 } from 'lucide-react'
import useRecordStore from '../stores/useRecordStore'
import { toast } from 'sonner'

const VoucherTableRow = ({ record: { product: { product_name, price }, id, quantity, cost }, index }) => {

    const { removeRecord, changeQuantity } = useRecordStore()

    const handleDeleteBtn = () => {
        removeRecord(id)
    }

    const handleIncreaseBtn = () => {
        changeQuantity(id, 1)
    }

    const handleDecreaseBtn = () => {
        if (quantity > 1) {
            changeQuantity(id, -1)
        }
    }

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-end">{price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-end">
                <div className="flex justify-end items-center gap-2">
                    <button
                        onClick={handleDecreaseBtn}
                        type="button"
                        className="p-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                        <Minus size={16} className="text-gray-600" />
                    </button>
                    <span className="w-6 text-center text-gray-800">{quantity}</span>
                    <button
                        onClick={handleIncreaseBtn}
                        type="button"
                        className="p-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                        <Plus size={16} className="text-gray-600" />
                    </button>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-end">{cost}</td>
            <td className="px-6 py-4 whitespace-nowrap text-end flex justify-end">
                <button
                    onClick={handleDeleteBtn}
                    aria-label="Delete Product"
                    className="cursor-pointer flex items-center justify-center rounded-lg border border-gray-300  font-medium text-red-600 px-3 py-2 hover:bg-gray-50 transition"
                >

                    <Trash2 className="w-4 h-4" />

                </button>
            </td>
        </tr>
    )
}

export default VoucherTableRow