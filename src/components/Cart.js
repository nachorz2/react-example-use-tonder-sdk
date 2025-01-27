import React, { useEffect, useContext } from 'react'

import { CartContext } from '../context/CartContext'

const Cart = () => {
    const cart = useContext(CartContext)
    useEffect(()=> {
        
        console.log(cart)
    }, [cart])

    return (
        <>
            <h3 className='text-bold font-bold text-center w-1/3 flex justify-center'>Cart</h3>
            <div className='w-1/3 flex justify-center'>
                { cart.items.map((product, index) => {
                    return (
                        <div key={index}>
                            <div>{product.title}</div>
                            <div>{product.price}</div>
                            <div>{product.quantity}</div>
                        </div>
                    )
                })}
                <div className='text-xl text-bold'>
                    Total: {cart.getTotalCost()}
                </div>
            </div>
        </>
    )
}

export default Cart