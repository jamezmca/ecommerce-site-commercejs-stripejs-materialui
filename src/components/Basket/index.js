import './styles.css'
import {
    Grid,
    Container,
    Button
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Spinner from '../Spinner'
import Banner from './Banner'
import CustomCard from '../CustomCard'


const Basket = ({
    basketData,
    updateProduct,
    handleEmptyBasket,
    RemoveItemFromBasket
}) => {
    const [showSpinner, setShowSpinner] = useState(true)

    function loading() {
        setTimeout(() => {
            setShowSpinner(false)
        }, 2000)
        if (showSpinner) {
            return <Spinner />
        } else {
            return <Banner />
        }
    }

    if (!basketData.line_items || !basketData.line_items.length) return loading()
    return (
        <Container id="basket">
            <Grid container justify="center" spacing={4}>
                {basketData.line_items.map((product) => {
                    return (
                        <Grid key={product.id} item xs={12} sm={6} md={4}>
                            <CustomCard
                                basket
                                product={product}
                                updateProduct={updateProduct}
                                RemoveItemFromBasket={RemoveItemFromBasket}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <div className="actions">
                <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={handleEmptyBasket}
                >Empty Basket</Button>
                <Button
                    size="small"
                    variant="contained"
                    component={Link}
                    to="/checkout">Checkout</Button>
            </div>
        </Container>
    )
}

export default Basket
