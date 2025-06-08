import { Row, Col, Collapse, Button, Divider, Card, Tag } from "antd";
import { useEffect, useState } from "react";
import VoucherModal from "./VoucherModal";
import CartList from "./cartList";
import "./Carts.scss";
import CartAddress from "./cartAddress";
import { getCart, clearCart } from "../../services/cartService";
import { useDispatch } from "react-redux";

const idx = 5000;
function Carts() {
  const [isVoucherModalOpen, setVoucherModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedFreeShip, setSelectedFreeShip] = useState(null);

  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [activeKey, setActiveKey] = useState("1");
  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.products);
      const totalQuantity = response.products.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      dispatch({ type: "SET_TOTAL_QUANTITY", payload: totalQuantity });
    } catch (error) {}
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClearCart = async () => {
    try {
      await clearCart();
      fetchCart();
    } catch (error) {}
  };

  const items = [
    {
      key: "1",
      label: "Cart",
      children: (
        <>
          <CartList cart={cart} refreshCart={fetchCart} />
          {cart.length > 0 && (
            <div className="cart__remove-all">
              <button onClick={handleClearCart}>Xóa Tất Cả</button>
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
          <CartAddress />
        </>
      ),
    },
  ];
  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handleOpenVoucherModal = () => {
    setVoucherModalOpen(true);
  };

  const handleCloseVoucherModal = () => {
    setVoucherModalOpen(false);
  };

  const calculateDiscount = (voucher, totalPrice) => {
    if (!voucher) return 0;

    if (voucher.discountType === "fixed") {
      return Math.min(
        voucher.discountValue,
        voucher.maxDiscountAmount || voucher.discountValue
      );
    } else if (voucher.discountType === "percentage") {
      const discount = (totalPrice * voucher.discountValue) / 100;
      return Math.min(discount, voucher.maxDiscountAmount || discount);
    }

    return 0;
  };

  const totalVoucherDiscount =
    calculateDiscount(selectedVoucher, totalPrice) +
    calculateDiscount(selectedFreeShip, totalPrice);

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
              <span>{idx.toLocaleString(idx)}</span>
            </div>
            <div className="cart__summary--item">
              <span>Voucher</span>
              <span
                className="cart__summary--coupon"
                onClick={handleOpenVoucherModal}
              >
                {selectedVoucher || selectedFreeShip ? (
                  <>
                    {selectedVoucher && (
                      <Tag color="green">
                        {calculateDiscount(
                          selectedVoucher,
                          totalPrice
                        ).toLocaleString()}{" "}
                        VND
                      </Tag>
                    )}
                    {selectedFreeShip && (
                      <Tag color="blue">
                        {calculateDiscount(
                          selectedFreeShip,
                          idx
                        ).toLocaleString()}{" "}
                        VND
                      </Tag>
                    )}
                  </>
                ) : (
                  "Chọn Voucher"
                )}
              </span>
            </div>

            <Divider />
            {/* Tổng tiền */}
            {/* <div className="cart__summary--item">
              <span>Tổng tiền</span>
              <span>{(totalPrice + idx).toLocaleString()}</span>
            </div> */}

            {/* Tổng voucher giảm giá */}
            {/* {(selectedFreeShip || selectedVoucher) && (
              <div className="cart__summary--item">
                <span>Tổng voucher giảm giá</span>
                <span className="cart__summary--discount">{`-${totalDiscount.toLocaleString()}`}</span>
              </div>
            )} */}
            {/* Phương thức thanh toán */}
            {/* <div
              className="cart__summary--item"
              onClick={() => setPaymentOpen(true)}
            >
              <span>Phương thức thanh toán</span>
              <span className="cart__summary--coupon">{selectedPayment ? selectedPayment : "Chọn"}</span>
            </div> */}
            {/* Thanh Toán */}
            {/* <div className="cart__summary--item cart__summary--total">
              <span>Tổng thanh toán:</span>
              <span>{finalTotal.toLocaleString()}</span>
            </div> */}

            <Button type="primary" block className="cart__summary--button">
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
      <VoucherModal
        open={isVoucherModalOpen}
        onClose={handleCloseVoucherModal}
        totalPrice={totalPrice}
        selectedVoucher={selectedVoucher}
        setSelectedVoucher={setSelectedVoucher}
        selectedFreeShip={selectedFreeShip}
        setSelectedFreeShip={setSelectedFreeShip}
      />
    </>
  );
}
export default Carts;
