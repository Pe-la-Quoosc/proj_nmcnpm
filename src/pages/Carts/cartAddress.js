import { Button, Cascader, Col, Form, Input, message, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { getAddressList } from "../../services/cartService";
import { getCookie } from "../../helpers/cookie";
import { get, patch } from "../../utils/request";

function CartAddress({closeModal}) {
  const[form] = Form.useForm();
  const [addressList, setAddressList] = useState([]);
  const [initialValue, setInitialValue] = useState({
    Username: "",
    Number: "",
    address: [],
    detail_address: "",
  });
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAddressList();
      const options = res.map((tinh) => ({
        value: tinh.name,
        label: tinh.name,
        children: tinh.level2s?.map((huyen) => ({
          value: huyen.name,
          label: huyen.name,
          children: huyen.level3s?.map((xa) => ({
            value: xa.name,
            label: xa.name,
          })),
        })),
      }));
      setAddressList(options);
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const userId = getCookie("id");
      if (!userId) return;
      const user = await get(`users/${userId}`);
      // console.log(user);
      const values={
        Username: user.fullname ,
        Number: user.phone,
        address: user.address[0].address.split(","),
        detail_address: user.address[0].detail_address,
      };
      setInitialValue(values);
      form.setFieldsValue(values);
    };
    fetchUser();
  }, [form]);
  // console.log(initialValue);
  const handleSubmitForm = async (values) => {
    const userIdCookie = getCookie("id");
    const options = {
      fullname: values.Username,
      phone: values.Number,
      address: [
        {
          address: values.address.join(","),
          detail_address: values.detail_address,
        },
      ],
    };
    await patch(`users/${userIdCookie}`, options);
    message.success("Cập nhật địa chỉ thành công!");
    if(closeModal) {
      closeModal();
    }
  };

  return (
    <>
      <Form
        form={form}
        name="complex-form"
        onFinish={handleSubmitForm}
        initialValues={initialValue}
        enableReinitialize
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Tên: "
              name="Username"
              required={false}
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input placeholder="Tên người nhận" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Sdt: "
              name="Number"
              required={false}
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input placeholder="So dien thoai" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Địa chỉ: "
          name="address"
          required={false}
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Cascader
            options={addressList}
            placeholder="Chọn Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            showSearch={true}
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ cụ thể: "
          name="detail_address"
          required={false}
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input placeholder="Địa chỉ cụ thể" />
        </Form.Item>
        <Space className="button_cartaddress">
          <Button type="primary" htmlType="submit">
            Hoan thanh
          </Button>
        </Space>
      </Form>
    </>
  );
}
export default CartAddress;
