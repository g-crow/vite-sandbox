import type { Coach, MemberCheckIn } from '../types/member';

export function uniqueCoaches(entries: MemberCheckIn[]): Coach[] {
  const map = new Map<number, Coach>();
  for (const e of entries) {
    if (e.coach && !map.has(e.coach.id)) {
      map.set(e.coach.id, e.coach);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function uniqueMembers(entries: MemberCheckIn[]): string[] {
  const set = new Set<string>();
  for (const e of entries) set.add(e.memberName);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
