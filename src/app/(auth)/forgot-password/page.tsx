"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Call API to send password reset email
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-clr-background relative p-4">
      {/* Background decoration - Theme-aware ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-clr-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-clr-secondary/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      <Card className="w-full max-w-md relative z-10 glass-card shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-2xl bg-clr-primary-subtle border border-clr-border">
              {isSubmitted ? (
                <CheckCircle2 className="h-8 w-8 text-clr-success" />
              ) : (
                <Sparkles className="h-8 w-8 text-clr-primary" />
              )}
            </div>
          </div>
          <CardTitle className="text-3xl font-bold gradient-accent">
            {isSubmitted ? "Check Your Email" : "Forgot Password?"}
          </CardTitle>
          <CardDescription className="text-clr-muted-foreground text-base">
            {isSubmitted
              ? "We've sent you a password reset link"
              : "Enter your email to reset your password"}
          </CardDescription>
        </CardHeader>

        {isSubmitted ? (
          <>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-clr-success-subtle border border-clr-success/20 text-clr-success">
                <p className="text-sm text-center">
                  If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
                </p>
              </div>
              <p className="text-xs text-center text-clr-muted-foreground">
                Didn't receive an email? Check your spam folder or try again.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                variant="outline"
                className="w-full border-clr-border bg-clr-surface hover:bg-clr-surface-hover text-clr-foreground"
              >
                Try Another Email
              </Button>
              <Link href="/login" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full text-clr-muted-foreground hover:text-clr-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </CardFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-clr-danger-subtle border border-clr-danger/20 text-clr-danger text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-clr-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-clr-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    disabled={isLoading}
                    className="pl-10 bg-clr-input border-clr-border focus:border-clr-primary focus:ring-clr-ring/20 text-clr-foreground placeholder:text-clr-muted-foreground"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 btn-primary font-medium shadow-lg shadow-clr-primary/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Link href="/login" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full text-clr-muted-foreground hover:text-clr-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
              <div className="text-sm text-center text-clr-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-clr-primary hover:text-clr-primary-hover font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}

