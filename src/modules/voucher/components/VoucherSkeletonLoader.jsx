import React from "react";

const VoucherSkeletonLoader = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="bg-white border-b border-gray-200">
                    {/* ID */}
                    <td className="px-6 py-4">
                        <div className="h-4 w-12 rounded-md bg-gray-200 animate-pulse" />
                    </td>

                    {/* Voucher ID */}
                    <td className="px-6 py-4">
                        <div className="h-4 w-32 rounded-md bg-gray-200 animate-pulse" />
                    </td>

                    {/* Customer Name + Email */}
                    <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
                            <div className="h-3 w-28 rounded-md bg-gray-200 animate-pulse" />
                        </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 text-end">
                        <div className="h-4 w-20 rounded-md bg-gray-200 animate-pulse ml-auto" />
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 text-end">
                        <div className="h-4 w-24 rounded-md bg-gray-200 animate-pulse ml-auto" />
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-end">
                        <div className="flex justify-end gap-3">
                            <div className="h-8 w-8 rounded-md bg-gray-200 animate-pulse" />
                            <div className="h-8 w-8 rounded-md bg-gray-200 animate-pulse" />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default VoucherSkeletonLoader;
