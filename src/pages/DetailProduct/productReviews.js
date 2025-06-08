import { Pagination, Rate, Button, Input, List, Typography } from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Title, Text } = Typography;

function ProductReviews({ reviews, onSubmitReview }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const pageSize = 5; // Số lượng đánh giá tối đa trên mỗi trang

  // Lấy các đánh giá cho trang hiện tại
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSubmit = () => {
    if (newComment.trim() && newRating > 0) {
      onSubmitReview({ comment: newComment, rating: newRating });
      setNewComment("");
      setNewRating(0);
    } else {
      alert("Vui lòng nhập đánh giá và chọn số sao!");
    }
  };

  return (
    <div className="product-reviews">
      <Title level={4}>Đánh giá sản phẩm</Title>

            {/* Khu vực để tự comment */}
      <div className="add-review" style={{ marginTop: "20px" }}>
        <Title level={5}>Viết đánh giá của bạn</Title>
        <Rate
          value={newRating}
          onChange={(value) => setNewRating(value)}
          style={{ marginBottom: "10px" }}
        />
        <TextArea
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Nhập đánh giá của bạn..."
        />
        <Button
          type="primary"
          style={{ marginTop: "10px" }}
          onClick={handleSubmit}
        >
          Gửi đánh giá
        </Button>
      </div>

      {/* Hiển thị danh sách đánh giá */}
      <List
        itemLayout="vertical"
        dataSource={paginatedReviews}
        renderItem={(review) => (
          <List.Item>
            <Text strong>{review.user?.name || "Người dùng ẩn danh"}</Text>
            <Rate disabled value={review.rating} />
            <p>{review.comment}</p>
            <Text type="secondary">
              {new Date(review.createdAt).toLocaleDateString()}
            </Text>
          </List.Item>
        )}
      />

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={reviews.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "20px" }}
      />


    </div>
  );
}

export default ProductReviews;