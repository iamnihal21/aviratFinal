import { Skeleton } from "@/app/(frontend)/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-8 pt-32 space-y-8">
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48 rounded-full" />
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="flex gap-4"><Skeleton className="h-10 w-24" /><Skeleton className="h-10 w-24" /></div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-96 rounded-2xl" />)}
      </div>
    </div>
  )
}