import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CardSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="w-24 h-6 rounded-lg" />
            <Skeleton className="w-20 h-4 rounded-lg" />
          </div>
        </div>
        <Skeleton className="w-16 h-8 rounded-lg" />
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-3">
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-7 rounded-lg" />
        <Skeleton className="w-1/2 h-5 rounded-lg" />
      </div>

      <div className="space-y-2 bg-c-crust rounded-lg p-4">
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-3/4 h-4 rounded" />
        <Skeleton className="w-1/2 h-4 rounded" />
      </div>
    </CardContent>
  </Card>
)

export const SnippetsPageSkeleton = () => (
  <div className="min-h-screen">
    {/* Ambient background with loading pulse */}
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="absolute top-[20%] -left-1/4 size-96 bg-c-blue/20 rounded-full blur-3xl" />
      <div className="absolute top-[20%] -right-1/4 size-96 bg-c-mauve/20 rounded-full blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <Skeleton className="w-48 h-8 rounded-full mx-auto" />
        <Skeleton className="w-96 h-12 rounded-xl mx-auto" />
        <Skeleton className="w-72 h-7 rounded-xl mx-auto" />
      </div>

      <div className="max-w-5xl mx-auto mb-12 space-y-6">
        <Skeleton className="w-full h-14 rounded-xl border-border" />
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={`sk-l-${i}`}
              className="w-24 h-8 rounded-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={`sk-snip-${i}`}>
            <CardSkeleton />
          </div>
        ))}
      </div>
    </div>
  </div>
)
