import React, { useState, useEffect } from 'react'
import { TrendingUp, AlertTriangle, DollarSign } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { fetchMarketTrends, fetchInvestmentAlerts } from '../services/mockDataService'
import { MarketTrend, InvestmentAlert } from '../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const MarketOpportunities: React.FC = () => {
  const [trends, setTrends] = useState<MarketTrend[]>([])
  const [alerts, setAlerts] = useState<InvestmentAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [trendsData, alertsData] = await Promise.all([
          fetchMarketTrends(),
          fetchInvestmentAlerts()
        ])
        setTrends(trendsData)
        setAlerts(alertsData)
      } catch (err) {
        setError('Failed to fetch market data. Please try again later.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const chartData = {
    labels: trends.map(trend => trend.date),
    datasets: [
      {
        label: 'Market Growth',
        data: trends.map(trend => trend.growthRate),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Market Growth Trends',
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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Market Opportunities</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Market Growth Trends</h3>
        <Line options={chartOptions} data={chartData} />
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Top Growing Sectors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trends.slice(0, 3).map((trend, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">{trend.sector}</h4>
              <div className="flex items-center">
                <TrendingUp className="mr-2 text-green-500" />
                <span>Growth Rate: {trend.growthRate.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Investment Alerts</h3>
        {alerts.map((alert, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="mr-2 text-yellow-500" />
              <h4 className="text-lg font-semibold">{alert.title}</h4>
            </div>
            <p className="text-gray-600 mb-2">{alert.description}</p>
            <div className="flex items-center">
              <DollarSign className="mr-2 text-green-500" />
              <span>Potential Impact: {alert.potentialImpact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketOpportunities