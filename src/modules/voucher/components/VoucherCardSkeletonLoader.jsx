import React from "react";

const VoucherCardSkeletonLoader = () => {
    return (
        <div
            id="printArea"
            className="w-[14.8cm] bg-white p-6 text-gray-900 animate-pulse"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="h-8 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="text-right text-sm space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded ml-auto" />
                    <div className="h-4 w-32 bg-gray-200 rounded ml-auto" />
                    <div className="h-4 w-24 bg-gray-200 rounded ml-auto" />
                </div>
            </div>

            {/* Table */}
            <table className="w-full mb-6 text-sm">
                <thead>
                    <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 w-8">No</th>
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2 w-12">Qty</th>
                        <th className="text-right py-2 w-20">Price</th>
                        <th className="text-right py-2 w-20">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-b border-gray-200">
                            <td className="py-2">
                                <div className="h-4 w-6 bg-gray-200 rounded" />
                            </td>
                            <td className="py-2">
                                <div className="h-4 w-40 bg-gray-200 rounded" />
                            </td>
                            <td className="py-2 text-right">
                                <div className="h-4 w-10 bg-gray-200 rounded ml-auto" />
                            </td>
                            <td className="py-2 text-right">
                                <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
                            </td>
                            <td className="py-2 text-right">
                                <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="text-sm">
                    <tr className="border-t border-gray-300">
                        <td colSpan={4} className="py-2 text-right font-medium">
                            <div className="h-4 w-20 bg-gray-200 rounded ml-auto" />
                        </td>
                        <td className="py-2 text-right font-medium">
                            <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="py-1 text-right">
                            <div className="h-4 w-20 bg-gray-200 rounded ml-auto" />
                        </td>
                        <td className="py-1 text-right">
                            <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
                        </td>
                    </tr>
                    <tr className="border-t border-gray-300">
                        <td colSpan={4} className="py-2 text-right font-semibold">
                            <div className="h-4 w-24 bg-gray-200 rounded ml-auto" />
                        </td>
                        <td className="py-2 text-right font-semibold">
                            <div className="h-4 w-20 bg-gray-200 rounded ml-auto" />
                        </td>
                    </tr>
                </tfoot>
            </table>

            {/* Footer */}
            <div className="border-t border-gray-300 pt-3">
                <div className="h-4 w-48 bg-gray-200 rounded mx-auto mt-2" />
            </div>
        </div>
    );
};

export default VoucherCardSkeletonLoader;