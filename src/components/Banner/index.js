import {Container, Typography, Button, Grid} from '@material-ui/core'
//import logo from './cannon-kit.png'
import './styles.css'

const Banner = () => {
    return (
        <div className="banner">
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography className="title" variant="h1">
                            Welcome to Careclothes!
                        </Typography>
                        <Button className="shopping-button" href="#products">
                            Shop
                        </Button>
                    </Grid>
                    <Grid className="brand" item sm={6}>
                        {/*<img src={logo} alt="brand-tv" */}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Banner
