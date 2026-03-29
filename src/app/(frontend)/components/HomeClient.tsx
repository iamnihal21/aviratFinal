'use client'

import { useState, useEffect } from 'react'
import { Hero } from './hero'
import { Testimonials } from './testimonials'
import { ApplyNow } from './ApplyNow'
import { MessageSection } from './message'
import { HomeGallery } from './HomeGallery'
import { MapSection } from './mapSection'
import { Stats } from './stats'
import { CourseStructure } from './subjects'
import { CourseDialog } from './courseSelection'
import { CourseType } from '@/types/course'
import { WhyChooseUs } from './WhyChoseUs'

export default function HomeClient({
  homeData,
  galleryImages,
}: {
  homeData: any
  galleryImages: any[]
}) {
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null)

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse') as CourseType | null
    if (savedCourse) {
      setSelectedCourse(savedCourse)
    }
  }, [])

  const handleCourseSelect = (course: CourseType) => {
    setSelectedCourse(course)
    localStorage.setItem('selectedCourse', course)
  }

  return (
    <main>
      <Hero data={homeData?.slides} />

      <CourseDialog onSelect={handleCourseSelect} />

      {selectedCourse && (
        <>
          <Stats data={homeData?.stats} />
          <HomeGallery images={galleryImages} />
          <CourseStructure courseType={selectedCourse} data={homeData?.courses} />
          <Testimonials data={homeData?.testimonials} />
        </>
      )}

      <WhyChooseUs data={homeData?.whyChooseUs} />
      <MapSection />
      <ApplyNow />
      <MessageSection
        sanskritQuote={homeData?.sanskritQuote}
        quoteTranslation={homeData?.quoteTranslation}
      />
    </main>
  )
}