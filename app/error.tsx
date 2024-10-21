'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-xl font-bold text-accent mb-2">
        Something went wrong!
      </h2>

      <Button
        variant={'outline'}
        className='hover:bg-muted  hover:text-muted-foreground'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Please try again.
      </Button>
    </div>
  )
}