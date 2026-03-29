import { Skeleton } from "@/app/(frontend)/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-8 pt-32 space-y-12">
      <Skeleton className="h-20 w-1/2" />
      <div className="grid grid-cols-4 gap-6"><Skeleton className="h-32 rounded-xl" /></div>
      <div className="grid grid-cols-3 gap-4 h-[500px]">
        <Skeleton className="col-span-2 row-span-2" />
        <Skeleton /><Skeleton />
      </div>
    </div>
  )
}