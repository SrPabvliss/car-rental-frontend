// features/rentals/interfaces/IReports.ts

export interface IRentalsByType {
  type: string
  quantity: string
}

export interface IIncomeByType {
  carType: string
  totalIncome: string
  totalRentals: string
  averagePerRental: string
}

export interface IDurationByType {
  carType: string
  averageDurationDays: number
  totalRentals: number
  shortestRental: number
  longestRental: number
}

export interface IMostRentedCars {
  carType: string
  carBrand: string
  carModel: string
  totalRentals: string
  revenue: string
}