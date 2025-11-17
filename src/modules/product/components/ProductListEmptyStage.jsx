import React from 'react'

const ProductListEmptyStage = () => {
    return (
        <tr className="bg-card border-b border-border hover:bg-muted transition">
            <td colSpan={5} className="px-6 py-4 text-center text-foreground">
                There is no Product
            </td>
        </tr>
    )
}

export default ProductListEmptyStage
