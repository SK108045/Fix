import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience in their fields.",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with peers, join study groups, and collaborate on projects.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn recognized certificates upon course completion to boost your career.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your learning journey with detailed analytics and milestones.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Access job opportunities and connect with potential employers.",
  },
  {
    icon: GraduationCap,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials.",
  },
];

const categories = [
  { name: "Business & Entrepreneurship", count: 45, icon: Briefcase },
  { name: "Digital Marketing", count: 32, icon: TrendingUp },
  { name: "Technology & IT", count: 58, icon: BookOpen },
  { name: "Finance & Accounting", count: 28, icon: Award },
];

const testimonials = [
  {
    name: "Sarah Wanjiku",
    role: "SME Owner",
    content: "Nairobi LMS transformed how I manage my business. The courses are practical and directly applicable.",
    rating: 5,
  },
  {
    name: "James Ochieng",
    role: "Software Developer",
    content: "The tech courses here are up-to-date and taught by experts. I landed my dream job after completing the full-stack program.",
    rating: 5,
  },
  {
    name: "Grace Muthoni",
    role: "Marketing Manager",
    content: "The digital marketing certification helped me advance my career. Highly recommended for professionals.",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Active Learners" },
  { value: "200+", label: "Expert Courses" },
  { value: "50+", label: "Industry Partners" },
  { value: "95%", label: "Success Rate" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-4">
                Empowering Nairobi&apos;s Future
              </Badge>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight lg:text-6xl">
                Learn Skills That <span className="text-primary">Transform</span> Your Career
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
                Join thousands of SMEs and youth in Nairobi gaining practical skills through 
                expert-led courses. Start your learning journey today.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/courses">
                  <Button size="lg" className="gap-2">
                    Browse Courses
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Play className="size-4" />
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 size-[400px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-[400px] rounded-full bg-accent/5 blur-3xl" />
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-primary lg:text-4xl">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Why Choose Nairobi LMS?</h2>
              <p className="text-muted-foreground">
                Everything you need to succeed in your learning journey, all in one platform.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Popular Categories</h2>
              <p className="text-muted-foreground">
                Explore our most popular course categories tailored for SMEs and professionals.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link key={category.name} href={`/courses?category=${encodeURIComponent(category.name)}`}>
                  <Card className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <category.icon className="size-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">{category.count} courses</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/courses">
                <Button variant="outline" className="gap-2">
                  View All Categories
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">What Our Learners Say</h2>
              <p className="text-muted-foreground">
                Join thousands of satisfied learners who have transformed their careers.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="bg-card">
                  <CardContent className="p-6">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-4 text-muted-foreground">&quot;{testimonial.content}&quot;</p>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
              <p className="mb-8 text-primary-foreground/80">
                Join our community of learners and start building the skills you need 
                to succeed in today&apos;s competitive market.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Get Started Free
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                    <Clock className="size-4" />
                    Browse Courses
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4" />
                  <span>7-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
