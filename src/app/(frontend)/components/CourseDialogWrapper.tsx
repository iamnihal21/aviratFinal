'use client'

import { useState, useEffect, ReactNode } from 'react'
import { CourseDialog } from './courseSelection'
import { CourseType } from '@/types/course'

interface Props {
  // Define props to receive the data from the server
  statsSection: ReactNode 
  gallerySection: ReactNode
  testimonialsSection: ReactNode
  // We'll handle the subject structure internally based on the selected course
  courseStructureComponent: (course: CourseType) => ReactNode
}

export function CourseDialogWrapper({ 
  statsSection, 
  gallerySection, 
  testimonialsSection,
  courseStructureComponent 
}: Props) {
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('selectedCourse') as CourseType | null
    if (saved) setSelectedCourse(saved)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CourseDialog onSelect={(c) => setSelectedCourse(c)} />
      
      {selectedCourse && (
        <>
          {statsSection}
          {gallerySection}
          {courseStructureComponent(selectedCourse)}
          {testimonialsSection}
        </>
      )}
    </>
  )
}