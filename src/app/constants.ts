export type CategoryId =
  | 'home'
  | 'respiratory'
  | 'icu'
  | 'cardiac';

export const CATEGORIES: {
  id: CategoryId;
  label: string;
}[] = [
  { id: 'home', label: 'ホーム' },
  { id: 'respiratory', label: '呼吸器' },
  { id: 'icu', label: '集中治療' },
  { id: 'cardiac', label: '循環器' },
];
