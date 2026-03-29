import { Skeleton } from "@/app/(frontend)/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-8 pt-32 space-y-16">
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48 rounded-full" />
        <Skeleton className="h-16 w-3/4" />
      </div>
      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
      </div>
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-[500px] rounded-3xl" />
      </div>
    </div>
  )
}