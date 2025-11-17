import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import urlToParamObject from "../../../utils/url";
import { fetchVouchers } from "../../../services/voucher";


const useVoucher = () => {
    const location = useLocation();
    const [params, setParams] = useSearchParams();
    const [fetchUrl, setFetchUrl] = useState(
        import.meta.env.VITE_URL_API + "/vouchers" + location.search
    );
    const { data, isLoading, error } = useSWR(fetchUrl, fetchVouchers);
    const searchInput = useRef();

    useEffect(() => {
        if (params.get("q")) {
            searchInput.current.value = params.get("q");
        }
    }, [params]);

    const handleSearch = debounce((e) => {
        if (e.target.value) {
            setParams({ q: e.target.value });
            setFetchUrl(`${import.meta.env.VITE_URL_API}/vouchers?q=${e.target.value}`);
        } else {
            setParams({});
            setFetchUrl(`${import.meta.env.VITE_URL_API}/vouchers`);
        }
    }, 500);

    const handleClearSearch = () => {
        searchInput.current.value = "";
        setParams({});
        setFetchUrl(`${import.meta.env.VITE_URL_API}/vouchers`);
    };

    const updateFetchUrl = (url) => {
        setParams(urlToParamObject(url));
        setFetchUrl(url);
    };

    const handleSort = (sortData) => {
        const queryString = new URLSearchParams(sortData).toString();
        setParams(sortData);
        setFetchUrl(`${import.meta.env.VITE_URL_API}/vouchers?${queryString}`);
    };

    return {data, isLoading, error, searchInput, handleSearch, handleClearSearch, handleSort, updateFetchUrl}
}

export default useVoucher