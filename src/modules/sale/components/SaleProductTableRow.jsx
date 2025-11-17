import { Minus, Plus, Trash2 } from "lucide-react";
import useRecordStore from "../../../stores/useRecordStore";

const SaleProductTableRow = ({
    record: {
        product: { product_name, price },
        id,
        quantity,
        cost,
    },
    index,
}) => {
    const { removeRecord, changeQuantity } = useRecordStore();

    const handleDeleteBtn = () => removeRecord(id);
    const handleIncreaseBtn = () => changeQuantity(id, 1);
    const handleDecreaseBtn = () => quantity > 1 && changeQuantity(id, -1);

    return (
        <tr className="hover:bg-muted/40 transition">
            <td className="px-6 py-4">{index + 1}</td>

            <td className="px-6 py-4 font-medium text-foreground">
                {product_name}
            </td>

            <td className="px-6 py-4 text-end text-foreground">
                {price}
            </td>

            {/* Quantity Controls */}
            <td className="px-6 py-4">
                <div className="flex justify-end items-center gap-2">

                    {/* Decrease */}
                    <button
                        onClick={handleDecreaseBtn}
                        type="button"
                        className="p-1.5 rounded-lg border border-border hover:bg-muted transition"
                    >
                        <Minus size={16} className="text-foreground" />
                    </button>

                    <span className="w-6 text-center font-medium text-foreground">
                        {quantity}
                    </span>

                    {/* Increase */}
                    <button
                        onClick={handleIncreaseBtn}
                        type="button"
                        className="p-1.5 rounded-lg border border-border hover:bg-muted transition"
                    >
                        <Plus size={16} className="text-foreground" />
                    </button>
                </div>
            </td>

            {/* Cost */}
            <td className="px-6 py-4 text-end font-medium text-foreground">
                {cost.toFixed(2)}
            </td>

            {/* Delete Button */}
            <td className="px-6 py-4 text-end">
                <button
                    onClick={handleDeleteBtn}
                    aria-label="Delete Product"
                    className="
                        flex items-center justify-center
                        px-3 py-2 rounded-lg border border-border
                        text-red-600 hover:bg-red-50
                        transition
                    "
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </td>
        </tr>
    );
};

export default SaleProductTableRow;
