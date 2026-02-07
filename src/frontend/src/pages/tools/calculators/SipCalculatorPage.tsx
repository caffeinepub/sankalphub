import { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateSip } from '@/utils/calculators';

export function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('');
  const [annualReturn, setAnnualReturn] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<string>('');
  const [result, setResult] = useState<{ maturityValue: number; investedAmount: number; gains: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const monthly = parseFloat(monthlyInvestment);
    const returnRate = parseFloat(annualReturn);
    const years = parseFloat(timePeriod);

    const calculation = calculateSip(monthly, returnRate, years);
    
    if (calculation.error) {
      setError(calculation.error);
    } else {
      setResult({
        maturityValue: calculation.maturityValue,
        investedAmount: calculation.investedAmount,
        gains: calculation.gains,
      });
    }
  };

  return (
    <ToolShell
      title="SIP Calculator"
      description="Calculate your Systematic Investment Plan returns"
      actionButton={{
        label: 'Calculate Returns',
        onClick: handleCalculate,
        disabled: !monthlyInvestment || !annualReturn || !timePeriod,
      }}
      result={result ? {
        content: (
          <div className="space-y-3">
            {error && <p className="text-destructive text-sm">{error}</p>}
            {!error && result && (
              <>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Maturity Value:</span>
                  <span className="text-lg font-bold text-primary">₹{result.maturityValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Total Invested:</span>
                  <span className="text-lg font-semibold">₹{result.investedAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Estimated Gains:</span>
                  <span className="text-lg font-semibold text-green-600">₹{result.gains.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="pt-2 text-sm text-muted-foreground">
                  <p>Monthly Investment: ₹{parseFloat(monthlyInvestment).toLocaleString('en-IN')}</p>
                  <p>Expected Return: {annualReturn}% per annum</p>
                  <p>Investment Period: {timePeriod} years</p>
                </div>
              </>
            )}
          </div>
        ),
      } : undefined}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="monthlyInvestment">Monthly Investment (₹)</Label>
          <Input
            id="monthlyInvestment"
            type="number"
            placeholder="e.g., 5000"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
          <Input
            id="annualReturn"
            type="number"
            step="0.1"
            placeholder="e.g., 12"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="timePeriod">Time Period (Years)</Label>
          <Input
            id="timePeriod"
            type="number"
            placeholder="e.g., 10"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          />
        </div>
      </div>
    </ToolShell>
  );
}
