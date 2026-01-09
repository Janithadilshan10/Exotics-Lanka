import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { ButtonLoading } from "@/components/ui/loading";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setEmailSent(true);
    setIsLoading(false);
    toast.success("Password reset link sent to your email");
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>

          {/* Header */}
          <h1 className="font-display text-3xl font-bold mb-3">
            Check Your Email
          </h1>
          <p className="text-muted-foreground mb-2">
            We've sent a password reset link to
          </p>
          <p className="font-medium mb-8">{email}</p>

          {/* Instructions */}
          <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left">
            <p className="text-sm text-muted-foreground mb-4">
              <strong>Next steps:</strong>
            </p>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Check your email inbox</li>
              <li>Click the reset password link</li>
              <li>Enter your new password</li>
              <li>Sign in with your new password</li>
            </ol>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link to="/login" className="block">
              <Button variant="gold" size="lg" className="w-full">
                Back to Sign In
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setEmailSent(false)}
            >
              Resend Email
            </Button>
          </div>

          {/* Help */}
          <p className="mt-8 text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Forgot Password - Reset Your Password"
        description="Reset your Exotics Lanka account password. Get back to buying and selling luxury vehicles in minutes."
        keywords="forgot password, reset password, password recovery"
      />
      <PageTransition>
        <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back to Login */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">
              Reset Password
            </h1>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-8 p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> For security reasons, we don't disclose whether an email address is registered. If you don't receive an email, please check your spam folder or contact support.
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 relative bg-muted items-center justify-center p-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
            alt="Luxury Car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40" />
        </div>
        
        <div className="relative z-10 max-w-lg text-center">
          <h2 className="font-display text-5xl font-bold mb-6">
            We've Got
            <span className="text-gold-gradient block">Your Back</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Your account security is our priority. We'll help you get back to finding your dream vehicle in no time.
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
    </>
  );
};

export default ForgotPassword;


