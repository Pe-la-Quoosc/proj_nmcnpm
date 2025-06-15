import { Pagination, Rate, Button, Input, List, Typography, message } from "antd";
import { useState, useEffect,useCallback } from "react";
import { addReview, getReviewsByProduct } from "../../services/reviewService";

const { TextArea } = Input;
const { Title, Text } = Typography;

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]); // Danh sách đánh giá
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [newComment, setNewComment] = useState(""); // Nội dung đánh giá mới
  const [newRating, setNewRating] = useState(0); // Số sao đánh giá mới
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  const pageSize = 5; // Số đánh giá trên mỗi trang


const fetchReviews = useCallback(async () => {
  try {
    setLoading(true);
    const response = await getReviewsByProduct(productId);
    if (Array.isArray(response)) {
      setReviews(response);
    } else {
      setReviews([]);
    }
  } catch (error) {
    message.error("Không thể tải đánh giá sản phẩm!");
  } finally {
    setLoading(false);
  }
}, [productId]); 

  // Gửi đánh giá mới
  const handleSubmit = async () => {
    if (newComment.trim() && newRating > 0) {
      try {
        setLoading(true);
        const response = await addReview(productId, newRating, newComment);
        if(response.message.includes("already reviewed")) {
          message.warning("Bạn đã đánh giá sản phẩm này trước đó!");
        } else {
          message.success("Đánh giá của bạn đã được gửi!");
          setNewComment("");
          setNewRating(0);
          fetchReviews();
        }
      } catch (error) {
        message.error(error.message || "Không thể gửi đánh giá!");
      } finally {
        setLoading(false);
      }
    } else {
      message.warning("Vui lòng nhập đánh giá và chọn số sao!");
    }
  };

useEffect(() => {
  fetchReviews();
}, [fetchReviews]);

  // Lấy các đánh giá cho trang hiện tại
  const paginatedReviews = Array.isArray(reviews)
    ? reviews.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

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
          loading={loading}
        >
          Gửi đánh giá
        </Button>
      </div>

      {/* Hiển thị danh sách đánh giá */}
      <List
        itemLayout="vertical"
        dataSource={paginatedReviews}
        loading={loading}
        locale={{ emptyText: "Chưa có đánh giá nào" }}
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