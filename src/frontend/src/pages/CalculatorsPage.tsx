import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Calendar, Activity, Percent, TrendingUp, DollarSign } from 'lucide-react';
import { ROUTES } from '../routes';

interface Calculator {
  title: string;
  description: string;
  icon: typeof Calculator;
  color: string;
  route: string;
}

export function CalculatorsPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const calculators: Calculator[] = [
    { title: 'EMI Calculator', description: 'Calculate loan EMI and interest', icon: Calculator, color: 'text-blue-500', route: ROUTES.EMI_CALCULATOR },
    { title: 'Loan Calculator', description: 'Calculate loan payments and totals', icon: DollarSign, color: 'text-green-500', route: ROUTES.LOAN_CALCULATOR },
    { title: 'Age Calculator', description: 'Calculate your exact age', icon: Calendar, color: 'text-purple-500', route: ROUTES.AGE_CALCULATOR },
    { title: 'BMI Calculator', description: 'Calculate body mass index', icon: Activity, color: 'text-orange-500', route: ROUTES.BMI_CALCULATOR },
    { title: 'GST Calculator', description: 'Calculate GST amount', icon: Percent, color: 'text-pink-500', route: ROUTES.GST_CALCULATOR },
    { title: 'Percentage Calculator', description: 'Calculate percentages easily', icon: Percent, color: 'text-blue-500', route: ROUTES.PERCENTAGE_CALCULATOR },
    { title: 'SIP Calculator', description: 'Calculate SIP investment returns', icon: TrendingUp, color: 'text-green-500', route: ROUTES.SIP_CALCULATOR },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">All-in-One Calculators</h1>
        <p className="text-muted-foreground">Choose from our collection of financial and utility calculators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => {
          const Icon = calculator.icon;
          return (
            <Card
              key={calculator.title}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-2 group"
              onClick={() => onNavigate(calculator.route)}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-7 h-7 ${calculator.color}`} />
                </div>
                <CardTitle className="text-xl">{calculator.title}</CardTitle>
                <CardDescription>{calculator.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
