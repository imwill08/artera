import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const [response, setResponse] = useState({});
    const [searchParams] = useSearchParams();
    const amount = searchParams.get("amount");
    const slotId = searchParams.get("slotId");
    const type = searchParams.get("type");
    // const email = searchParams.get("email");
    // const name = searchParams.get("name");
    const userId = searchParams.get("userId");
    const paymentMethod = searchParams.get("paymentMethod");
    // const providerId = searchParams.get("providerId");
    const serviceType = searchParams.get("serviceType")

    useEffect(() => {
        localStorage.setItem("language", "en");
        localStorage.setItem("languageChange", "en");
    }, [])

    const checkout = async () => {
        try {
            setLoading(true)
            const payload = {
                amount: amount,
                // address: {
                //     // email: email,
                //     name: name,
                // },
                userId: userId,
                type: type,
                slotId: slotId ? slotId.split(',') : [],
                paymentMethod: paymentMethod,
                // providerId: providerId.split(','),
                serviceType: serviceType
            };
            const res = await axios.post(`https://artera.com.sa/api/payment/createCheckout`, payload)

            if (res?.data?.error) {
                navigate('/payment-failed')
                return
            }
            navigate(`/payment/${res.data.results.checkout.id}?amount=${amount}&userId=${userId}&slotId=${slotId}&serviceType=${serviceType}&type=${type}`);
            //   navigate(`/payment/${res.data.results.checkout.id}`);
            console.log(res, "sdagfuhsf")
            setResponse(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error, "sgrufdihaf")
            navigate('/payment-failed')
            setError(error.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        checkout();
    }, [])
    return

};

export default Checkout