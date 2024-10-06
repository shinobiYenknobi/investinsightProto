export interface Product {
  id: string
  name: string
  price: number
  rating: number
  marketShare: number
  growthTrend: number
  companyId: string
}

export interface Company {
  id: string
  name: string
  description: string
  foundedYear: number
  revenue: number
  employees: number
}

export interface MarketTrend {
  date: string
  growthRate: number
  sector: string
}

export interface InvestmentAlert {
  title: string
  description: string
  potentialImpact: string
}