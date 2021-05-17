import CustomCard from '../CustomCard'
import "./styles.css"

const Product = ({ product, addProduct, categoryName }) => (
    <CustomCard
        product={product}
        addProduct={addProduct}
        categoryName={categoryName}
    />
)

export default Product