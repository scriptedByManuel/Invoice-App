import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useCookie from 'react-use-cookie';
import useSWR from "swr";
import { fetchProducts } from "../../../services/product";


const useProduct = () => {
    const location = useLocation();
    const [params, setParams] = useSearchParams();
    const [token] = useCookie('my_token');
    const searchInput = useRef();

    useEffect(() => {
        if (params.get("q")) {
            searchInput.current.value = params.get("q");
        }
    }, [params]);


    const [fetchUrl, setFetchUrl] = useState(
        `${import.meta.env.VITE_URL_API}/products${location.search}`
    );

    const { data, error, isLoading } = useSWR(fetchUrl, fetchProducts);


    const handleSearch = debounce((e) => {
        if (e.target.value) {
            setParams({ q: e.target.value });
            setFetchUrl(
                `${import.meta.env.VITE_URL_API}/products?q=${e.target.value}`
            );
        } else {
            setParams({});
            setFetchUrl(`${import.meta.env.VITE_URL_API}/products`);
        }
    }, 500);

    const handleClearSearch = () => {
        searchInput.current.value = "";
        setParams({});
        setFetchUrl(`${import.meta.env.VITE_URL_API}/products`);
    };

    const updateFetchUrl = (url) => {
        const currentUrl = new URL(url);
        const searchParams = new URLSearchParams(currentUrl.search);
        const paramObject = Object.fromEntries(searchParams);
        setParams(paramObject);
        setFetchUrl(url);
    };

    const handleSort = (sortData) => {
        const queryString = new URLSearchParams(sortData).toString();
        setParams(sortData);
        setFetchUrl(`${import.meta.env.VITE_URL_API}/products?${queryString}`);
    };

    return {
        data,
        error,
        isLoading,
        searchInput,
        handleSearch,
        handleClearSearch,
        updateFetchUrl,
        handleSort,
        updateFetchUrl
    }
}

export default useProduct