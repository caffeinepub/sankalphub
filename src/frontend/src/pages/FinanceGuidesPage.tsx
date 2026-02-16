import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function FinanceGuidesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Finance Guides</h1>
        <p className="text-muted-foreground">Expert financial guidance and resources to help you make informed decisions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Understanding EMI</CardTitle>
            <CardDescription>Learn how Equated Monthly Installments work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. Understanding EMI calculations helps you plan your loan repayments effectively.
            </p>
            <p className="text-sm text-muted-foreground">
              Key factors affecting EMI include the principal amount, interest rate, and loan tenure. A longer tenure reduces monthly EMI but increases total interest paid.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SIP Investment Strategy</CardTitle>
            <CardDescription>Systematic Investment Plan basics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds. This disciplined approach helps build wealth over time through the power of compounding.
            </p>
            <p className="text-sm text-muted-foreground">
              Starting early and staying consistent are key to maximizing SIP returns. Even small monthly investments can grow significantly over the long term.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Planning</CardTitle>
            <CardDescription>Smart borrowing strategies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Before taking a loan, assess your repayment capacity and compare interest rates from different lenders. Consider factors like processing fees, prepayment charges, and loan tenure flexibility.
            </p>
            <p className="text-sm text-muted-foreground">
              Maintain a good credit score to secure better interest rates. Always read the fine print and understand all terms and conditions before signing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GST Essentials</CardTitle>
            <CardDescription>Understanding Goods and Services Tax</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              GST is an indirect tax levied on the supply of goods and services in India. Businesses need to understand GST calculations for accurate pricing and compliance.
            </p>
            <p className="text-sm text-muted-foreground">
              Different GST rates apply to different categories of goods and services. Proper GST management helps businesses maintain transparency and avoid penalties.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Planning Tips</CardTitle>
            <CardDescription>Building a secure financial future</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Create a budget, track expenses, and build an emergency fund covering 6-12 months of expenses. Diversify investments across different asset classes to manage risk.
            </p>
            <p className="text-sm text-muted-foreground">
              Set clear financial goals with timelines. Review and adjust your financial plan regularly based on life changes and market conditions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Saving Strategies</CardTitle>
            <CardDescription>Optimize your tax liability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Utilize tax-saving instruments like ELSS, PPF, and NPS to reduce taxable income. Plan investments early in the financial year to maximize benefits.
            </p>
            <p className="text-sm text-muted-foreground">
              Keep proper documentation of all investments and expenses. Consult a tax professional for personalized advice based on your financial situation.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Use Our Financial Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Make informed financial decisions using our free online calculators. Calculate EMI, plan SIP investments, estimate loan repayments, and more.
          </p>
          <p className="text-sm text-muted-foreground">
            All our tools are free, secure, and easy to use. No registration required.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
