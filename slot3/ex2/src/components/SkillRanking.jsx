import { persons } from "../data/person";

export default function SkillRanking() {
  const skillCount = persons.reduce((acc, person) => {
    person.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const sortedSkills = Object.entries(skillCount).sort((a, b) => b[1] - a[1]);
  const topCount = sortedSkills[0] ? sortedSkills[0][1] : 0;

  return (
    <div>
      <h2>Bảng xếp hạng kỹ năng</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Skill</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {sortedSkills.map(([skill, count]) => (
            <tr key={skill} className={count === topCount ? "fw-bold table-warning" : ""}>
              <td>{skill}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
