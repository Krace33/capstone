import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ProductDetails } from './'
import { GB_CURRENY } from '../utils/constants'

import { callAPI } from '../utils/CallApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlics'

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const getProduct = () => {
      callAPI(`data/products.json`)
      .then((productResults) => {
        setProduct(productResults[id])
      })
    }
    
    const addQuantityToProduct = () => {
        setProduct(product.quantity = quantity);
        return product;
    }

    useEffect(() => {
        getProduct();
    }, [])

    if (!product?.title) return <h1>Loading Product ...</h1>;


  return ( product && 
    <div className='h-screen bg-amazonclone-background'>
        <div className='min-w-[1000px] max-w-[1500px] m-auto p-4'>
            <div className='grid grid-cols-10 gap-2'>
                {/* Left */}
                <div className='col-span-3 p-8 bg-white m-auto'>
                    <img src={`${product.image}`} />
                </div>
                {/* Middle */}
                <div className='col-span-5 p-4 rounded bg-white divide-y divide-gray-400'>
                    <div className='mb-3'>
                        <ProductDetails product={product} ratings={true}/>
                    </div>
                    <div className='text-base xl:text-lg mt-3'>
                        {product.description}
                    </div>
                </div>
                {/* Right */}
                <div className='col-span-2 pd-4 rounded bg-white'>
                    <div className='text-xl xl:text-2xl text-red-700 text-right font-semibold'>{GB_CURRENY.format(product.price)}</div>
                    <div className='text-base xl:text-lg text-gray-500 text-right font-semibold'>
                        RRP: <span className='line-through'>{GB_CURRENY.format(product.oldPrice)}</span>
                        </div>
                    <div className='text-sm xl:text-base text-blue-500 mt-3 font-semibold'>FREE Returns</div>
                    <div className='text-sm xl:text-base text-blue-500 mt-1 font-semibold'>FREE delivery</div>
                    <div className='text-base xl:text-lg text-green-500 mt-1 font-semibold'>In Stock</div>
                    <div className='text-base xl:text-lg font-semibold'>Quantity:
                        <select onChange={(e) => setQuantity(e.target.value)} className='p-2 bg-white border rounded-md focus:border-indigo-600'>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <Link to={'/checkout'}>
                        <button onClick={() => dispatch(addToCart(addQuantityToProduct()))} className='btn'>Add to Cart</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage
