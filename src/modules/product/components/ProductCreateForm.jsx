import { lineSpinner } from 'ldrs'
import useCreateProduct from '../hooks/useCreateProduct'
lineSpinner.register()

const ProductCreateForm = () => {
    const {handleCreateProduct, errors, handleSubmit, register, isSending} = useCreateProduct()

    return (
        <div className="w-full md:w-1/2 mt-10 font-[Montserrat]">

            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Create New Product
            </h1>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-5">

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            {...register('product_name', { required: true, minLength: 3, maxLength: 40 })}
                            type="text"
                            placeholder="Enter product name"
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary transition
                                ${errors.product_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                        />
                        {errors.product_name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.product_name.type === "required" && "Product name is required"}
                                {errors.product_name.type === "minLength" && "Must be at least 3 characters"}
                                {errors.product_name.type === "maxLength" && "Must be less than 40 characters"}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Price
                        </label>
                        <input
                            {...register('price', { required: true, min: 1000, max: 10000000 })}
                            type="number"
                            placeholder="Enter price"
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary transition
                                ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price.type === "required" && "Product price is required"}
                                {errors.price.type === "min" && "Price must be greater than 1000"}
                                {errors.price.type === "max" && "Price must be less than 10000000"}
                            </p>
                        )}
                    </div>

                    {/* Confirm Fields */}
                    <div className="flex items-center gap-3">
                        <input
                            {...register('confirm_fields', { required: true })}
                            type="checkbox"
                            id="confirmFields"
                            className="h-4 w-4 rounded border-gray-300 focus:ring-primary"
                        />
                        <label htmlFor="confirmFields" className="text-gray-700 text-sm cursor-pointer">
                            Make sure all fields are correct
                        </label>
                    </div>
                    {errors.confirm_fields && (
                        <p className="text-red-500 text-sm">
                            Please confirm all fields are correct
                        </p>
                    )}

                    {/* Go Back Checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            {...register('go_back_after_save')}
                            type="checkbox"
                            id="goBackAfterSave"
                            className="h-4 w-4 rounded border-gray-300 focus:ring-primary"
                        />
                        <label htmlFor="goBackAfterSave" className="text-gray-700 text-sm cursor-pointer">
                            Go back to product after saving
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/product')}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSending}
                            className={`px-5 py-2 rounded-lg font-medium text-white transition ${isSending ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}`}
                        >
                            {isSending ? (
                                <div className="flex items-center gap-2">
                                    <span>Saving</span>
                                    <l-line-spinner size="16" stroke="1" speed="1" color="white"></l-line-spinner>
                                </div>
                            ) : 'Save Product'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ProductCreateForm
