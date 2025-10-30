import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { lineSpinner } from 'ldrs'
lineSpinner.register()

const ProductCreateCard = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const navigate = useNavigate()
    const [isSending, setIsSending] = useState(false)

    const handleCreateProduct = async (data) => {
        setIsSending(true)
        const url = `${import.meta.env.VITE_URL_API}/products`
        await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_name: data.product_name,
                price: data.price,
                created_at: new Date().toISOString()
            })
        })
        setIsSending(false)
        reset()
        if (data.go_back_after_save) {
            navigate('/product')
        }
        toast.success('Product created successfully')
    }

    return (
        <div className="w-full md:w-1/2 mt-10">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                Create New Product
            </h1>

            <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-4">
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                    </label>
                    <input
                        {...register('product_name', {
                            required: true,
                            minLength: 3,
                            maxLength: 40,
                        })}
                        type="text"
                        placeholder="Enter product name"
                        className={`w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.product_name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border border-gray-300 focus:ring-blue-500'
                            }`}
                    />

                    {errors.product_name?.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1">
                            Product name is required
                        </p>
                    )}
                    {errors.product_name?.type === 'minLength' && (
                        <p className="text-red-500 text-sm mt-1">
                            Product name must be greater than 3 characters
                        </p>
                    )}
                    {errors.product_name?.type === 'maxLength' && (
                        <p className="text-red-500 text-sm mt-1">
                            Product name must be less than 40 characters
                        </p>
                    )}
                </div>

                {/* Product Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Price
                    </label>
                    <input
                        {...register('price', {
                            required: true,
                            min: 100,
                            max: 10000,
                        })}
                        type="number"
                        placeholder="Enter price"
                        className={`w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.price
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border border-gray-300 focus:ring-blue-500'
                            }`}
                    />

                    {errors.price?.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1">
                            Product price is required
                        </p>
                    )}
                    {errors.price?.type === 'min' && (
                        <p className="text-red-500 text-sm mt-1">
                            Product price must be greater than 100
                        </p>
                    )}
                    {errors.price?.type === 'max' && (
                        <p className="text-red-500 text-sm mt-1">
                            Product price must be less than 10000
                        </p>
                    )}
                </div>

                {/* Confirm Fields Checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        {...register('confirm_fields', { required: true })}
                        type="checkbox"
                        id="confirmFields"
                        className={`h-4 w-4 rounded focus:ring-blue-500 ${errors.confirm_fields ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    <label htmlFor="confirmFields" className="cursor-pointer text-sm text-gray-700">
                        Make sure all fields are correct
                    </label>
                </div>
                {errors.confirm_fields && (
                    <p className="text-red-500 text-sm mt-1">
                        Please confirm all fields are correct
                    </p>
                )}

                {/* Go Back After Save Checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        {...register('go_back_after_save')}
                        type="checkbox"
                        id="goBackAfterSave"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="goBackAfterSave" className="cursor-pointer text-sm text-gray-700">
                        Go back to product after saving products
                    </label>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3 pt-4">
                    <button
                        onClick={() => navigate('/product')}
                        type="button"
                        className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSending}
                        className={`cursor-pointer px-4 py-2 rounded-lg text-white transition ${isSending
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isSending ? (
                            <div className='flex items-center gap-3'>
                                <p>Saving</p>
                                <l-line-spinner
                                    size="16"
                                    stroke="1"
                                    speed="1"
                                    color="white"
                                ></l-line-spinner>
                        </div>
                        ) : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductCreateCard
