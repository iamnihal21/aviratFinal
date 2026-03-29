import { Skeleton } from "@/app/(frontend)/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-8 pt-32 space-y-12">
      <Skeleton className="h-20 w-3/4 max-w-2xl" />
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
      <div className="max-w-2xl mx-auto"><Skeleton className="h-12 w-full rounded-full" /></div>
      <div className="grid grid-cols-2 gap-12 max-w-7xl mx-auto">
        <Skeleton className="h-96 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </div>
  )
}