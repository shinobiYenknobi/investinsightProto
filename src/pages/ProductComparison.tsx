import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Star, DollarSign, BarChart, TrendingUp } from 'lucide-react'
import { fetchProductData } from '../services/mockDataService'
import { Product } from '../types'

const ProductComparison: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const productId = searchParams.get('productId')
    
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const allProducts = await fetchProductData('All')
        if (productId) {
          const selectedProduct = allProducts.find(p => p.id === productId)
          if (selectedProduct) {
            const comparisonProducts = allProducts
              .filter(p => p.id !== productId)
              .sort((a, b) => b.marketShare - a.marketShare)
              .slice(0, 2)
            setProducts([selectedProduct, ...comparisonProducts])
          } else {
            setError('Selected product not found')
          }
        } else {
          setProducts(allProducts.slice(0, 3))
        }
      } catch (err) {
        setError('Failed to fetch product data. Please try again later.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [location])

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Product Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Feature</th>
              {products.map(product => (
                <th key={product.id} className="px-4 py-2">{product.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 font-semibold">Price</td>
              {products.map(product => (
                <td key={product.id} className="px-4 py-2">
                  <div className="flex items-center justify-center">
                    <DollarSign className="mr-1 text-green-500" size={16} />
                    ${product.price.toFixed(2)}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Rating</td>
              {products.map(product => (
                <td key={product.id} className="px-4 py-2">
                  <div className="flex items-center justify-center">
                    <Star className="mr-1 text-yellow-500" size={16} />
                    {product.rating.toFixed(1)}/5
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Market Share</td>
              {products.map(product => (
                <td key={product.id} className="px-4 py-2">
                  <div className="flex items-center justify-center">
                    <BarChart className="mr-1 text-blue-500" size={16} />
                    {product.marketShare}%
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Growth Trend</td>
              {products.map(product => (
                <td key={product.id} className="px-4 py-2">
                  <div className="flex items-center justify-center">
                    <TrendingUp className="mr-1 text-purple-500" size={16} />
                    {product.growthTrend}%
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Investment Recommendation</h3>
        <p className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
          Based on the comparison, {products.sort((a, b) => b.growthTrend - a.growthTrend)[0].name} shows the highest growth trend and could be a promising investment opportunity. However, consider factors such as market share and overall rating before making a decision.
        </p>
      </div>
    </div>
  )
}

export default ProductComparison