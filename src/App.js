import { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Products from './components/Products'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Basket from './components/Basket'


function App() {
  const [products, setProducts] = useState([])
  const [basketData, setBasketData] = useState({})

  const fetchProducts = async () => {
    const response = await commerce.products.list()
    setProducts((response && response.data) || [])
  }

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve()
    setBasketData(response)
  }

  useEffect(() => {
    fetchProducts()
    fetchBasketData()
  }, [])
  console.log(products)

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity)
    setBasketData(response.cart)
  }

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, {quantity})
    setBasketData(response.cart)
  }

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty()
    setBasketData(response)
  }

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId)
    setBasketData(response)
  }

  return (
    <Router>
      <div>
        <NavBar basketItems={basketData.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} addProduct={addProduct} />
          </Route>
          <Route exact path="/basket">
            <Basket 
              basketData={basketData}
              updateProduct={updateProduct}
              handleEmptyBasket={handleEmptyBasket}
              RemoveItemFromBasket={RemoveItemFromBasket}/>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
