import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { toast } from "sonner";
import useCookie from "react-use-cookie";
import { fetchProducts } from "../../../services/product";
import useRecordStore from "../../../stores/useRecordStore";

const ProductSelectForm = () => {
    const [token] = useCookie("my_token");
    const { addRecord, records } = useRecordStore();
    const { register, handleSubmit, reset } = useForm();

    const fetcher = (url) =>
        fetch(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());

    const { data, isLoading, error } = useSWR(
        token ? `${import.meta.env.VITE_URL_API}/products?limit=100` : null,
        fetchProducts
    );

    const onSubmit = (formData) => {
        const product = JSON.parse(formData.product);

        const exists = records.some((r) => r.product.id === product.id);

        if (exists) {
            toast.warning("This product is already in the list");
            return reset();
        }

        addRecord({
            id: Date.now(),
            product,
            product_id: product.id,
            quantity: Number(formData.quantity),
            cost: product.price * Number(formData.quantity),
            created_at: new Date().toISOString(),
        });

        toast.success("Product added successfully");
        reset();
    };

    if (error) {
        return (
            <div className="bg-white p-5 rounded-lg border border-gray-200 mb-5">
                <p className="text-red-500 font-semibold">
                    ⚠️ Failed to load products
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-5 gap-5 items-end">

                    {/* Product Select */}
                    <div className="col-span-2">
                        <label
                            htmlFor="productSelect"
                            className="block mb-2 text-sm font-medium text-gray-800"
                        >
                            Product
                        </label>

                        <select
                            id="productSelect"
                            {...register("product")}
                            required
                            disabled={isLoading}
                            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg 
                            focus:ring-primary focus:border-primary block w-full p-2.5 h-[42px]"
                        >
                            <option value="">
                                {isLoading ? "Loading..." : "Select product"}
                            </option>

                            {!isLoading &&
                                data?.data?.map((p) => (
                                    <option key={p.id} value={JSON.stringify(p)}>
                                        {p.product_name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2">
                        <label
                            htmlFor="quantityInput"
                            className="block mb-2 text-sm font-medium text-gray-800"
                        >
                            Quantity
                        </label>

                        <input
                            id="quantityInput"
                            type="number"
                            min="1"
                            required
                            {...register("quantity")}
                            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg 
                            focus:ring-primary focus:border-primary block w-full p-2.5 h-[42px]"
                        />
                    </div>

                    {/* Add Button */}
                    <div className="col-span-1 flex items-end">
                        <button
                            type="submit"
                            className="cursor-pointer w-full h-[42px] flex justify-center items-center 
                            text-primary border border-primary 
                            hover:bg-primary hover:text-white 
                            transition duration-200 font-medium rounded-lg text-sm"
                        >
                            Add
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default ProductSelectForm;
