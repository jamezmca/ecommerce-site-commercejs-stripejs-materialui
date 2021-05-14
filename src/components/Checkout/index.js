import { Container, Typography, Paper } from '@material-ui/core'
import React, {useState} from 'react'
import CheckoutForm from './CheckoutForm'
import './styles.css'

const Checkout = () => {
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

    function handleChange(e) {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    function handleSelectChange(e, state) {
        const {name, value} = e.target
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
                handleSubmit={handleSubmit}/>
            
        </div>
    )
}

export default Checkout
