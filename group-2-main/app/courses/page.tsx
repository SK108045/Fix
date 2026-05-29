import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import { CourseCard, CourseCardSkeleton } from "@/components/courses/course-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import type { Course, Category } from "@/types";

interface CoursesPageProps {
  searchParams: Promise<{ category?: string; search?: string; difficulty?: string }>;
}

async function getCourses(filters: { category?: string; search?: string; difficulty?: string }) {
  const supabase = await createClient();
  
  let query = supabase
    .from("courses")
    .select(`
      *,
      instructor:profiles!courses_instructor_id_fkey(id, full_name, avatar_url),
      category:categories(id, name, slug)
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (filters.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }

  if (filters.difficulty) {
    query = query.eq("difficulty", filters.difficulty);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }

  // Filter by category name if provided
  let courses = data || [];
  if (filters.category) {
    courses = courses.filter(
      (course) => course.category?.name?.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  return courses as unknown as Course[];
}

async function getCategories() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data as Category[];
}

function CoursesGrid({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
          <Search className="size-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function CoursesGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const [courses, categories] = await Promise.all([
    getCourses(params),
    getCategories(),
  ]);

  const difficulties = ["beginner", "intermediate", "advanced"];

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-3xl font-bold lg:text-4xl">Browse Courses</h1>
            <p className="max-w-2xl text-muted-foreground">
              Explore our library of expert-led courses designed to help you develop 
              practical skills for your career.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border py-4">
          <div className="container mx-auto px-4">
            <form className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="search"
                  placeholder="Search courses..."
                  defaultValue={params.search}
                  className="pl-10"
                />
              </div>
              <Button type="submit" variant="secondary">
                <Filter className="mr-2 size-4" />
                Search
              </Button>
            </form>
            
            {/* Category Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="/courses">
                <Badge
                  variant={!params.category ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  All
                </Badge>
              </a>
              {categories.map((category) => (
                <a key={category.id} href={`/courses?category=${encodeURIComponent(category.name)}`}>
                  <Badge
                    variant={params.category === category.name ? "default" : "outline"}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </Badge>
                </a>
              ))}
            </div>

            {/* Difficulty Pills */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              {difficulties.map((diff) => (
                <a
                  key={diff}
                  href={`/courses?${params.category ? `category=${params.category}&` : ""}${params.search ? `search=${params.search}&` : ""}difficulty=${diff}`}
                >
                  <Badge
                    variant={params.difficulty === diff ? "secondary" : "outline"}
                    className="cursor-pointer capitalize"
                  >
                    {diff}
                  </Badge>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {courses.length} course{courses.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <Suspense fallback={<CoursesGridSkeleton />}>
              <CoursesGrid courses={courses} />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
