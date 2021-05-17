import { Grid, Container, Typography } from '@material-ui/core'
import './styles.css'
import Product from '../Product'
import Banner from '../Banner'
import Spinner from '../Spinner'


const Products = ({ categories, addProduct }) => {
    if (!categories.length) return <Spinner />
    return (
        <div>
            <Banner />
            <div className="contents">
                {categories.map(category => {
                    return (
                        <Container id="products">
                            <Typography className="headline" variant="h3" component="h2">{category.name}</Typography>
                            <Grid container spacing={4} key={category.name}>
                                {category.productsData.map(product => {
                                    return (
                                        <Grid key={product.id} item xs={12} sm={6} md={4}>
                                            <Product product={product} addProduct={addProduct} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Container>
                    )
                })}
            </div>
        </div>
    )
}

export default Products
