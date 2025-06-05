
import { Row, Col, Card } from "antd";
import { useState } from "react";
import "../../styles/Blog.scss";
import { exercisesData } from "../../data/exerciseData";
import { NavLink } from "react-router-dom";
import { nutritionTopics } from "../../data/nutritionData";
import schedules from "../../data/schedules";

const muscleGroups = exercisesData.map(item => ({
  id: item.id,
  group: `Các bài tập ${item.group.toLowerCase()}`,
  image: item.img,
}));



function Knowledge() {
  const [selectedDays, setSelectedDays] = useState(5);
  const [level, setLevel] = useState("beginner");
  return (
    <div className="blog-container">

      {/* Phần 1: Kĩ thuật tập luyện */}
      <section className="blog-section">
        <h2>Kĩ thuật tập luyện</h2>
        <Row gutter={[16, 16]}>
          {muscleGroups.map((group) => (
            <Col key={group.id} xs={24} sm={12} md={8} lg={8}>
              <NavLink to={`/ExerciseDetail/${group.id}`}>
                <Card className="exercise-card" cover={<img alt={group.group} src={group.image} />}>
                  <div className="exercise-info">
                    <h3>{group.group}</h3>
                  </div>
                </Card>
              </NavLink>
            </Col>
          ))}
        </Row>
      </section>

      {/* Phần 2: Dinh dưỡng thể hình */}
      <section className="blog-section">
        <h2>Dinh dưỡng thể hình</h2>
        <div style={{ textAlign: "right", marginTop: "16px" }}>
          <NavLink to="/knowledge/nutritionlist" className="see-all-btn">
            Xem tất cả các bài viết
          </NavLink>
        </div>
        <div className="nutrition-stage-out">
          {nutritionTopics.map((topic) => (
            <Card
              key={topic.id}
              className="nutrition-card"
              cover={<img alt={topic.title} src={topic.image} />}
            >
              <div className="nutrition-info">
                <h3>{topic.title}</h3>
                <p>{topic.description.split(".")[0]}.</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Phần 3: Lịch tập cá nhân hóa */}
      <section className="blog-section">
        <h2>Lịch tập cá nhân hóa</h2>
        <p>Thiết kế lịch tập phù hợp với mục tiêu và thể trạng của bạn:</p>
        <div className="schedule-level-buttons">
          <button
            className={`schedule-level-btn${level === "beginner" ? " active" : ""}`}
            onClick={() => setLevel("beginner")}
          >
            Người mới bắt đầu
          </button>
          <button
            className={`schedule-level-btn${level === "advanced" ? " active" : ""}`}
            onClick={() => setLevel("advanced")}
          >
            Đã biết tập
          </button>
        </div>
        <div className="schedule-buttons">
          {[3, 4, 5, 6].map((num) => (
            <button
              key={num}
              className={`schedule-btn${selectedDays === num ? " active" : ""}`}
              onClick={() => setSelectedDays(Number(num))} // Đảm bảo là số
            >
              {num} ngày
            </button>
          ))}
        </div>
        <ul className="schedule-list">
          {(schedules[level] && schedules[level][selectedDays]) ? (
            schedules[level][selectedDays].map((item, idx) => (
              <li key={idx}>
                <strong>{item.day}:</strong> 
                <span className="schedule-li-text">{item.content}</span>
              </li>
            ))
          ) : (
            <li>Không có dữ liệu cho lựa chọn này.</li>
          )}
        </ul>
        <p>
          Hãy đảm bảo bạn có thời gian nghỉ ngơi đủ để cơ bắp phục hồi và phát triển.
        </p>
      </section>
    </div>
  );
}


export default Knowledge;