import { Route,Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import ProductsPage from '../pages/ProductsPage'
import AllProductItems from '../pages/AllProductItems'
import SingleItem from './SingleItem'
import Address from '../pages/Address'
import Deal from '../pages/Deal'
import CartItemPage from '../pages/CartItemPage'
import Seller from '../pages/Seller'
import AddProduct from '../pages/sellerPage/AddProduct'
import ProductList from '../pages/sellerPage/ProductList'
import OrderProduct from '../pages/sellerPage/OrderProduct'
import MyOrder from '../pages/MyOrder'
import SellerLogin from '../pages/sellerPage/SellerLogin'
import ClientLogin from '../pages/clientPage/ClientLogin'



const Routing = () => {
  return (
    <div>
          <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About></About>}></Route>
                  <Route
                    path="/products"
                    element={<ProductsPage></ProductsPage>}
                  ></Route>
                  <Route
                    path="/allproducts"
                    element={<AllProductItems></AllProductItems>}
                  ></Route>
                  <Route
                    path="/products/:category"
                    element={<ProductsPage></ProductsPage>}
                  ></Route>
                  <Route path="/products/:category/:id" element={<SingleItem />} />
                  <Route path="/deal" element={<Deal />} />
                  <Route path="/address" element={<Address></Address>}></Route>
        
                  <Route path="/cart" element={<CartItemPage></CartItemPage>}></Route>
        
                  <Route path="/seller" element={<Seller />}>
                    <Route index element={<AddProduct />} />
                    <Route path="product-list" element={<ProductList />} />
                    <Route path="sellerOrder" element={<OrderProduct></OrderProduct>}></Route>
                  </Route>
        
                  <Route path="/my-order" element={<MyOrder></MyOrder>}></Route>
        
                  {/*  ----------------- login --------------- */}
                  <Route
                    path="/seller-login"
                    element={<SellerLogin></SellerLogin>}
                  ></Route>
                  <Route path="/client-login" element={<ClientLogin />}></Route>
                </Routes>
    </div>
  )
}

export default Routing