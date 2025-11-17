import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useRecordStore from "../../../stores/useRecordStore";
import { storeVoucher } from "../../../services/voucher";
import { toast } from "sonner";

const useSale = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);
    const { records, resetRecords } = useRecordStore();

    const onSubmit = async (data) => {
        setIsSending(true);

        const total = records.reduce((pv, cv) => pv + cv.cost, 0);
        const tax = total * 0.05;
        const net_total = total + tax;

        const voucher = {
            ...data,
            records,
            total,
            tax,
            net_total,
        };

        const res = await storeVoucher(voucher)
        const json = await res.json();

        if (!res.status) {
            toast.error(json.message);
            return;
        }

        toast.success("Voucher created successfully");
        setIsSending(false);
        resetRecords();
        reset();

        if (data.redirect_to_detail) {
            navigate(`/dashboard/voucher/voucher-detail/${json.data.id}`);
        }
    };

    function generateInvoiceNumber() {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        return `INV-${formattedDate}-${randomNumber}`;
    }

    return {register, handleSubmit, onSubmit, errors, isSending, generateInvoiceNumber}
}

export default useSale