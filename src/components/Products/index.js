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
            <div id="products">
                {categories.map((category, index) => {
                    return (
                        <div key={category.name} className="contents" style={{backgroundImage: index % 2 !== 0 ? "linear-gradient(to bottom right, #121212, #3d4a5d)" : ""}}>
                            <Container >
                                <Typography className="headline" variant="h3" component="h2">{category.name}</Typography>
                                <Grid container spacing={4} >
                                    {category.productsData.map(product => {
                                        return (
                                            <Grid key={product.id} item xs={12} sm={6} md={4}>
                                                <Product categoryName={category.name} product={product} addProduct={addProduct} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Container>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Products
