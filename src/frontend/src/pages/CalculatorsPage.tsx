import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, DollarSign, Calendar, Activity, Percent, TrendingUp } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { ROUTES } from '../routes';

interface Tool {
  title: string;
  description: string;
  icon: typeof Calculator;
  color: string;
  route: string;
}

export function CalculatorsPage() {
  const tools: Tool[] = [
    { title: 'EMI Calculator', description: 'Calculate loan EMI', icon: Calculator, color: 'text-blue-500', route: ROUTES.EMI_CALCULATOR },
    { title: 'Loan Calculator', description: 'Calculate loan payments', icon: DollarSign, color: 'text-green-500', route: ROUTES.LOAN_CALCULATOR },
    { title: 'Age Calculator', description: 'Calculate your exact age', icon: Calendar, color: 'text-purple-500', route: ROUTES.AGE_CALCULATOR },
    { title: 'BMI Calculator', description: 'Calculate body mass index', icon: Activity, color: 'text-orange-500', route: ROUTES.BMI_CALCULATOR },
    { title: 'GST Calculator', description: 'Calculate GST amount', icon: Percent, color: 'text-pink-500', route: ROUTES.GST_CALCULATOR },
    { title: 'Percentage Calculator', description: 'Calculate percentages', icon: Percent, color: 'text-blue-500', route: ROUTES.PERCENTAGE_CALCULATOR },
    { title: 'SIP Calculator', description: 'Calculate SIP returns', icon: TrendingUp, color: 'text-green-500', route: ROUTES.SIP_CALCULATOR },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Calculators</h1>
        <p className="text-muted-foreground">Financial and utility calculators for everyday use</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.title} to={tool.route}>
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-2 group h-full">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-7 h-7 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
