import React from "react";
import { useParams } from "react-router-dom";
import { exercisesData } from "../../data/exerciseData";

function ExerciseDetail() {
  const { id } = useParams();
  const group = exercisesData.find((g) => g.id === parseInt(id));

  if (!group) {
    return <p>Nhóm cơ không tồn tại.</p>;
  }

  return (
    <div className="exercise-detail">
      <h1>{group.group}</h1>
      <ul>
        {group.exercises.map((ex) => (
          <li key={ex.id} style={{ marginBottom: 16 }}>
            <strong>{ex.name}</strong>
            {ex.image && (
              <div>
                <img src={ex.image} alt={ex.name} style={{ maxWidth: 200, display: "block", margin: "8px 0" }} />
              </div>
            )}
            <p>{ex.description}</p>
            {ex.steps && (
              <ol>
                {ex.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            )}
            {ex.tips && <div className="tips">{ex.tips}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseDetail;