import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">We'd love to hear from you</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Have questions, suggestions, or feedback? We're here to help! Reach out to us through the following
            channels:
          </p>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">SankalpHubsolutions@gmail.com</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Business Inquiries</h3>
            <p className="text-sm text-muted-foreground">
              For partnership opportunities or business-related questions, please email us at
              SankalpHubsolutions@gmail.com
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Support</h3>
            <p className="text-sm text-muted-foreground">
              Need help with our tools? Check our FAQ section or send us an email with your question.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
