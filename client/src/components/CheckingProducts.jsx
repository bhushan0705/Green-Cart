import React from 'react'
import { categories } from '../assets/assets'

const CheckingProducts = () => {

  return (
    <div>
        {categories.map((ele)=>{
            console.log(ele);
        })}
    </div>
  )
}

export default CheckingProducts