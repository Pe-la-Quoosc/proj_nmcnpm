import { Row, Col, Collapse, Button, Divider, Card, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartList from "./cartList";
import { deleteAll } from "../../actions/cart";
import "./Carts.scss";
import CartAddress from "./cartAddress";
import VoucherModal from "./VoucherModal";
import { addToCartDataBase } from "../../services/cartService";
import { getCookie } from "../../helpers/cookie";
import PaymentMethodModal from "./PaymentMethodModal";
const idx = 50000;
function Carts() {
  const [voucherOpen, setVoucherOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedFreeShip, setSelectedFreeShip] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const handleDeleteAll = async () => {
    dispatch(deleteAll());
    const userId = getCookie("id");
    await addToCartDataBase(userId, {}, "clear");
  };
  const [activeKey, setActiveKey] = useState("1");

  const items = [
    {
      key: "1",
      label: "Cart",
      children: (
        <>
          <CartList />
          {cart.length > 0 && (
            <div className="cart__remove-all">
              <button onClick={handleDeleteAll}>Xóa Tất Cả</button>
            </div>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Address",
      children: (
        <>
          <CartAddress/>
        </>
      ),
    },
  ];
  // console.log("cart", cart);
  const totalPrice = cart.reduce((sum, item) => {
    return (
      sum +
      item.info.price * (1 - item.info.discountPercentage / 100) * item.quantity
    );
  }, 0);
  // Tổng shippingFee
  const shippingDiscount = selectedFreeShip
    ? selectedFreeShip.max_discount_amount
    : 0;
  // Tổng voucher giảm giá
  const totalVoucherDiscount = selectedVoucher
    ? Math.min(
        (totalPrice * selectedVoucher.discount_value) / 100,
        selectedVoucher.max_discount_amount
      )
    : 0;
  const totalDiscount = totalVoucherDiscount + shippingDiscount;
  //Tiền phải trả
  const finalTotal = totalPrice + idx - totalDiscount;
  return (
    <>
      <Row gutter={[16, 16]} className="cart__container">
        <Col span={16}>
          <Collapse
            items={items}
            defaultActiveKey={["1"]}
            onChange={setActiveKey}
            activeKey={activeKey}
          />
        </Col>
        <Col span={8}>
          <Card className="cart__summary">
            <h3 className="cart__summary--title">ORDER SUMMARY</h3>
            <Divider />
            <div className="cart__summary--item">
              <span>Tổng số tiền</span>
              <span>{totalPrice.toLocaleString()}</span>
            </div>
            <div className="cart__summary--item">
              <span>Tiền vận chuyển:</span>
              <span>{idx.toLocaleString()}</span>
            </div>
            <div
              className="cart__summary--item"
              onClick={() => setVoucherOpen(true)}
            >
              <span>Voucher</span>
              <span className="cart__summary--coupon">
                {selectedVoucher && (
                  <Tag
                    closable
                    color="red"
                    onClose={(e) => {
                      setSelectedVoucher(null);
                    }}
                  >
                    {`-${totalVoucherDiscount.toLocaleString()}`}
                  </Tag>
                )}
                {selectedFreeShip && (
                  <Tag
                    color="green"
                    closable
                    onClose={(e) => {
                      // e.stopPropagation();
                      setSelectedFreeShip(null);
                    }}
                  >
                    {`-${selectedFreeShip.max_discount_amount.toLocaleString()}`}
                  </Tag>
                )}
                {!selectedVoucher && !selectedFreeShip && "Voucher"}
              </span>
            </div>

            <Divider />
            {/* Tổng tiền */}
            <div className="cart__summary--item">
              <span>Tổng tiền</span>
              <span>{(totalPrice + idx).toLocaleString()}</span>
            </div>

            {/* Tổng voucher giảm giá */}
            {(selectedFreeShip || selectedVoucher) && (
              <div className="cart__summary--item">
                <span>Tổng voucher giảm giá</span>
                <span className="cart__summary--discount">{`-${totalDiscount.toLocaleString()}`}</span>
              </div>
            )}
            {/* Phương thức thanh toán */}
            <div
              className="cart__summary--item"
              onClick={() => setPaymentOpen(true)}
            >
              <span>Phương thức thanh toán</span>
              <span className="cart__summary--coupon">{selectedPayment ? selectedPayment : "Chọn"}</span>
            </div>
            {/* Thanh Toán */}
            <div className="cart__summary--item cart__summary--total">
              <span>Tổng thanh toán:</span>
              <span>{finalTotal.toLocaleString()}</span>
            </div>

            <Button type="primary" block className="cart__summary--button">
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
      <VoucherModal
        open={voucherOpen}
        onClose={() => setVoucherOpen(false)}
        totalPrice={totalPrice}
        selectedVoucher={selectedVoucher}
        setSelectedVoucher={setSelectedVoucher}
        selectedFreeShip={selectedFreeShip}
        setSelectedFreeShip={setSelectedFreeShip}
      />
      <PaymentMethodModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />
    </>
  );
}
export default Carts;
