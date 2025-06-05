function VoucherDetail({ voucher }) {
  if (!voucher) return null;
  return (
    <div className="voucher__detail">
      <div className={
        voucher.discount_type === "free_shipping" 
          ? "voucher__icon voucher__icon--freeship" 
          : "voucher__icon voucher__icon--discount"
      }>
        {voucher.discount_type === "free_shipping" ? (
          <>
            <div className="voucher__detail--freeship-label">Mã vận chuyển</div>
          </>
        ) : (
          <div className="voucher__detail--discount-label">GIẢM GIÁ</div>
        )}
      </div>

      <div className="voucher__detail--info" >
        <div className="voucher__detail--desc">{voucher.description}</div>
        <div className="voucher__detail--min" >
          Đơn Tối Thiểu {voucher.min_order_amount?.toLocaleString()}đ
        </div>
        <div className="voucher__detail--date">
          HSD: {voucher.end_date ? new Date(voucher.end_date).toLocaleDateString() : ""}
        </div>
      </div>
    </div>
  );
}
export default VoucherDetail;