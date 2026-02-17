import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <CardDescription>
            Your personalized dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Welcome to your dashboard. This is where you can manage your application.
          </p>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/about">About</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
