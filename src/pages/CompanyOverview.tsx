import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchCompanyData, fetchCompanyProducts } from '../services/mockDataService'
import { Company, Product } from '../types'
import { Building, Users, DollarSign, Calendar } from 'lucide-react'

const CompanyOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const [companyData, productsData] = await Promise.all([
          fetchCompanyData(id),
          fetchCompanyProducts(id)
        ])
        setCompany(companyData)
        setProducts(productsData)
      } catch (err) {
        setError('Failed to fetch company data. Please try again later.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error || !company) {
    return <div className="text-center mt-8 text-red-500">{error || 'Company not found'}</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{company.name}</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <p className="text-gray-600 mb-4">{company.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            <span>Founded: {company.foundedYear}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 text-green-500" />
            <span>Revenue: ${(company.revenue / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 text-purple-500" />
            <span>Employees: {company.employees.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Building className="mr-2 text-indigo-500" />
            <span>Products: {products.length}</span>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-4">Product Lineup</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Price: ${product.price.toFixed(2)}</span>
              <span>Rating: {product.rating.toFixed(1)}/5</span>
            </div>
            <Link to={`/compare?productId=${product.id}`} className="mt-2 inline-block text-blue-500 hover:underline">
              Compare
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyOverview