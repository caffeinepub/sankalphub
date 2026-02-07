import { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <ToolShell
      title="Loan Calculator"
      description="Calculate your monthly loan payment and total interest"
      actionButton={{
        label: 'Calculate',
        onClick: handleCalculate,
        disabled: !loanAmount || !annualRate || !tenureMonths,
      }}
      result={result ? {
        content: (
          <div className="space-y-3">
            {error && <p className="text-destructive text-sm">{error}</p>}
            {!error && result && (
              <>
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
              </>
            )}
          </div>
        ),
      } : undefined}
    >
      <div className="space-y-4">
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
      </div>
    </ToolShell>
  );
}
