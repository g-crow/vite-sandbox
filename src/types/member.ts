export interface Coach {
  id: number;
  name: string;
}

export type Mood = '😞' | '😐' | '😀';

export interface MemberCheckIn {
  id: number;
  memberName: string;
  date: string; // ISO yyyy-mm-dd
  mood: Mood;
  notes?: string;
  coach: Coach;
}
