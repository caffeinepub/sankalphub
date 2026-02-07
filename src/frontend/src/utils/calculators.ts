/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: Date): { years: number; months: number; days: number; error?: string } {
  const today = new Date();
  
  if (birthDate > today) {
    return { years: 0, months: 0, days: 0, error: 'Birth date cannot be in the future' };
  }
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months, days };
}

/**
 * Calculate GST
 */
export function calculateGst(
  amount: number,
  gstRate: number,
  mode: 'add' | 'remove'
): { gstAmount: number; total: number; error?: string } {
  if (amount <= 0) {
    return { gstAmount: 0, total: 0, error: 'Amount must be greater than 0' };
  }
  
  if (gstRate < 0 || gstRate > 100) {
    return { gstAmount: 0, total: 0, error: 'GST rate must be between 0 and 100' };
  }
  
  if (mode === 'add') {
    const gstAmount = (amount * gstRate) / 100;
    const total = amount + gstAmount;
    return { gstAmount, total };
  } else {
    // Remove GST (amount includes GST)
    const baseAmount = (amount * 100) / (100 + gstRate);
    const gstAmount = amount - baseAmount;
    return { gstAmount, total: baseAmount };
  }
}

/**
 * Calculate EMI
 */
export function calculateEmi(
  principal: number,
  annualRate: number,
  tenureMonths: number
): { emi: number; totalPayment: number; totalInterest: number; error?: string } {
  if (principal <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0, error: 'Principal must be greater than 0' };
  }
  
  if (annualRate < 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0, error: 'Interest rate cannot be negative' };
  }
  
  if (tenureMonths <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0, error: 'Tenure must be greater than 0' };
  }
  
  const monthlyRate = annualRate / 12 / 100;
  
  if (monthlyRate === 0) {
    const emi = principal / tenureMonths;
    return { emi, totalPayment: principal, totalInterest: 0 };
  }
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  
  return { emi, totalPayment, totalInterest };
}

/**
 * Calculate Loan (same as EMI)
 */
export function calculateLoan(
  loanAmount: number,
  annualRate: number,
  tenureMonths: number
): { monthlyPayment: number; totalPayment: number; totalInterest: number; error?: string } {
  const result = calculateEmi(loanAmount, annualRate, tenureMonths);
  return {
    monthlyPayment: result.emi,
    totalPayment: result.totalPayment,
    totalInterest: result.totalInterest,
    error: result.error,
  };
}

/**
 * Calculate BMI
 */
export function calculateBmi(
  heightCm: number,
  weightKg: number
): { bmi: number; category: string; categoryColor: string; error?: string } {
  if (heightCm <= 0) {
    return { bmi: 0, category: '', categoryColor: '', error: 'Height must be greater than 0' };
  }
  
  if (weightKg <= 0) {
    return { bmi: 0, category: '', categoryColor: '', error: 'Weight must be greater than 0' };
  }
  
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  
  let category = '';
  let categoryColor = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'text-blue-600';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal';
    categoryColor = 'text-green-600';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    categoryColor = 'text-orange-600';
  } else {
    category = 'Obese';
    categoryColor = 'text-red-600';
  }
  
  return { bmi, category, categoryColor };
}

/**
 * Calculate percentage
 */
export function calculatePercentage(
  value: number,
  percentage: number
): { result: number; error?: string } {
  if (isNaN(value) || isNaN(percentage)) {
    return { result: 0, error: 'Please enter valid numbers' };
  }
  
  const result = (value * percentage) / 100;
  return { result };
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): { percentageChange: number; increase: boolean; error?: string } {
  if (oldValue === 0) {
    return { percentageChange: 0, increase: false, error: 'Original value cannot be 0' };
  }
  
  const change = newValue - oldValue;
  const percentageChange = (change / oldValue) * 100;
  
  return { percentageChange: Math.abs(percentageChange), increase: change >= 0 };
}

/**
 * Calculate SIP returns
 */
export function calculateSip(
  monthlyInvestment: number,
  annualReturnRate: number,
  timePeriodYears: number
): { maturityValue: number; investedAmount: number; gains: number; error?: string } {
  if (monthlyInvestment <= 0) {
    return { maturityValue: 0, investedAmount: 0, gains: 0, error: 'Monthly investment must be greater than 0' };
  }
  
  if (annualReturnRate < 0) {
    return { maturityValue: 0, investedAmount: 0, gains: 0, error: 'Return rate cannot be negative' };
  }
  
  if (timePeriodYears <= 0) {
    return { maturityValue: 0, investedAmount: 0, gains: 0, error: 'Time period must be greater than 0' };
  }
  
  const monthlyRate = annualReturnRate / 12 / 100;
  const totalMonths = timePeriodYears * 12;
  
  // Future value of SIP formula
  const maturityValue = monthlyInvestment * 
    (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
  
  const investedAmount = monthlyInvestment * totalMonths;
  const gains = maturityValue - investedAmount;
  
  return { maturityValue, investedAmount, gains };
}
