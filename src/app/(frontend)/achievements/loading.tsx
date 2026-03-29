import { Skeleton } from "@/app/(frontend)/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-8 pt-32 space-y-12">
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48 rounded-full" />
        <Skeleton className="h-16 w-3/4" />
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}
      </div>
    </div>
  )
}