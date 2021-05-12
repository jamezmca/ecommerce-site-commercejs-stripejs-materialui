import { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Products from './components/Products'
import NavBar from './components/NavBar'
import Footer from './components/Footer'


function App() {
  const [products, setProducts] = useState([])
  const [basketData, setbasketData] = useState({})

  const fetchProducts = async () => {
    const response = await commerce.products.list()
    setProducts((response && response.data) || [])
  }

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve()
    setbasketData(response)
  }

  useEffect(() => {
    fetchProducts()
    fetchBasketData()
  }, [])
  console.log(products)

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity)
    setbasketData(response.cart)
  }

  console.log(basketData)


  return (
    <Router>
      <div>
        <NavBar basketItems={basketData.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} addProduct={addProduct} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
