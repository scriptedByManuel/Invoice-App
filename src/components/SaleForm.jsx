import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useRecordStore from "../stores/useRecordStore";
import { toast } from "sonner";
import useCookie from "react-use-cookie";

const SaleForm = () => {
    const [token] = useCookie("my_token");
    const { addRecord, records } = useRecordStore();
    const { register, handleSubmit, reset } = useForm();

    const fetcher = (url) =>
        fetch(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch products");
            return res.json();
        });

    const { data, isLoading, error } = useSWR(
        token ? `${import.meta.env.VITE_URL_API}/products?limit=100` : null,
        fetcher
    );

    const onSubmit = (data) => {
        const currentProduct = JSON.parse(data.product);
        const currentProductId = currentProduct.id;

        const isExited = records.find(
            ({ product: { id } }) => currentProductId === id
        );

        if (!isExited) {
            const record = {
                id: Date.now(),
                product: currentProduct,
                product_id: currentProductId,
                quantity: Number(data.quantity),
                cost: currentProduct.price * Number(data.quantity),
                created_at: new Date().toISOString(),
            };
            addRecord(record);
            toast.success("Product added successfully");
        } else {
            toast.warning("This product is already in the list");
        }

        reset();
    };

    if (error) {
        return (
            <div className="bg-white p-5 rounded-lg border border-gray-200 mb-5">
                <p className="text-red-500">⚠️ Failed to load products. Try again later.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-5">
            <form id="recordForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-5 gap-5 items-end">
                    <div className="col-span-2">
                        <label
                            htmlFor="productSelect"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Select Your Product
                        </label>
                        <select
                            id="productSelect"
                            {...register("product")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[42px]"
                            required
                            disabled={isLoading}
                        >
                            <option value="">
                                {isLoading ? "Loading products..." : "Select a product"}
                            </option>
                            {!isLoading &&
                                data?.data?.map((product) => (
                                    <option key={product.id} value={JSON.stringify(product)}>
                                        {product.product_name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label
                            htmlFor="quantityInput"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantityInput"
                            {...register("quantity")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[42px]"
                            required
                            min="1"
                        />
                    </div>

                    <div className="col-span-1 flex items-end">
                        <button
                            type="submit"
                            className="text-blue-700 w-full h-[42px] flex justify-center items-center 
                        hover:text-white border border-blue-700 hover:bg-blue-800 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                        font-medium rounded-lg text-sm text-center"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SaleForm;
