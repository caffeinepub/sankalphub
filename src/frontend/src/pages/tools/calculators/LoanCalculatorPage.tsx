import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateLoan } from '@/utils/calculators';

export function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [annualRate, setAnnualRate] = useState<string>('');
  const [tenureMonths, setTenureMonths] = useState<string>('');
  const [result, setResult] = useState<{ monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const amount = parseFloat(loanAmount);
    const rate = parseFloat(annualRate);
    const tenure = parseFloat(tenureMonths);

    const calculation = calculateLoan(amount, rate, tenure);
    
    if (calculation.error) {
      setError(calculation.error);
    } else {
      setResult({
        monthlyPayment: calculation.monthlyPayment,
        totalPayment: calculation.totalPayment,
        totalInterest: calculation.totalInterest,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Free Loan Calculator Online
        </h1>
        <p className="text-lg text-muted-foreground">
          Our free loan calculator helps you calculate EMI, total interest, and total loan repayment instantly. This online loan calculator is fast, accurate, and easy to use.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Enter your loan information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="e.g., 1000000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                placeholder="e.g., 7.5"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tenure">Loan Tenure (Months)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="e.g., 240"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleCalculate} 
              disabled={!loanAmount || !annualRate || !tenureMonths}
              className="w-full"
            >
              Calculate
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Your loan calculation results</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}
            {!error && result && (
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Monthly Payment:</span>
                  <span className="text-lg font-bold text-primary">₹{result.monthlyPayment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Total Payment:</span>
                  <span className="text-lg font-semibold">₹{result.totalPayment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Total Interest:</span>
                  <span className="text-lg font-semibold">₹{result.totalInterest.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Loan Amount:</span>
                  <span className="text-lg">₹{parseFloat(loanAmount).toFixed(2)}</span>
                </div>
              </div>
            )}
            {!result && !error && (
              <p className="text-muted-foreground text-sm">Enter loan details and click Calculate to see results</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
