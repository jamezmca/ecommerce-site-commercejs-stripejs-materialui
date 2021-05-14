import { Container, Typography, Paper } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { commerce } from '../../lib/commerce'
import CheckoutForm from './CheckoutForm'
import './styles.css'

const steps = ["order-address", "order-details", "order-payment"];

const convertObjectToArray = (countries) =>
    Object.entries(countries || {}).map(([code, name]) => ({ code, name }));


const Checkout = ({ basketData }) => {
    const [user, setUser] = useState({
        city: '',
        email: '',
        address: '',
        postCode: '',
        lastName: '',
        firstName: '',
        shippingOption: {},
        shippingOptions: [],
        shippingCountry: {},
        shippingCountries: [],
        shippingSubdivision: {},
        shippingSubdivisions: []
    })

    const [checkoutData, setCheckoutData] = useState({})

    function handleChange(e) {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    function handleSelectChange(e, state) {
        const { name, value } = e.target
        if (state === "shippingOptions") {
            setUser({
                ...user,
                shippingOptions: {
                    id: value
                }
            })
        } else {
            setUser({
                ...user,
                name: user[state].find((country) => country.code === value).name, //maybe put [name] at start
                code: value
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        //setBookingStep('order-details')
    }

    useEffect(() => {
        if (basketData.id) {
            const generateToken = async () => {
                try {
                    const response = await commerce.checkout.generateToken(
                        basketData.id,
                        {
                            type: "cart"
                        }
                    )
                    setCheckoutData(response)
                } catch (error) {
                    console.error("Checkout error: ", error)
                }
            }
            generateToken()
        }
    }, [basketData])

    useEffect(() => {
        const fetchShippingCountries = async () => {
            const { countries } = await commerce.services.localeListShippingCountries(
                checkoutData.id
            );
            const FormattedCountries = convertObjectToArray(countries);
            setUser({
                ...user,
                shippingCountries: FormattedCountries,
                shippingCountry: FormattedCountries[FormattedCountries.length - 1],
            });
        };
        if (!user.shippingCountries.length && checkoutData.id) {
            fetchShippingCountries();
        }
    }, [user, checkoutData]);

    useEffect(() => {
        const fetchSubdivisions = async (countryCode) => {
            const { subdivisions } = await commerce.services.localeListSubdivisions(
                countryCode
            );

            const shippingSubdivisions = convertObjectToArray(subdivisions);
            setUser({
                ...user,
                shippingSubdivisions,
                shippingSubdivision: shippingSubdivisions[0],
            });
        };

        if (
            (user.shippingCountry.code && !user.shippingSubdivisions.length) ||
            (previousShippingCountry &&
                previousShippingCountry.code !== user.shippingCountry.code)
        )
            fetchSubdivisions(user.shippingCountry.code);
    }, [user, previousShippingCountry]);



    return (
        <div className="checkout">
            <Container>
                <Paper className="paper" elevation={3}>
                    <Typography align="center" variant="h5" gutterBottom>
                        Checkout
                    </Typography>
                </Paper>
            </Container>
            <CheckoutForm user={user}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleSubmit} />

        </div>
    )
}

export default Checkout
