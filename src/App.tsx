import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import InvestmentDashboard from './pages/InvestmentDashboard'
import ProductComparison from './pages/ProductComparison'
import CompanyOverview from './pages/CompanyOverview'
import MarketOpportunities from './pages/MarketOpportunities'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<InvestmentDashboard />} />
            <Route path="/compare" element={<ProductComparison />} />
            <Route path="/company/:id" element={<CompanyOverview />} />
            <Route path="/opportunities" element={<MarketOpportunities />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App