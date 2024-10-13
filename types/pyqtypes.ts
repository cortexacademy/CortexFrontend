export type Exam = {
  id: number;
  name: string;
};

export type Subject = {
  id: number;
  name: string;
  description?: string;
};

export type Year = {
  id: number;
  year: number;
};

export type Topic = {
  id: number;
  name: string;
  description?: string;
};

export type StudyMaterialType = {
  id: number;
  statement: string;
};
