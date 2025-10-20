import type { MemberCheckIn } from '../types/member';
import type { SortDir } from '../utils/sort';
import '../index.css';

interface Props {
  entries: MemberCheckIn[];
  coachSortDir: SortDir;
  onToggleCoachSort: () => void;
}

export default function CheckInTable({
  entries,
  coachSortDir,
  onToggleCoachSort,
}: Props) {
  if (entries.length === 0) {
    return <p className="result">Loading check-ins...</p>;
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <colgroup>
          <col className="col-name" />
          <col className="col-date" />
          <col className="col-mood" />
          <col className="col-coach" />
          <col className="col-notes" />
        </colgroup>
        <thead>
          <tr className="thead-row">
            <th className="cell">Name</th>
            <th className="cell">Date</th>
            <th className="cell">Mood</th>
            <th
              className="cell sortable"
              onClick={onToggleCoachSort}
              aria-sort={coachSortDir === 'asc' ? 'ascending' : 'descending'}
              title="Sort by coach"
            >
              Coach {coachSortDir === 'asc' ? '▲' : '▼'}
            </th>
            <th className="cell">Notes</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id} className="row">
              <td className="cell">{e.memberName}</td>
              <td className="cell">{new Date(e.date).toLocaleDateString()}</td>
              <td className="cell">{e.mood}</td>
              <td className="cell">{e.coach?.name}</td>
              <td className="cell">{e.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
