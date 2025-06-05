import { Modal, Button, Row, Col, Divider, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import { getVoucherList } from "../../services/cartService";
import "./Carts.scss";
import VoucherDetail from "./VoucherDetail";
function VoucherModal({
  open,
  onClose,
  totalPrice,
  selectedVoucher,
  setSelectedVoucher,
  selectedFreeShip,
  setSelectedFreeShip,
}) {
  const [voucher, setVoucher] = useState([]);
  const [search, setSearch] = useState("");
  const [tempSelectedVoucher, setTempSelectedVoucher] =
    useState(selectedVoucher);
  const [tempSelectedFreeShip, setTempSelectedFreeShip] =
    useState(selectedFreeShip);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getVoucherList();
      // console.log(res);
      setVoucher(res);
    };
    fetchApi();
  }, []);
  useEffect(() => {
    setTempSelectedVoucher(selectedVoucher);
    setTempSelectedFreeShip(selectedFreeShip);
  }, [selectedVoucher, selectedFreeShip, open]);
  const filteredVouchers = voucher.filter(
    (v) => v.code && v.code.toLowerCase().includes(search.toLowerCase())
  );
  const freeShipVouchers = filteredVouchers.filter(
    (v) => v.discount_type === "free_shipping"
  );
  const discountVouchers = filteredVouchers.filter(
    (v) => v.discount_type !== "free_shipping"
  );
  const sortedFreeShipVouchers = [...freeShipVouchers].sort(
    (a, b) =>
      (totalPrice < a.min_order_amount) - (totalPrice < b.min_order_amount)
  );
  const sortedDiscountVouchers = [...discountVouchers].sort(
    (a, b) =>
      (totalPrice < a.min_order_amount) - (totalPrice < b.min_order_amount)
  );
  const handleSelectFreeShip = (v) => {
    if (tempSelectedFreeShip?.code === v.code) {
      setTempSelectedFreeShip(null);
    } else {
      setTempSelectedFreeShip(v);
    }
  };
  const handleSelectDiscount = (v) => {
    if (tempSelectedVoucher?.code === v.code) {
      setTempSelectedVoucher(null);
    } else {
      setTempSelectedVoucher(v);
    }
  };
  return (
    <>
      <Modal
        title={<span className="voucher__modal-title">Chọn Voucher</span>}
        className="voucher__modal"
        open={open}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Trở lại
          </Button>,
          <Button key="ok" type="primary" onClick={()=>{
              setSelectedVoucher(tempSelectedVoucher);
              setSelectedFreeShip(tempSelectedFreeShip);
              onClose();
          }}>
            OK
          </Button>,
        ]}
      >
        <Row>
          <Col span={24} className="voucher__search">
            <div className="voucher__title">Mã Voucher</div>
            <Input
              className="voucher__input"
              placeholder="Mã Voucher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
        <Divider />
        <div className="voucher__title">Mã miễn phí vận chuyển</div>
        <div className="voucher__list voucher__list--freeship">
          <Radio.Group value={tempSelectedFreeShip?.code || null}>
            {sortedFreeShipVouchers.map((v) => (
              <Radio
                key={v.code}
                value={v.code}
                checked={tempSelectedFreeShip === v.code}
                onClick={() => handleSelectFreeShip(v)}
                disabled={totalPrice < v.min_order_amount}
              >
                <VoucherDetail voucher={v} />
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <Divider />
        <div className="voucher__title">Giảm giá</div>
        <div className="voucher__list voucher__list--discount">
          <Radio.Group value={tempSelectedVoucher?.code || null}>
            {sortedDiscountVouchers.map((v) => (
              <Radio
                key={v.code}
                value={v.code}
                checked={tempSelectedVoucher?.code === v.code}
                onClick={() => handleSelectDiscount(v)}
                disabled={totalPrice < v.min_order_amount}
              >
                <VoucherDetail voucher={v} />
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </Modal>
    </>
  );
}
export default VoucherModal;
