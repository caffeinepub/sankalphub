import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: February 6, 2026</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Privacy Matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            At SankalpHub, we take your privacy seriously. This Privacy Policy explains how we handle your
            information when you use our services.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Collection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We do not collect, store, or transmit any of your files or personal data. All file processing happens
            locally in your browser using client-side JavaScript.
          </p>
          <p>
            We may collect anonymous usage statistics to improve our services, but this data cannot be used to
            identify individual users.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your files never leave your device. All conversions, compressions, and processing operations are
            performed entirely within your web browser.
          </p>
          <p>
            Once you close your browser tab, all processed files are automatically removed from your device's
            temporary memory.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cookies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We use minimal cookies to enhance your browsing experience, such as remembering your theme preference
            (light or dark mode). These cookies do not track your personal information.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
            updated revision date.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
