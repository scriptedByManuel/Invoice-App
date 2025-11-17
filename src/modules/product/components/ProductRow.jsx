import { PencilIcon, Trash2 } from 'lucide-react'
import { useState } from 'react';
import { lineSpinner } from 'ldrs'
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import useCookie from "react-use-cookie";
import ShowDate from '../../../components/ShowDate';
import { useSWRConfig } from 'swr';

lineSpinner.register();

const ProductRow = ({ product: { id, product_name, price, created_at, updated_at }, index }) => {
    const [token] = useCookie('my_token');
    const { mutate } = useSWRConfig();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteBtn = async () => {
        setIsDeleting(true);
        const res = await fetch(`${import.meta.env.VITE_URL_API}/products/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        setIsDeleting(false);
        const swrKey = `${import.meta.env.VITE_URL_API}/products`;
        mutate(swrKey);
        toast.success('Product deleted successfully');
    };

    return (
        <tr className="bg-card border-b border-border hover:bg-muted transition">
            <td className="px-6 py-4 text-foreground">
                {id}
            </td>

            <th className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                {product_name}
            </th>

            <td className="px-6 py-4 text-end text-foreground">
                ${price}
            </td>

            <td className="px-6 py-4 text-end text-secondary">
                <ShowDate timestamp={created_at} />
            </td>

            <td className="px-6 py-4 text-end text-secondary">
                <ShowDate timestamp={updated_at} />
            </td>

            <td className="px-6 py-4 text-end">
                <div className="inline-flex rounded-lg border border-border overflow-hidden">

                    {/* Edit Button */}
                    <Link
                        to={`/dashboard/product/edit/${id}`}
                        aria-label="Edit Product"
                        className="cursor-pointer text-primary px-3 py-2 hover:bg-muted/70 transition border-r border-border"
                    >
                        <PencilIcon className="w-4 h-4" />
                    </Link>

                    {/* Delete Button */}
                    <button
                        onClick={handleDeleteBtn}
                        aria-label="Delete Product"
                        className="cursor-pointer text-destructive px-3 py-2 hover:bg-muted/70 transition"
                    >
                        {isDeleting ? (
                            <l-line-spinner
                                size="16"
                                stroke="1"
                                speed="1"
                                color="red"
                            ></l-line-spinner>
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                    </button>

                </div>
            </td>
        </tr>
    );
};

export default ProductRow;
