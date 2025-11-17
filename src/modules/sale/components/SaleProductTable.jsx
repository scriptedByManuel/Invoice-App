import React from "react";
import useRecordStore from "../../../stores/useRecordStore";
import SaleProductTableRow from "./SaleProductTableRow";

const SaleProductTable = () => {
    const { records } = useRecordStore();

    const total = records.reduce((pv, cv) => pv + cv.cost, 0);
    const tax = total * 0.05;
    const netTotal = tax + total;

    return (
        <div className="relative bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm text-foreground">
                {/* Header */}
                <thead className="bg-muted text-xs uppercase text-muted-foreground">
                    <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Product name</th>
                        <th className="px-6 py-4 text-end">Price</th>
                        <th className="px-6 py-4 text-end">Quantity</th>
                        <th className="px-6 py-4 text-end">Cost</th>
                        <th className="px-6 py-4 text-end"></th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-border bg-background">
                    {records.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-6 py-8 text-center text-muted-foreground"
                            >
                                No items added. Please select a product.
                            </td>
                        </tr>
                    ) : (
                        records.map((record, index) => (
                            <SaleProductTableRow
                                key={record.id}
                                index={index}
                                record={record}
                            />
                        ))
                    )}
                </tbody>

                {/* Footer */}
                <tfoot className="bg-muted/50 text-foreground">
                    <tr className="border-t border-border">
                        <td className="px-6 py-4 text-end" colSpan={4}>
                            Total
                        </td>
                        <td className="px-6 py-4 text-end font-semibold">
                            {total.toFixed(2)}
                        </td>
                        <td></td>
                    </tr>

                    <tr className="border-t border-border">
                        <td className="px-6 py-4 text-end" colSpan={4}>
                            Tax (VAT 5%)
                        </td>
                        <td className="px-6 py-4 text-end font-semibold">
                            {tax.toFixed(2)}
                        </td>
                        <td></td>
                    </tr>

                    <tr className="bg-primary/5 border-t border-border">
                        <td className="px-6 py-4 text-end font-bold" colSpan={4}>
                            Net Total (MMK)
                        </td>
                        <td className="px-6 py-4 text-end font-bold text-primary">
                            {netTotal.toFixed(2)}
                        </td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default SaleProductTable;
