export interface Coach {
  id: number;
  name: string;
}

export interface MemberCheckIn {
  id: number;
  memberName: string;
  date: string;
  mood: any; // TS FIXME
  notes?: string;
  coach: Coach;
}
