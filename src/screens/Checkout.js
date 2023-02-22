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
        url: "http://localhost:8080/#/",
        apiKey: "e0f89d5328398b93634f56ba06c9474ec9388d5e",
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
            <h1>Checkout</h1>
            <div id="tonder-checkout">
            </div>
            <p>{checkoutResponse?.data?.status}</p>
            <button onClick={()=>{ console.log(tonderCheckout.getUrlParams())}}>Get url params</button>
        </div>
    )
}