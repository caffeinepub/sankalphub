import { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculatePercentage, calculatePercentageChange } from '@/utils/calculators';

export function PercentageCalculatorPage() {
  const [value, setValue] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [oldValue, setOldValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [changeResult, setChangeResult] = useState<{ percentageChange: number; increase: boolean } | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculatePercentage = () => {
    setError('');
    setResult(null);

    const v = parseFloat(value);
    const p = parseFloat(percentage);

    const calculation = calculatePercentage(v, p);
    
    if (calculation.error) {
      setError(calculation.error);
    } else {
      setResult(calculation.result);
    }
  };

  const handleCalculateChange = () => {
    setError('');
    setChangeResult(null);

    const oldVal = parseFloat(oldValue);
    const newVal = parseFloat(newValue);

    const calculation = calculatePercentageChange(oldVal, newVal);
    
    if (calculation.error) {
      setError(calculation.error);
    } else {
      setChangeResult({
        percentageChange: calculation.percentageChange,
        increase: calculation.increase,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Percentage Calculator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate percentages and percentage changes instantly with our free percentage calculator. This online tool helps you find what percentage one number is of another, calculate percentage increases or decreases, and solve percentage problems quickly and accurately.
        </p>
      </div>
      
      <ToolShell
        title=""
        description=""
      >
        <Tabs defaultValue="percentage" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="percentage">Percentage Of</TabsTrigger>
            <TabsTrigger value="change">Percentage Change</TabsTrigger>
          </TabsList>
          
          <TabsContent value="percentage" className="space-y-4">
            <div>
              <Label htmlFor="percentage">Percentage (%)</Label>
              <Input
                id="percentage"
                type="number"
                placeholder="e.g., 20"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="value">Of Value</Label>
              <Input
                id="value"
                type="number"
                placeholder="e.g., 500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button
              onClick={handleCalculatePercentage}
              disabled={!value || !percentage}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              Calculate
            </button>
            {result !== null && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">Result:</h3>
                <p className="text-2xl font-bold text-primary">
                  {percentage}% of {value} = {result.toFixed(2)}
                </p>
              </div>
            )}
            {error && <p className="text-destructive text-sm">{error}</p>}
          </TabsContent>
          
          <TabsContent value="change" className="space-y-4">
            <div>
              <Label htmlFor="oldValue">Original Value</Label>
              <Input
                id="oldValue"
                type="number"
                placeholder="e.g., 100"
                value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="newValue">New Value</Label>
              <Input
                id="newValue"
                type="number"
                placeholder="e.g., 150"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
            <button
              onClick={handleCalculateChange}
              disabled={!oldValue || !newValue}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              Calculate Change
            </button>
            {changeResult !== null && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">Result:</h3>
                <p className="text-2xl font-bold text-primary">
                  {changeResult.increase ? '↑' : '↓'} {changeResult.percentageChange.toFixed(2)}%
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {changeResult.increase ? 'Increase' : 'Decrease'} from {oldValue} to {newValue}
                </p>
              </div>
            )}
            {error && <p className="text-destructive text-sm">{error}</p>}
          </TabsContent>
        </Tabs>
      </ToolShell>
    </div>
  );
}
