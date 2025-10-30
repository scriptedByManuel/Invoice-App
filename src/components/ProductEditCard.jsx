import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { lineSpinner } from "ldrs";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

lineSpinner.register();

const fetcher = (...args) => fetch(...args).then(res => res.json())

const ProductEditCard = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useSWR(
        import.meta.env.VITE_URL_API + `/products/${id}`,
        fetcher
    );
    const { mutate } = useSWRConfig()

    const [isSending, setIsSending] = useState(false);

    const handleEditProduct = async (data) => {
        setIsSending(true);

        await fetch(`${import.meta.env.VITE_URL_API}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_name: data.product_name,
                price: data.price,
                created_at: new Date().toISOString(),
            }),
        });

        mutate(import.meta.env.VITE_URL_API + "/products/");
        mutate(`${import.meta.env.VITE_URL_API}/products/${id}`);
        setIsSending(false);
        reset();
        toast.success("Product updated successfully");
        navigate("/product");
    };

    return (
        <div className="rounded-lg w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-3">Edit Product</h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <l-line-spinner size="60" stroke="3" speed="1" color="#2563eb"></l-line-spinner>
                </div>
            ) : (
                <form onSubmit={handleSubmit(handleEditProduct)}>
                    {/* Product Name */}
                    <div className="mb-5">
                        <label
                            htmlFor="product_name"
                            className={`block mb-2 text-sm font-medium ${errors.product_name ? "text-red-500" : "text-gray-900"
                                }`}
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            {...register("product_name", {
                                required: true,
                                minLength: 3,
                                maxLength: 40,
                            })}
                            defaultValue={data?.product_name}
                            className={`bg-gray-50 border ${errors.product_name
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                            placeholder="eg. apple"
                        />
                        {errors.product_name?.type === "required" && (
                            <p className="text-red-500 text-sm mt-1">
                                Product name is required
                            </p>
                        )}
                        {errors.product_name?.type === "minLength" && (
                            <p className="text-red-500 text-sm mt-1">
                                Product name must be greater than 3 characters
                            </p>
                        )}
                        {errors.product_name?.type === "maxLength" && (
                            <p className="text-red-500 text-sm mt-1">
                                Product name must be less than 40 characters
                            </p>
                        )}
                    </div>

                    {/* Product Price */}
                    <div className="mb-8">
                        <label
                            htmlFor="price"
                            className={`block mb-2 text-sm font-medium ${errors.price ? "text-red-500" : "text-gray-900"
                                }`}
                        >
                            Product Price
                        </label>
                        <input
                            type="number"
                            {...register("price", {
                                required: true,
                                min: 100,
                                max: 10000,
                            })}
                            defaultValue={data?.price}
                            className={`bg-gray-50 border ${errors.price
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                            placeholder="eg. 500"
                        />
                        {errors.price?.type === "required" && (
                            <p className="text-red-500 text-sm mt-1">
                                Product price is required
                            </p>
                        )}
                        {errors.price?.type === "min" && (
                            <p className="text-red-500 text-sm mt-1">
                                Product price must be greater than 100
                            </p>
                        )}
                        {errors.price?.type === "max" && (
                            <p className="text-red-500 text-sm mt-1">
                                Product price must be less than 10000
                            </p>
                        )}
                    </div>

                    {/* Confirm Checkbox */}
                    <div className="flex items-center mb-6">
                        <input
                            {...register("all_correct")}
                            required
                            id="all-correct"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                            htmlFor="all-correct"
                            className="ms-2 text-sm font-medium text-gray-900"
                        >
                            Make sure all fields are correct
                        </label>
                    </div>

                    {/* Buttons */}
                    <Link
                        to="/product"
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 inline-flex gap-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                            {isSending ? (
                                <div className='flex items-center gap-3'>
                                    <p>Updating</p>
                                    <l-line-spinner
                                        size="16"
                                        stroke="1"
                                        speed="1"
                                        color="white"
                                    ></l-line-spinner>
                                </div>
                            ) : 'Update Product'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductEditCard;
