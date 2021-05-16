import CustomCard from '../CustomCard'
import "./styles.css"

const Product = ({ product, addProduct }) => (
    <CustomCard
        product={product}
        addProduct={addProduct}
    />
)

export default Product