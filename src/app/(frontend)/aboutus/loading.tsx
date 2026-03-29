import { Skeleton } from "@/app/(frontend)/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-8 pt-32 space-y-20">
      <div className="max-w-3xl space-y-6">
        <Skeleton className="h-10 w-40 rounded-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-24 w-2/3" />
      </div>
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <Skeleton className="h-[400px] rounded-3xl" />
        <Skeleton className="h-[400px] rounded-3xl" />
      </div>
    </div>
  )
}