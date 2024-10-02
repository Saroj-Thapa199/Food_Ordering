import { Order } from '@/models/Order'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const sig = req.headers.get('stripe-signature')
    let event

    try {
        const reqBuffer = await req.text()
        const signSecret = process.env.STRIPE_SIGN_SECRET
        event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret)
    } catch (error) {
        console.error('stripe error')
        console.log(error)
        return Response.json(error, {status: 500})
    }

    if (event.type === 'checkout.session.completed') {
        console.log(event)
        const orderId = event?.data?.object?.metadata?.orderId
        const isPaid = event?.data?.object?.payment_status === 'paid'
        if (isPaid) {
            await Order.updateOne({_id: orderId}, {paid: true})
        }
    }

    return Response.json('ok', {status: 200})
}