import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BarChart, DollarSign, Star, TrendingUp } from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { fetchProductData } from '../services/mockDataService'
import { Product } from '../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const InvestmentDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<keyof Product>('marketShare')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterPrice, setFilterPrice] = useState<number | ''>('')
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const searchTerm = searchParams.get('search') || 'Default'
    
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchProductData(searchTerm)
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        setError('Failed to fetch product data. Please try again later.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [location])

  useEffect(() => {
    let sorted = [...products].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    if (filterPrice !== '') {
      sorted = sorted.filter(product => product.price <= Number(filterPrice))
    }

    setFilteredProducts(sorted)
  }, [products, sortKey, sortOrder, filterPrice])

  const handleSort = (key: keyof Product) => {
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc')
    setSortKey(key)
  }

  const chartData = {
    labels: filteredProducts.map(product => product.name),
    datasets: [
      {
        label: 'Market Share (%)',
        data: filteredProducts.map(product => product.marketShare),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Growth Trend (%)',
        data: filteredProducts.map(product => product.growthTrend),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Product Comparison',
      },
    },
  }

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Investment Dashboard</h2>
      <div className="mb-4 flex items-center space-x-4">
        <button onClick={() => handleSort('marketShare')} className="px-4 py-2 bg-blue-500 text-white rounded">
          Sort by Market Share
        </button>
        <button onClick={() => handleSort('growthTrend')} className="px-4 py-2 bg-blue-500 text-white rounded">
          Sort by Growth Trend
        </button>
        <div>
          <label htmlFor="priceFilter" className="mr-2">Max Price:</label>
          <input
            id="priceFilter"
            type="number"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value ? Number(e.target.value) : '')}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>
      <div className="mb-8">
        <Bar options={chartOptions} data={chartData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <div className="flex items-center mb-2">
              <DollarSign className="mr-2 text-green-500" size={16} />
              <span>Price: ${product.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center mb-2">
              <Star className="mr-2 text-yellow-500" size={16} />
              <span>Rating: {product.rating.toFixed(1)}/5</span>
            </div>
            <div className="flex items-center mb-2">
              <BarChart className="mr-2 text-blue-500" size={16} />
              <span>Market Share: {product.marketShare}%</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="mr-2 text-purple-500" size={16} />
              <span>Growth Trend: {product.growthTrend}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvestmentDashboard