// src/types/course.ts

export type CourseType = 'bca' | 'bba';

export interface Subject {
  code: string;
  name: string;
  credits: number;
  type: string;
}

export interface Semester {
  id: number;
  name: string;
  subjects: Subject[];
}

export interface CourseStructureData {
  title: string;
  shortTitle: string;
  duration: string;
  totalCredits: number;
  eligibility: string;
  semesters: Semester[];
  careerProspects: string[];
}