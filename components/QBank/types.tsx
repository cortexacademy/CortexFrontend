
export interface ChapterProps {
  id: number;
  name: string;
  description: string;
}

export interface Subject {
  id: number;
  name: string;
  chapters: ChapterProps[];
}
