import { useState, useEffect, useMemo } from 'react';
import type { MemberCheckIn } from '../types/member';
import checkIns from '../data/mockCheckIns.json';

import '../index.css';

type SortDir = 'asc' | 'desc';
const MOODS = ['😞', '😐', '😀'] as const;

export default function MemberCheckInDashboard() {
  const [entries, setEntries] = useState<MemberCheckIn[]>([]);
  const [selectedCoachId, setSelectedCoachId] = useState<number | 'all'>('all');
  const [coachSortDir, setCoachSortDir] = useState<SortDir>('asc');

  // "Add" panel state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState<string>('');
  const [newCoachId, setNewCoachId] = useState<number | ''>('');
  const [newMood, setNewMood] = useState<(typeof MOODS)[number] | ''>('');
  const [newNotes, setNewNotes] = useState('');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    // Simulate async load
    setTimeout(() => setEntries(checkIns), 1000);
  }, []);

  // Unique coaches from data
  const coaches = useMemo(() => {
    const map = new Map<number, { id: number; name: string }>();
    for (const e of entries) {
      if (e.coach && !map.has(e.coach.id)) map.set(e.coach.id, e.coach);
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [entries]);

  // Unique members from data (based on name in mock data)
  const members = useMemo(() => {
    const set = new Set<string>();
    for (const e of entries) set.add(e.memberName);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [entries]);

  // Filter by coach
  const filtered = useMemo(() => {
    if (selectedCoachId === 'all') return entries;
    return entries.filter((e) => e.coach?.id === selectedCoachId);
  }, [entries, selectedCoachId]);

  // Sort by coach name (click the Coach header to toggle)
  const displayed = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const an = a.coach?.name ?? '';
      const bn = b.coach?.name ?? '';
      const cmp = an.localeCompare(bn);
      return coachSortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [filtered, coachSortDir]);

  const toggleCoachSort = () => setCoachSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));

  // Add new check-in
  const resetAddForm = () => {
    setNewMemberName('');
    setNewCoachId('');
    setNewMood('');
    setNewNotes('');
    setNewDate(new Date().toISOString().slice(0, 10));
  };

  const openAdd = () => {
    setIsAddOpen(true);
    // Pre-select first options if present
    if (!newMemberName && members.length) setNewMemberName(members[0]);
    if (!newCoachId && coaches.length) setNewCoachId(coaches[0].id);
    if (!newMood) setNewMood('😀');
  };

  const closeAdd = () => {
    setIsAddOpen(false);
    resetAddForm();
  };

  const canSave =
    Boolean(newMemberName) &&
    Boolean(newCoachId !== '') &&
    Boolean(newMood) &&
    Boolean(newDate);

  const onSaveNew = () => {
    if (!canSave) return;

    const nextId = (entries.length ? Math.max(...entries.map((e) => e.id)) : 0) + 1;
    const coachObj = coaches.find((c) => c.id === newCoachId);
    if (!coachObj) return;

    const newEntry: MemberCheckIn = {
      id: nextId,
      memberName: newMemberName!,
      date: newDate!,
      mood: newMood!,
      notes: newNotes || undefined,
      coach: coachObj,
    };

    // Prepend newest at top
    setEntries((prev) => [newEntry, ...prev]);
    closeAdd();
    resetAddForm();
  };

  return (
    <>
      {/* Add check-in button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 40 }}>
        <button
          className="action-button"
          onClick={openAdd}
          aria-label="Add new check-in"
          title="Add new check-in"
        >
          ➕ Add Check-in
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h2 style={{ margin: 0 }}>Member Check-In Dashboard</h2>
        {/* Num check-ins */}
        <span style={{ marginLeft: 'auto', color: '#fff', fontSize: 12 }}>
          {entries.length ? `Total check-ins: ${entries.length}` : 'Loading…'}
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
        <label style={{ fontSize: 14 }}>
          Coach:{' '}
          <select
            value={selectedCoachId === 'all' ? 'all' : String(selectedCoachId)}
            onChange={(e) => {
              const v = e.target.value;
              setSelectedCoachId(v === 'all' ? 'all' : Number(v));
            }}
          >
            <option value="all">All coaches</option>
            {coaches.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        {selectedCoachId !== 'all' && (
          <button
            className="action-button"
            onClick={() => setSelectedCoachId('all')}
            style={{
              padding: '4px 8px',
              border: '1px solid #ddd',
              background: '#fafafa',
              cursor: 'pointer',
              borderRadius: 6,
            }}
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Add panel (inline, could be replaced with a modal later) */}
      {isAddOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-checkin-title"
          style={{
            marginTop: 12,
            padding: 12,
            border: '1px solid #eee',
            borderRadius: 10,
            background: '#fcfcfc',
            color: 'black',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong id="add-checkin-title" style={{ fontSize: 14 }}>
              New Check-In
            </strong>
            <button
              className="action-button"
              onClick={closeAdd}
              aria-label="Close"
              style={{
                marginLeft: 'auto',
                border: '1px solid #ddd',
                borderRadius: 6,
                padding: '4px 8px',
              }}
            >
              X
            </button>
          </div>

          <div
            style={{
              marginTop: 10,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
              Member
              <select
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                aria-required="true"
              >
                {members.length === 0 ? (
                  <option value="" disabled>
                    (No members found)
                  </option>
                ) : null}
                {members.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
              Coach
              <select
                value={newCoachId === '' ? '' : String(newCoachId)}
                onChange={(e) =>
                  setNewCoachId(e.target.value ? Number(e.target.value) : '')
                }
                aria-required="true"
              >
                {coaches.length === 0 ? (
                  <option value="" disabled>
                    (No coaches found)
                  </option>
                ) : (
                  <option value="" disabled>
                    Select a coach
                  </option>
                )}
                {coaches.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
              Mood
              <select
                value={newMood}
                onChange={(e) => setNewMood(e.target.value as (typeof MOODS)[number])}
                aria-required="true"
              >
                <option value="" disabled>
                  Select a mood
                </option>
                {MOODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
              Date
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                aria-required="true"
              />
            </label>

            <label
              style={{ gridColumn: '1 / -1', display: 'grid', gap: 4, fontSize: 14 }}
            >
              Notes (optional)
              <textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                rows={3}
                placeholder="Add a short note"
                style={{ resize: 'vertical' }}
              />
            </label>
          </div>

          <div
            style={{ marginTop: 10, display: 'flex', gap: 8, justifyContent: 'flex-end' }}
          >
            <button className="action-button" onClick={onSaveNew} disabled={!canSave}>
              Save check-in
            </button>
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <p style={{ color: '#888', marginTop: 8 }}>Loading check-ins...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '8px 6px' }}>Name</th>
              <th style={{ padding: '8px 6px' }}>Date</th>
              <th style={{ padding: '8px 6px' }}>Mood</th>
              <th
                style={{ padding: '8px 6px', cursor: 'pointer', userSelect: 'none' }}
                onClick={toggleCoachSort}
                aria-sort={coachSortDir === 'asc' ? 'ascending' : 'descending'}
                title="Sort by coach"
              >
                Coach {coachSortDir === 'asc' ? '▲' : '▼'}
              </th>
              <th style={{ padding: '8px 6px' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((e) => (
              <tr key={e.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px 6px' }}>{e.memberName}</td>
                <td style={{ padding: '8px 6px' }}>
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '8px 6px' }}>{e.mood}</td>
                <td style={{ padding: '8px 6px' }}>{e.coach?.name}</td>
                <td style={{ padding: '8px 6px' }}>{e.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
