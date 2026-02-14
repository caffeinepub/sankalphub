import { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateAge } from '@/utils/calculators';
import { RelatedTools } from '@/components/tools/RelatedTools';

export function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    if (!birthDate) {
      setError('Please enter your date of birth');
      return;
    }

    const date = new Date(birthDate);
    const calculation = calculateAge(date);
    
    if (calculation.error) {
      setError(calculation.error);
    } else {
      setResult({
        years: calculation.years,
        months: calculation.months,
        days: calculation.days,
      });
    }
  };

  return (
    <>
      <ToolShell
        title="Age Calculator"
        description="Calculate your exact age in years, months, and days. The Age Calculator is a simple and accurate tool that instantly calculates your age. Just select your date of birth and get a detailed breakdown within seconds. This tool is helpful for school forms, official documents, job applications, and personal curiosity."
        actionButton={{
          label: 'Calculate Age',
          onClick: handleCalculate,
          disabled: !birthDate,
        }}
        result={result ? {
          content: (
            <div className="space-y-3">
              {error && <p className="text-destructive text-sm">{error}</p>}
              {!error && result && (
                <>
                  <div className="text-center py-4">
                    <p className="text-3xl font-bold text-primary mb-2">
                      {result.years} Years
                    </p>
                    <p className="text-xl text-muted-foreground">
                      {result.months} Months, {result.days} Days
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{result.years}</p>
                      <p className="text-sm text-muted-foreground">Years</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{result.months}</p>
                      <p className="text-sm text-muted-foreground">Months</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{result.days}</p>
                      <p className="text-sm text-muted-foreground">Days</p>
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
            <Label htmlFor="birthDate">Date of Birth</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </ToolShell>
      <RelatedTools currentTool="age" />
    </>
  );
}
