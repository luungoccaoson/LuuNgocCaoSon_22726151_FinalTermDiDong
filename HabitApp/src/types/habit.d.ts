export type Habit = {
    id?: number; 
  title: string;
  description: string;
  active: 0 | 1; 
  done_today: 0 | 1; 
  created_at: number; 
}