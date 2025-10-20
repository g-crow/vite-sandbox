import { useMemo, useState } from 'react';
import { useCheckIns } from '../hooks/useCheckIns';
import { uniqueCoaches, uniqueMembers } from '../utils/selectors';
import { sortByCoachName, type SortDir } from '../utils/sort';
import type { MemberCheckIn } from '../types/member';

import CheckInDashboardHeader from './CheckInDashboardHeader';
import CoachFilter from './CoachFilter';
import AddCheckInDialog from './AddCheckInDialog';
import CheckInTable from './CheckInTable';

import '../index.css';

export default function MemberCheckInDashboard() {
  const { entries, setEntries, loading } = useCheckIns();

  const [selectedCoachId, setSelectedCoachId] = useState<number | 'all'>('all');
  const [coachSortDir, setCoachSortDir] = useState<SortDir>('asc');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Derived lists
  const coaches = useMemo(() => uniqueCoaches(entries), [entries]);
  const members = useMemo(() => uniqueMembers(entries), [entries]);

  // Filter + sort
  const filtered = useMemo(() => {
    if (selectedCoachId === 'all') return entries;
    return entries.filter((e) => e.coach?.id === selectedCoachId);
  }, [entries, selectedCoachId]);

  const displayed = useMemo(
    () => sortByCoachName(filtered, coachSortDir),
    [filtered, coachSortDir]
  );

  const toggleCoachSort = () => setCoachSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));

  // Add flow
  const openAdd = () => setIsAddOpen(true);
  const closeAdd = () => setIsAddOpen(false);

  const handleSaveNew = (payload: {
    memberName: string;
    coachId: number;
    mood: MemberCheckIn['mood'];
    date: string;
    notes?: string;
  }) => {
    const coachObj = coaches.find((c) => c.id === payload.coachId);
    if (!coachObj) return;

    const nextId = (entries.length ? Math.max(...entries.map((e) => e.id)) : 0) + 1;

    const newEntry: MemberCheckIn = {
      id: nextId,
      memberName: payload.memberName,
      date: payload.date,
      mood: payload.mood,
      notes: payload.notes,
      coach: coachObj,
    };

    // Prepend newest
    setEntries((prev) => [newEntry, ...prev]);
    closeAdd();
  };

  return (
    <>
      {isAddOpen ? (
        // Only show dialog when open
        <AddCheckInDialog
          open={isAddOpen}
          members={members}
          coaches={coaches}
          onClose={closeAdd}
          onSave={handleSaveNew}
        />
      ) : (
        <>
          <CheckInDashboardHeader
            countLabel={loading ? 'Loading…' : `Total check-ins: ${entries.length}`}
            onAdd={openAdd}
          />

          <CoachFilter
            coaches={coaches}
            selectedCoachId={selectedCoachId}
            onChange={setSelectedCoachId}
          />

          <CheckInTable
            entries={loading ? [] : displayed}
            coachSortDir={coachSortDir}
            onToggleCoachSort={toggleCoachSort}
          />
        </>
      )}
    </>
  );
}
