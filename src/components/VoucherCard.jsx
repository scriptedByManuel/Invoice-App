import html2pdf from "html2pdf.js";
import printJS from "print-js";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import useCookie from 'react-use-cookie';

const VoucherCard = () => {
    const { id } = useParams();

    const [token] = useCookie('my_token')

    const fetcher = (url) =>
        fetch(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());

    const { data, isLoading, error } = useSWR(
        import.meta.env.VITE_URL_API + "/vouchers/" + id,
        fetcher
    );

    const handlePrint = () => {
        printJS({
            printable: "printArea",
            type: "html",
            scanStyles: true,
            css: [
                "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
            ],
        });
    };

    const handlePdf = () => {
        const element = document.getElementById("printArea");

        const opt = {
            margin: 0.1,
            filename: "invoice.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a5', orientation: 'portrait' },
        };

        html2pdf().from(element).set(opt).save();
    };


    if (isLoading) return <p>Loading...</p>;


    return (
        <div className="flex gap-5">
            <div
                id="printArea"
                className="w-[14.8cm] bg-white p-6 text-gray-900"
            >
                {/* Company name */}
                <div className="text-left text-xs mb-6 border-b border-gray-300 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-full">
                            <h2 className="font-bold text-lg text-gray-900">MMS Solutions</h2>
                            <p className="text-gray-600 text-sm">48, 1st Floor, Shan Kone St.</p>
                            <p className="text-gray-600 text-sm">+959-250-152-018 | enquiry@mms-it.com</p>
                        </div>
                    </div>
                    <br />
                </div>

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">INVOICE</h1>
                        <p className="text-base font-medium text-gray-600">{data?.data.voucher_id}</p>
                    </div>
                    <div className="text-right text-sm">
                        <p className="font-semibold text-gray-800">Invoice To:</p>
                        <p className="text-gray-700">{data?.data.customer_name}</p>
                        <p className="text-gray-600">Date: {data?.data.sale_date}</p>
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
                        {data?.data?.records.map((record, index) => (
                            <tr key={record.id} className="border-b border-gray-200">
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2">{record.product.product_name}</td>
                                <td className="py-2 text-right">{record.quantity}</td>
                                <td className="py-2 text-right">{record.product.price}</td>
                                <td className="py-2 text-right">{record.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="text-sm">
                        <tr className="border-t border-gray-300">
                            <td colSpan={4} className="py-2 text-right font-medium">
                                Total
                            </td>
                            <td className="py-2 text-right font-medium">{data?.data.total}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="py-1 text-right">
                                Tax 5%
                            </td>
                            <td className="py-1 text-right">{data?.data.tax}</td>
                        </tr>
                        <tr className="border-t border-gray-300">
                            <td colSpan={4} className="py-2 text-right font-semibold">
                                Net Total
                            </td>
                            <td className="py-2 text-right font-semibold">{data?.data.net_total}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Payment & Company Info */}
                <div className="text-xs mb-6">
                    <div>
                        <h2 className="font-bold mb-1 text-gray-800">Payment Transfer To</h2>
                        <p>Kpay,Wave - 09250152018</p>
                        <p>KBZ Bank - 02730102705025601</p>
                        <p>AYA Bank - 20003674121</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-300 pt-3">
                    <p className="mt-2 text-center text-xs text-gray-600">Thank you for your business!</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
                <button onClick={handlePrint} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm w-full px-4 py-2 text-center">
                    Print Voucher
                </button>
                <button onClick={handlePdf} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm w-full px-4 py-2 text-center">
                    Download PDF
                </button>
            </div>
        </div>

    );
};

export default VoucherCard;