import { lineSpinner } from "ldrs";
import useSale from "../hooks/useSale";

lineSpinner.register()

const SaleInformation = () => {

    const {onSubmit, handleSubmit, generateInvoiceNumber, errors, register, isSending} = useSale()

    const voucherId = generateInvoiceNumber();

    return (
        <div className="col-span-1">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full" id="infoForm">
                <div className="grid grid-cols-1 gap-5 mb-10">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Voucher ID</label>
                        <input
                            type="text"
                            value={voucherId}
                            disabled
                            {...register("voucher_id")}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className={`block mb-2 text-sm font-medium ${errors.customer_name ? "text-red-500" : "text-gray-900"}`}>
                            Customer Name
                        </label>
                        <input
                            type="text"
                            {...register("customer_name", { required: true })}
                            className={`bg-gray-50 border ${errors.customer_name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        />
                        {errors.customer_name && <p className="text-red-500 text-sm mt-1">Customer Name is required</p>}
                    </div>

                    <div>
                        <label className={`block mb-2 text-sm font-medium ${errors.customer_email ? "text-red-500" : "text-gray-900"}`}>
                            Customer Email
                        </label>
                        <input
                            type="text"
                            {...register("customer_email", { required: true })}
                            className={`bg-gray-50 border ${errors.customer_email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        />
                        {errors.customer_email && <p className="text-red-500 text-sm mt-1">Customer Email is required</p>}
                    </div>

                    <div>
                        <label className={`block mb-2 text-sm font-medium ${errors.sale_date ? "text-red-500" : "text-gray-900"}`}>
                            Sale Date
                        </label>
                        <input
                            type="date"
                            defaultValue={new Date().toISOString().slice(0, 10)}
                            {...register("sale_date", { required: true })}
                            className={`bg-gray-50 border ${errors.sale_date ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        />
                        {errors.sale_date && <p className="text-red-500 text-sm mt-1">Sale Date is required</p>}
                    </div>
                </div>

                <div className="flex flex-col justify-end items-end mt-auto gap-3">
                    <div className="w-full flex items-center justify-between">
                        <label htmlFor="redirect_to_detail" className="me-2 text-sm font-medium text-gray-900">
                            Redirect to Voucher Detail
                        </label>
                        <input
                            {...register("redirect_to_detail")}
                            id="redirect_to_detail"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full flex items-center">
                        <label htmlFor="all-correct" className="me-2 text-sm font-medium text-gray-900">
                            Make sure all fields are correct
                        </label>
                        <input
                            {...register("all_correct")}
                            id="all-correct"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        form="infoForm"
                        disabled={isSending}
                        className="text-white bg-primary inline-flex gap-3 
                         hover:bg-primary/80 focus:ring-4 focus:outline-none 
                         focus:ring-primary/50 font-medium rounded-lg text-sm 
                            w-full sm:w-auto px-5 py-5 text-center transition-colors"
                    >
                        <span>Confirm Voucher</span>
                        {isSending && (
                            <l-line-spinner size="20" stroke="5" speed="0.9" color="white"></l-line-spinner>
                        )}
                    </button>

                </div>
            </form>
        </div>
    );
};

export default SaleInformation;
