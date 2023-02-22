import React, { useContext } from 'react'

import { CartContext } from '../context/CartContext'
import { getProductData } from '../storeProducts'

const ProductCard = (props) => {
    const { productData } = props
    const product = getProductData(productData.id)

    const cart = useContext(CartContext)

    return (
        <div className=''>
            <button 
             onClick={() => cart.removeOneFromCart(product.id)}>
                Remove
            </button>
            <div>
                { product.title }
            </div>
            { product.price }
            <button
                onClick={() => cart.addOneToCart(product.id)}
            >
                Add
            </button>
        </div>
    )
}

export default ProductCard