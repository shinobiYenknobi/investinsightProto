import { Product, Company, MarketTrend, InvestmentAlert } from '../types'

const generateMockData = (searchTerm: string): { products: Product[], companies: Company[], trends: MarketTrend[], alerts: InvestmentAlert[] } => {
  const products: Product[] = [
    {
      id: '1',
      name: `${searchTerm} Product 1`,
      price: 29.99,
      rating: 4.5,
      marketShare: 15,
      growthTrend: 5.2,
      companyId: '1'
    },
    {
      id: '2',
      name: `${searchTerm} Product 2`,
      price: 39.99,
      rating: 4.2,
      marketShare: 12,
      growthTrend: 3.8,
      companyId: '2'
    },
    {
      id: '3',
      name: `${searchTerm} Product 3`,
      price: 19.99,
      rating: 4.8,
      marketShare: 18,
      growthTrend: 7.5,
      companyId: '3'
    },
    {
      id: '4',
      name: `${searchTerm} Product 4`,
      price: 24.99,
      rating: 4.0,
      marketShare: 10,
      growthTrend: 2.5,
      companyId: '1'
    },
    {
      id: '5',
      name: `${searchTerm} Product 5`,
      price: 34.99,
      rating: 4.6,
      marketShare: 14,
      growthTrend: 6.0,
      companyId: '2'
    }
  ]

  const companies: Company[] = [
    {
      id: '1',
      name: 'TechCorp',
      description: 'Leading technology company specializing in innovative products.',
      foundedYear: 2005,
      revenue: 500000000,
      employees: 5000
    },
    {
      id: '2',
      name: 'GadgetWorld',
      description: 'Global manufacturer of cutting-edge gadgets and electronics.',
      foundedYear: 1998,
      revenue: 750000000,
      employees: 8000
    },
    {
      id: '3',
      name: 'FutureTech',
      description: 'Pioneering company focused on next-generation technology solutions.',
      foundedYear: 2010,
      revenue: 300000000,
      employees: 3000
    }
  ]

  const trends: MarketTrend[] = [
    { date: '2023-01', growthRate: 2.5, sector: 'Technology' },
    { date: '2023-02', growthRate: 2.7, sector: 'Technology' },
    { date: '2023-03', growthRate: 3.1, sector: 'Technology' },
    { date: '2023-04', growthRate: 3.4, sector: 'Technology' },
    { date: '2023-05', growthRate: 3.8, sector: 'Technology' },
    { date: '2023-06', growthRate: 4.2, sector: 'Technology' }
  ]

  const alerts: InvestmentAlert[] = [
    {
      title: 'Emerging Market Opportunity',
      description: 'Rapid growth observed in the AI sector, consider increasing investments.',
      potentialImpact: 'High'
    },
    {
      title: 'Regulatory Changes',
      description: 'New regulations in the fintech industry may affect current investments.',
      potentialImpact: 'Medium'
    },
    {
      title: 'Market Volatility',
      description: 'Increased volatility in the stock market, diversification recommended.',
      potentialImpact: 'Medium'
    }
  ]

  return { products, companies, trends, alerts }
}

export const fetchProductData = (searchTerm: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { products } = generateMockData(searchTerm)
      resolve(products)
    }, 1000)
  })
}

export const fetchCompanyData = (companyId: string): Promise<Company> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { companies } = generateMockData('')
      const company = companies.find(c => c.id === companyId)
      if (company) {
        resolve(company)
      } else {
        reject(new Error('Company not found'))
      }
    }, 1000)
  })
}

export const fetchCompanyProducts = (companyId: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { products } = generateMockData('')
      const companyProducts = products.filter(p => p.companyId === companyId)
      resolve(companyProducts)
    }, 1000)
  })
}

export const fetchMarketTrends = (): Promise<MarketTrend[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { trends } = generateMockData('')
      resolve(trends)
    }, 1000)
  })
}

export const fetchInvestmentAlerts = (): Promise<InvestmentAlert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { alerts } = generateMockData('')
      resolve(alerts)
    }, 1000)
  })
}