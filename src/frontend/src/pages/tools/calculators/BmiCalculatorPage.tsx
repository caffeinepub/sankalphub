import { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateBmi } from '@/utils/calculators';

export function BmiCalculatorPage() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<{ bmi: number; category: string; categoryColor: string } | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const h = parseFloat(height);
    const w = parseFloat(weight);

    const calculation = calculateBmi(h, w);
    
    if (calculation.error) {
      setError(calculation.error);
    } else {
      setResult({
        bmi: calculation.bmi,
        category: calculation.category,
        categoryColor: calculation.categoryColor,
      });
    }
  };

  return (
    <ToolShell
      title="BMI Calculator"
      description="Calculate your Body Mass Index and health category"
      actionButton={{
        label: 'Calculate BMI',
        onClick: handleCalculate,
        disabled: !height || !weight,
      }}
      result={result ? {
        content: (
          <div className="space-y-3">
            {error && <p className="text-destructive text-sm">{error}</p>}
            {!error && result && (
              <>
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-primary mb-2">
                    {result.bmi.toFixed(1)}
                  </p>
                  <p className={`text-xl font-semibold ${result.categoryColor}`}>
                    {result.category}
                  </p>
                </div>
                <div className="pt-4 border-t space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-600">Underweight:</span>
                    <span>&lt; 18.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Normal:</span>
                    <span>18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600">Overweight:</span>
                    <span>25 - 29.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">Obese:</span>
                    <span>≥ 30</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ),
      } : undefined}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="e.g., 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            placeholder="e.g., 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>
    </ToolShell>
  );
}
