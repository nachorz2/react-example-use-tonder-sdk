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
        apiKey: "f4ab1f9140ce5b17a1bbd0b62b7f949cdd18967b",
        type: "payment",
        backgroundColor: "#80ADA0",
        color: "#F3F7F6",
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
            console.log(_tonderCart)
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
        </div>
    )
}