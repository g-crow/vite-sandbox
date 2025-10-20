import '../index.css';

interface Props {
  countLabel: string;
  onAdd: () => void;
}

export default function CheckInDashboardHeader({ countLabel, onAdd }: Props) {
  return (
    <>
      <button
        className="action-button add-button"
        onClick={onAdd}
        aria-label="Add new check-in"
        title="Add new check-in"
      >
        ➕ Add Check-in
      </button>
      <div className="header">
        <h2>Member Check-In Dashboard</h2>
        <div className="header-right">
          <span className="count">{countLabel}</span>
        </div>
      </div>
    </>
  );
}
