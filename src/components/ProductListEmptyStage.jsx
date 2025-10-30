import React from 'react'

const ProductListEmptyStage = () => {
  return (
      <tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
          <td colSpan={5} className="px-6 py-4 text-center">
              There is no Product
          </td>
      </tr>
  )
}

export default ProductListEmptyStage