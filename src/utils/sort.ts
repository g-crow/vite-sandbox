import type { MemberCheckIn } from '../types/member';

export type SortDir = 'asc' | 'desc';

export function sortByCoachName(arr: MemberCheckIn[], dir: SortDir): MemberCheckIn[] {
  const copy = [...arr];
  copy.sort((a, b) => {
    const an = a.coach?.name ?? '';
    const bn = b.coach?.name ?? '';
    const cmp = an.localeCompare(bn);
    return dir === 'asc' ? cmp : -cmp;
  });
  return copy;
}
