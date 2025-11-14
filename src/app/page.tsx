'use client';

import Link from 'next/link';
import { Upload, FileText, Lightbulb, HelpCircle} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

import { Mail, Github, Linkedin, Instagram, Phone } from 'lucide-react';

export default function LandingPage() {
  const { user, loading } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          {loading ? (
             <Skeleton className="h-10 w-32" />
          ) : user ? (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 text-center sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Unlock Insights from Your Documents
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Document Summary Assistant is an intelligent assistant that summarizes your documents, answers your questions, and challenges your knowledge. Upload a file and let the magic begin.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href={user ? "/dashboard" : "/login"}>Let's Start</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Powerful Features at Your Fingertips
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to understand your documents faster and deeper.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
              <FeatureCard
                icon={<Upload className="h-8 w-8 text-primary" />}
                title="Seamless Document Upload"
                description="Easily upload your PDF or TXT files. Our system securely handles your documents and prepares them for AI processing."
              />
              <FeatureCard
                icon={<FileText className="h-8 w-8 text-primary" />}
                title="Instant AI Summaries"
                description="Get concise, AI-generated summaries of your documents in seconds. Grasp key points without reading through pages of text."
              />
              <FeatureCard
                icon={<HelpCircle className="h-8 w-8 text-primary" />}
                title="Ask Anything Mode"
                description="Chat with your document. Ask specific questions and get answers with justifications, pulled directly from the source material."
              />
              <FeatureCard
                icon={<Lightbulb className="h-8 w-8 text-primary" />}
                title="Challenge Me Mode"
                description="Test your comprehension with AI-generated questions based on your document. A fun way to ensure you've understood the content."
              />
            </div>
          </div>
        </section>
      </main>

     

      <footer className="border-t bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 py-12">
  <div className="mx-auto max-w-7xl px-4 sm:px-6">
    {/* Creator Section */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
        <span className="text-2xl font-bold text-white">BK</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Bharath Kolli</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        MERN Stack Developer || Software developer || DSA || Azure
      </p>
    </div>

    {/* Contact Information */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
      <div className="flex items-center text-sm text-muted-foreground">
        <Mail className="h-4 w-4 mr-2 text-blue-500" />
        <a href="mailto:bharathkolli24@gmail.com" className="hover:text-foreground transition-colors">
          bharathkolli24@gmail.com
        </a>
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <Phone className="h-4 w-4 mr-2 text-green-500" />
        <a href="tel:+919392538391" className="hover:text-foreground transition-colors">
          +91 9392538391
        </a>
      </div>
    </div>

    {/* Social Media Links */}
    <div className="flex justify-center items-center space-x-6 mb-8">
      <a
        href="mailto:bharathkolli24@gmail.com"
        className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Email"
      >
        <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </a>
      
      <a
        href="https://www.linkedin.com/in/contactbharathkolli/"
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </a>
      
      <a 
        href="https://github.com/Bharathkolli24"
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="GitHub"
      >
        <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </a>
      
      <a 
        href="https://www.instagram.com/bharathhhh_____?igsh=NHpuOXQwZG1lajc2" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </a>
    </div>

    {/* Divider */}
    <div className="border-t border-muted-foreground/20 pt-6">
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
        <p className="mb-2 sm:mb-0">
          © {new Date().getFullYear()} Document Summary Assistant. All rights reserved.
        </p>
        <p className="flex items-center">
          Developed by 
          <span className="text-red-500 mx-1 animate-pulse">❤️</span> 
          Bharath Kolli
        </p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <CardTitle className="pt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
