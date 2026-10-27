'use client';

const DEPARTMENTS = [
  { id: 'all', label: 'ALL SCHOLARS', count: 32 },
  { id: 'council', label: 'COUNCIL & CORE', count: 3 },
  { id: 'program', label: 'PROGRAM & PM', count: 5 },
  { id: 'content', label: 'CONTENT & MODERATION', count: 9 },
  { id: 'media', label: 'MEDIA & DESIGN', count: 2 },
  { id: 'er', label: 'EXTERNAL RELATIONS', count: 4 },
  { id: 'hr', label: 'HR & OPERATIONS', count: 5 },
  { id: 'tech', label: 'TECH & PORTAL', count: 4 },
];

export default function DepartmentSelector({ currentDept, onSelectDept }) {
  return (
    <div className="orbit-selector" id="orbitSelector">
      {DEPARTMENTS.map((dept) => (
        <button
          key={dept.id}
          className={`orbit-pill ${currentDept === dept.id ? 'is-active' : ''}`}
          data-dept={dept.id}
          onClick={() => onSelectDept(dept.id)}
        >
          {dept.label} <span className="orbit-badge-count">{dept.count}</span>
        </button>
      ))}
    </div>
  );
}
