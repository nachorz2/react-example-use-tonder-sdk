import React, { useContext } from 'react'

import { CartContext } from '../context/CartContext'
import { getProductData } from '../storeProducts'

const ProductCard = (props) => {
    const { productData } = props
    const product = getProductData(productData.id)

    const cart = useContext(CartContext)

    return (
        <div className='grid grid-cols-1 p-2 '>
            <button className='rounded-xl text-white bg-blue-500'
             onClick={() => cart.removeOneFromCart(product.id)}>
                Remove
            </button>
            <div className='text-xl '>
                { product.title }
            </div >
            { product.price }
            <button  className='rounded-xl text-white bg-blue-500'
                onClick={() => cart.addOneToCart(product.id)}
            >
                Add
            </button>
        </div>
    )
}

export default ProductCard