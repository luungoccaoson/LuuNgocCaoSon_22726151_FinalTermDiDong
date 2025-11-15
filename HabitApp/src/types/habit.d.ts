export type Habit = {
    id?: number; 
  title: string;
  description: string;
  active: boolean; 
  done_today: 0 | 1; 
  created_at: number; 
}