import React from 'react'

const ProductEditSkeletonLoader = () => {
    return (
        <div className="space-y-5 animate-pulse">
            <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
            <div className="space-y-3">
                <div className="h-10 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
            <div className="flex gap-3">
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
                <div className="h-10 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}

export default ProductEditSkeletonLoader