import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: February 6, 2026</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agreement to Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            By accessing and using SankalpHub, you agree to be bound by these Terms of Service and all applicable
            laws and regulations.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Use of Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Our services are provided free of charge for personal and commercial use. You may use our tools to
            process your files without any restrictions.
          </p>
          <p>
            You agree not to misuse our services, including but not limited to: attempting to gain unauthorized
            access, interfering with the proper functioning of the website, or using automated systems to access
            the services excessively.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disclaimer of Warranties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Our services are provided "as is" without any warranties, express or implied. We do not guarantee that
            our services will be uninterrupted, error-free, or completely secure.
          </p>
          <p>
            While we strive to provide accurate and reliable tools, we are not responsible for any loss or damage
            resulting from the use of our services.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Limitation of Liability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            SankalpHub and its operators shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages resulting from your use of or inability to use the services.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Changes to Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services after changes
            constitutes acceptance of the modified terms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
