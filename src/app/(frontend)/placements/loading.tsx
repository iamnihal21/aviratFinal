import { Skeleton } from "@/app/(frontend)/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen pt-32 px-8 space-y-12">
      <Skeleton className="h-24 w-2/3" />
      <div className="grid grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-40 rounded-xl" />)}
      </div>
      <div className="grid grid-cols-3 gap-8">
        {[1,2,3].map(i => <Skeleton key={i} className="h-64 rounded-xl" />)}
      </div>
    </div>
  )
}