import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About SankalpHub</h1>
        <p className="text-muted-foreground">Your trusted platform for free online tools</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            SankalpHub is dedicated to providing high-quality, free online tools for everyone. We believe that
            essential digital tools should be accessible to all, without barriers or hidden costs.
          </p>
          <p>
            Our platform offers a comprehensive suite of PDF tools, image processing utilities, and calculators
            designed to make your daily tasks easier and more efficient.
          </p>
          <p>
            All processing happens securely in your browser, ensuring your privacy and data security. We never
            store your files or personal information.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What We Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>PDF conversion, merging, splitting, and compression tools</li>
            <li>Image compression, resizing, and format conversion</li>
            <li>Practical calculators for everyday use</li>
            <li>Fast, secure, and completely free access</li>
            <li>No registration or sign-up required</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
