export interface ProjectFeature {
  name: string
  description: string
}

export interface CostEstimate {
  amount: string
  time: string
  complexity: 'low' | 'medium' | 'high'
}

/**
 * A basic cost calculator for Nosh projects.
 * This can be refined later with more specific business rules.
 */
export function calculateProjectCost(features: ProjectFeature[]): CostEstimate {
  const count = features.length
  
  // Base rates
  const ratePerFeature = 250 // $250 per core feature
  const baseTimeInDays = 3 // Minimum 3 days
  
  let complexity: 'low' | 'medium' | 'high' = 'low'
  if (count > 5) complexity = 'medium'
  if (count > 10) complexity = 'high'
  
  const complexityMultiplier = {
    low: 1,
    medium: 1.5,
    high: 2.5
  }
  
  const totalAmount = count * ratePerFeature * complexityMultiplier[complexity]
  const totalTime = Math.ceil(baseTimeInDays + (count * 0.5 * complexityMultiplier[complexity]))
  
  return {
    amount: `$${totalAmount.toLocaleString()}`,
    time: `${totalTime} Days`,
    complexity
  }
}
