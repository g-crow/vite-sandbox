import type { Coach } from '../types/member';
import '../index.css';

interface Props {
  coaches: Coach[];
  selectedCoachId: number | 'all';
  onChange: (val: number | 'all') => void;
}

export default function CoachFilter({ coaches, selectedCoachId, onChange }: Props) {
  return (
    <div className="controls">
      <label className="label">
        Coach:
        <select
          value={selectedCoachId === 'all' ? 'all' : String(selectedCoachId)}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === 'all' ? 'all' : Number(v));
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
        <button className="action-button" onClick={() => onChange('all')}>
          Clear filter
        </button>
      )}
    </div>
  );
}
