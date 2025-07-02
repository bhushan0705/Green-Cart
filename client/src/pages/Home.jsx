import React, { useEffect } from 'react'
import MainBanner from '../components/MainBanner'
import BestSellers from '../components/BestSellers'
import Footer from '../components/Footer'
import CategoriesProduct from '../components/CategoriesProduct'
import { useDispatch } from 'react-redux'
import { setDummyAddress } from '../Redux/slices/productSlice'
import { dummyAddress } from '../assets/assets'

const Home = () => {
// console.log(product);

const dispatch = useDispatch()
useEffect(()=>{
  dispatch(setDummyAddress(dummyAddress))
})

  return (
    <div>
      <MainBanner></MainBanner>
      <CategoriesProduct></CategoriesProduct>
      <BestSellers></BestSellers>
      <Footer></Footer>
    </div>
  )
}

export default Home