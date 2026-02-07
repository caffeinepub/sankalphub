import { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateGst } from '@/utils/calculators';

export function GstCalculatorPage() {
  const [amount, setAmount] = useState<string>('');
  const [gstRate, setGstRate] = useState<string>('18');
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [result, setResult] = useState<{ gstAmount: number; total: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate);

    const calculation = calculateGst(amt, rate, mode);
    
    if (calculation.error) {
      setError(calculation.error);
    } else {
      setResult({
        gstAmount: calculation.gstAmount,
        total: calculation.total,
      });
    }
  };

  return (
    <ToolShell
      title="GST Calculator"
      description="Calculate GST amount and total with add or remove mode"
      actionButton={{
        label: 'Calculate GST',
        onClick: handleCalculate,
        disabled: !amount || !gstRate,
      }}
      result={result ? {
        content: (
          <div className="space-y-3">
            {error && <p className="text-destructive text-sm">{error}</p>}
            {!error && result && (
              <>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">GST Amount ({gstRate}%):</span>
                  <span className="text-lg font-bold text-primary">₹{result.gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">{mode === 'add' ? 'Total Amount:' : 'Base Amount:'}</span>
                  <span className="text-lg font-semibold">₹{result.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">{mode === 'add' ? 'Base Amount:' : 'Total Amount:'}</span>
                  <span className="text-lg">₹{parseFloat(amount).toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        ),
      } : undefined}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="e.g., 10000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="gstRate">GST Rate (%)</Label>
          <Select value={gstRate} onValueChange={setGstRate}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="12">12%</SelectItem>
              <SelectItem value="18">18%</SelectItem>
              <SelectItem value="28">28%</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="mode">Mode</Label>
          <Select value={mode} onValueChange={(value) => setMode(value as 'add' | 'remove')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Add GST</SelectItem>
              <SelectItem value="remove">Remove GST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </ToolShell>
  );
}
