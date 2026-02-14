import { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateEmi } from '@/utils/calculators';
import { RelatedTools } from '@/components/tools/RelatedTools';

export function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState<string>('');
  const [annualRate, setAnnualRate] = useState<string>('');
  const [tenureMonths, setTenureMonths] = useState<string>('');
  const [result, setResult] = useState<{ emi: number; totalPayment: number; totalInterest: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const p = parseFloat(principal);
    const r = parseFloat(annualRate);
    const t = parseFloat(tenureMonths);

    const calculation = calculateEmi(p, r, t);
    
    if (calculation.error) {
      setError(calculation.error);
    } else {
      setResult({
        emi: calculation.emi,
        totalPayment: calculation.totalPayment,
        totalInterest: calculation.totalInterest,
      });
    }
  };

  return (
    <>
      <ToolShell
        title="EMI Calculator"
        description="Calculate your Equated Monthly Installment (EMI) for loans. The EMI Calculator helps you quickly estimate your monthly loan repayments for home loans, car loans, personal loans, and other financing needs. By providing the loan amount, interest rate, and repayment tenure, you can instantly understand how much you need to pay every month."
        actionButton={{
          label: 'Calculate EMI',
          onClick: handleCalculate,
          disabled: !principal || !annualRate || !tenureMonths,
        }}
        result={result ? {
          content: (
            <div className="space-y-3">
              {error && <p className="text-destructive text-sm">{error}</p>}
              {!error && result && (
                <>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Monthly EMI:</span>
                    <span className="text-lg font-bold text-primary">₹{result.emi.toFixed(2)}</span>
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
                    <span className="font-medium">Principal Amount:</span>
                    <span className="text-lg">₹{parseFloat(principal).toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          ),
        } : undefined}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="principal">Loan Amount (Principal)</Label>
            <Input
              id="principal"
              type="number"
              placeholder="e.g., 500000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              placeholder="e.g., 8.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tenure">Loan Tenure (Months)</Label>
            <Input
              id="tenure"
              type="number"
              placeholder="e.g., 60"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(e.target.value)}
            />
          </div>
        </div>
      </ToolShell>
      <RelatedTools currentTool="emi" />
    </>
  );
}
