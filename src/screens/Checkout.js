import React, { useState, useLayoutEffect, useContext, useEffect } from 'react'

import { Checkout as TonderCheckout } from 'tonder-sdk-test'

import { CartContext } from '../context/CartContext'


export const Checkout = () => {
    const cart = useContext(CartContext)

    const [checkoutResponse, setCheckoutResponse] = useState({})
    const receiveResponse = (data) => {
        setCheckoutResponse(data)
    }
    const config = {
        // url: "http://localhost:8080/#/",
        apiKey: "88eb1d76d3f7b5c429ac8674f8c84f6bee6e7f6a",
        type: "payment",
        cb: receiveResponse,
    }
    const tonderCheckout = new TonderCheckout(config)
    const params = {
        shippingCost: cart.shippingCost,
        email: "fuentesc91@gmail.com"
    }
    tonderCheckout.setOrder(params)

    useEffect(()=>{
        function setOrder() {
            const _tonderCart = cart.items.map(product => {
                return {
                    name: product.title,
                    price_unit: product.price,
                    quantity: product.quantity
                }
            })
            tonderCheckout.setOrder({products: _tonderCart})
        }
        setOrder()
    }, [cart.items])

    useLayoutEffect(() => {
        tonderCheckout.mountButton({ buttonText: 'Proceder al pago' })
    })

    return (
        <div>
          
            <div className='w-1/3 flex justify-center' id="tonder-checkout">
            </div>
            <p>{checkoutResponse?.data?.status}</p>
            {/* <button className='bg-black text-white' onClick={()=>{ console.log(tonderCheckout.getUrlParams())}}>Get url params</button> */}
        </div>
    )
}