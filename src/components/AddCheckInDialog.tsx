import { useEffect, useState } from 'react';
import type { Coach, Mood } from '../types/member';
import { MOODS } from '../constants/moods';
import '../index.css';

interface AddPayload {
  memberName: string;
  coachId: number;
  mood: Mood;
  date: string; // yyyy-mm-dd
  notes?: string;
}

interface Props {
  open: boolean;
  members: string[];
  coaches: Coach[];
  onClose: () => void;
  onSave: (payload: AddPayload) => void;
}

export default function AddCheckInDialog({
  open,
  members,
  coaches,
  onClose,
  onSave,
}: Props) {
  const [memberName, setMemberName] = useState('');
  const [coachId, setCoachId] = useState<number | ''>('');
  const [mood, setMood] = useState<Mood | ''>('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [animClass, setAnimClass] = useState('');

  // Preselect when opened
  useEffect(() => {
    if (!open) return;
    if (!memberName && members.length) setMemberName(members[0]);
    if (coachId === '' && coaches.length) setCoachId(coaches[0].id);
    if (!mood) setMood('😀');
    if (!date) setDate(new Date().toISOString().slice(0, 10));
  }, [open, memberName, coachId, mood, date, members, coaches]);

  const canSave = Boolean(memberName) && coachId !== '' && Boolean(mood) && Boolean(date);

  // Animate when open changes
  useEffect(() => {
    if (open) {
      setAnimClass('dialog-enter');
      const t = setTimeout(() => setAnimClass('dialog-enter-active'), 10);
      return () => clearTimeout(t);
    } else {
      setAnimClass('dialog-exit');
      const t = setTimeout(() => setAnimClass('dialog-exit-active'), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      memberName,
      coachId: coachId as number,
      mood: mood as Mood,
      date,
      notes: notes || undefined,
    });
  };

  if (!open) return null;

  return (
    <div
      className="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-checkin-title"
    >
      <div className="dialog-header">
        <strong id="add-checkin-title" className="dialog-title">
          New Check-In
        </strong>
        <button className="close-button" onClick={onClose} aria-label="Close">
          X
        </button>
      </div>

      <div className="grid-2">
        <label className="label">
          Member
          <select
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
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

        <label className="label">
          Coach
          <select
            value={coachId === '' ? '' : String(coachId)}
            onChange={(e) => setCoachId(e.target.value ? Number(e.target.value) : '')}
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

        <label className="label">
          Mood
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value as Mood)}
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

        <label className="label">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-required="true"
          />
        </label>

        <label className="label" style={{ gridColumn: '1 / -1' }}>
          Notes (optional)
          <textarea
            className="textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Add a short note"
          />
        </label>
      </div>

      <div className="footer-actions">
        <button className="action-button" onClick={handleSave} disabled={!canSave}>
          Save check-in
        </button>
      </div>
    </div>
  );
}
