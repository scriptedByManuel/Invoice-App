import useSWR from 'swr';
import ProductSkeleton from './ProductSkeleton';
import ProductRow from './ProductRow';
import ProductListEmptyStage from './ProductListEmptyStage';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const ProductList = () => {

    const { data, isLoading, error } = useSWR(`${import.meta.env.VITE_URL_API}/products`, fetcher)
    
    return (
        <div className="relative overflow-x-auto shadow-lg rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-800">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {isLoading ? (
                        <ProductSkeleton />
                    ) : data.length === 0 ? (
                        <ProductListEmptyStage />
                    ) : (
                        data.map((product, index) => (
                            <ProductRow product={product} index={index} key={product.id} />
                        ))
                    )}
                    
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
