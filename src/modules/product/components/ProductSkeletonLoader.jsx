const ProductSkeletonLoader = () => {
    return (
        <>
            {[1, 2, 3, 4, 5].map((i) => (
                <tr
                    key={i}
                    className="bg-card border-b border-border animate-pulse"
                >
                    {/* # */}
                    <td className="px-6 py-4">
                        <div className="h-4 w-4 bg-muted rounded" />
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                        <div className="h-4 w-48 bg-muted rounded" />
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-end">
                        <div className="h-4 w-16 bg-muted rounded ml-auto" />
                    </td>

                    {/* Dates */}
                    <td className="px-6 py-4 text-end">
                        <div className="space-y-2">
                            <div className="h-3 w-20 bg-muted rounded ml-auto" />
                            <div className="h-3 w-16 bg-muted rounded ml-auto" />
                        </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-end">
                        <div className="inline-flex rounded-lg border border-border overflow-hidden">
                            <div className="px-3 py-2 bg-muted w-8 h-8" />
                            <div className="px-3 py-2 bg-muted w-8 h-8 border-l border-border" />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default ProductSkeletonLoader;
