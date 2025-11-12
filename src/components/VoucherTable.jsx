import React from "react";
import useRecordStore from "../stores/useRecordStore";
import VoucherTableRow from "./VoucherTableRow";

const VoucherTable = () => {
    const { records } = useRecordStore()

    const total = records.reduce((pv, cv) => pv + cv.cost ,0)
    const tax =  total * 0.05
    const netTotal = tax + total

    return (
        <div className="relative shadow-md sm:rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th scope="col" className="px-6 py-4">Product name</th>
                        <th scope="col" className="px-6 py-4 text-end">Price</th>
                        <th scope="col" className="px-6 py-4 text-end">Quantity</th>
                        <th scope="col" className="px-6 py-4 text-end">Cost</th>
                        <th scope="col" className="px-6 py-4 text-end"></th>
                    </tr>
                </thead>
                <tbody id="recordGroup" className="bg-white divide-y divide-gray-200">
                    {records.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center">There is no record. Buy Something</td>
                        </tr>
                    ): (
                        records.map((record, index) => (<VoucherTableRow index={index} key={record.id} record={record} />))
                    )}
                    
                </tbody>
                <tfoot className="bg-gray-100">
                    <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 text-end" colSpan="4">Total</td>
                        <td className="px-6 py-4 text-end">{total.toFixed(2)}</td>
                        <td className="px-6 py-4 text-end"></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 text-end" colSpan="4">Tax (Vat 5%)</td>
                        <td className="px-6 py-4 text-end">{tax.toFixed(2)}</td>
                        <td className="px-6 py-4 text-end"></td>
                    </tr>
                    <tr className="">
                        <td className="px-6 py-4 text-end" colSpan="4">Net Total (THB)</td>
                        <td className="px-6 py-4 text-end">{netTotal.toFixed(2)}</td>
                        <td className="px-6 py-4 text-end"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default VoucherTable;
