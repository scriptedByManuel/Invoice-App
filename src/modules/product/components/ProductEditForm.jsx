import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lineSpinner } from "ldrs";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import useCookie from "react-use-cookie";
import ProductEditSkeletonLoader from "./ProductEditSkeletonLoader";
import useEditProduct from "../hooks/useEditProduct";

lineSpinner.register();

const ProductEditForm = () => {
    const { data, isLoading, errors, isSending, register, handleSubmit, handleEditProduct } = useEditProduct()

    return (
        <div className="w-full md:w-1/2 font-[Montserrat] mt-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h1>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                {isLoading ? (
                    <ProductEditSkeletonLoader />
                ) : (
                    <form onSubmit={handleSubmit(handleEditProduct)} className="space-y-5">

                        {/* Product Name */}
                        <div>
                            <label className={`block mb-2 text-sm font-medium ${errors.product_name ? "text-red-500" : "text-gray-900"}`}>
                                Product Name
                            </label>
                            <input
                                type="text"
                                {...register("product_name", { required: true, minLength: 3, maxLength: 40 })}
                                defaultValue={data?.data?.product_name}
                                className={`w-full p-2.5 rounded-lg text-gray-900 border focus:outline-none focus:ring-2 focus:ring-primary transition ${errors.product_name ? "border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                                placeholder="Enter product name"
                            />
                            {errors.product_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.product_name.type === "required" && "Product name is required"}
                                    {errors.product_name.type === "minLength" && "Must be at least 3 characters"}
                                    {errors.product_name.type === "maxLength" && "Must be less than 40 characters"}
                                </p>
                            )}
                        </div>

                        {/* Product Price */}
                        <div>
                            <label className={`block mb-2 text-sm font-medium ${errors.price ? "text-red-500" : "text-gray-900"}`}>
                                Product Price
                            </label>
                            <input
                                type="number"
                                {...register("price", { required: true, min: 1000, max: 10000000 })}
                                defaultValue={data?.data?.price}
                                className={`w-full p-2.5 rounded-lg text-gray-900 border focus:outline-none focus:ring-2 focus:ring-primary transition ${errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                                placeholder="Enter product price"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.price.type === "required" && "Product price is required"}
                                    {errors.price.type === "min" && "Price must be greater than 1000"}
                                    {errors.price.type === "max" && "Price must be less than 10000000"}
                                </p>
                            )}
                        </div>

                        {/* Confirm Checkbox */}
                        <div className="flex items-center gap-3">
                            <input
                                {...register("all_correct")}
                                required
                                id="all-correct"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="all-correct" className="text-gray-900 text-sm font-medium cursor-pointer">
                                Make sure all fields are correct
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Link
                                to="/dashboard/product"
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-900 bg-white hover:bg-gray-100 transition font-medium"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={isSending}
                                className={`px-5 py-2 rounded-lg font-medium text-white transition ${isSending ? "bg-primary/60 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"}`}
                            >
                                {isSending ? (
                                    <div className="flex items-center gap-2">
                                        <span>Updating</span>
                                        <l-line-spinner size="16" stroke="1" speed="1" color="white"></l-line-spinner>
                                    </div>
                                ) : (
                                    "Update Product"
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProductEditForm;
