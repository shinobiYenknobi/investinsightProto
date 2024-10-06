import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
          <TrendingUp className="mr-2" />
          InvestInsight
        </Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
          <Link to="/opportunities" className="text-gray-600 hover:text-blue-600">Opportunities</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header