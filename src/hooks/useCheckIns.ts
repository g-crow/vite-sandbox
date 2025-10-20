import { useEffect, useState } from 'react';
import type { MemberCheckIn } from '../types/member';
import raw from '../data/mockCheckIns.json';

export function useCheckIns() {
  const [entries, setEntries] = useState<MemberCheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async load
    const t = setTimeout(() => {
      setEntries(raw as MemberCheckIn[]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return { entries, setEntries, loading };
}
