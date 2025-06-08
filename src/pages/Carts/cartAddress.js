import { Button, Cascader, Col, Form, Input, message, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { getAddressList } from "../../services/cartService";
import { getUserById, updateUserAddress } from "../../services/usersServices";
import { getCookie } from "../../helpers/cookie";
import { jwtDecode } from "jwt-decode";
function CartAddress() {
  const [form] = Form.useForm();
  const [addressList, setAddressList] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const [user, addresses] = await Promise.all([
          getUserById(userId),
          getAddressList(),
        ]);

        setUserData(user);

        const formattedAddresses = addresses.address.map((province) => ({
          value: province.level1_id,
          label: province.name,
          children: province.level2s.map((district) => ({
            value: district.level2_id,
            label: district.name,
            children: district.level3s.map((ward) => ({
              value: ward.level3_id,
              label: ward.name,
            })),
          })),
        }));
        setAddressList(formattedAddresses);

        const selectedAddress = user.getaUser.address[0].address
          .split(", ")
          .map((item, index) => {
            if (index === 0) {
              // Tìm Tỉnh/Thành phố
              const province = formattedAddresses.find((p) => p.label === item);
              // console.log("Found province:", province);
              return province?.value || null;
            } else if (index === 1) {
              // Tìm Huyện/Quận
              const province = formattedAddresses.find((p) =>
                user.getaUser.address[0].address
                  .split(", ")[0]
                  .includes(p.label)
              );
              const district = province?.children.find((d) => d.label === item);
              // console.log("Found district:", district);
              return district?.value || null;
            } else if (index === 2) {
              // Tìm Xã/Phường
              const province = formattedAddresses.find((p) =>
                user.getaUser.address[0].address
                  .split(", ")[0]
                  .includes(p.label)
              );
              const district = province?.children.find((d) =>
                user.getaUser.address[0].address
                  .split(", ")[1]
                  .includes(d.label)
              );
              const ward = district?.children.find((w) => w.label === item);
              // console.log("Found ward:", ward);
              return ward?.value || null;
            }
          });

        form.setFieldsValue({
          username: user.getaUser.fullname || "",
          phone: user.getaUser.mobile || "",
          address: selectedAddress.filter((item) => item !== null) || [],
          detail_address: user.getaUser.address?.[0]?.detail_address || "",
        });
      } catch (error) {}
    };

    fetchData();
  }, [form]);
  const handleSubmitForm = async (values) => {
    try {
      // Chuyển đổi `values.address` từ `value` sang `label`
      const selectedLabels = values.address.map((value, index) => {
        const level =
          index === 0
            ? addressList.find((item) => item.value === value)
            : index === 1
            ? addressList
                .find((item) => item.value === values.address[0])
                ?.children.find((item) => item.value === value)
            : addressList
                .find((item) => item.value === values.address[0])
                ?.children.find((item) => item.value === values.address[1])
                ?.children.find((item) => item.value === value);

        return level?.label || value; // Lấy `label` hoặc giữ nguyên nếu không tìm thấy
      });

      const payload = {
        fullname: values.username, // Tên người nhận
        phone: values.phone, // Số điện thoại
        address: {
          address: selectedLabels.join(", "), // Địa chỉ đã chọn (Tỉnh/Thành phố, Quận/Huyện, Phường/Xã)
          detail_address: values.detail_address, // Địa chỉ cụ thể
        },
      };

      console.log("Payload:", payload); // Kiểm tra dữ liệu gửi lên API

      const response = await updateUserAddress(payload);
      if (
        response &&
        response.message === "User address updated successfully"
      ) {
        message.success("Địa chỉ đã được lưu thành công!");
      }
    } catch (error) {}
  };
  return (
    <>
      <Form form={form} name="complex-form" onFinish={handleSubmitForm}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Tên người nhận"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên người nhận" },
              ]}
            >
              <Input placeholder="Tên người nhận" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng chọn địa chỉ" }]}
        >
          <Cascader
            options={addressList}
            placeholder="Chọn Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            expandTrigger="hover"
          />
        </Form.Item>

        <Form.Item
          label="Địa chỉ cụ thể"
          name="detail_address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
        >
          <Input placeholder="Địa chỉ cụ thể" />
        </Form.Item>

        <Space className="button_cartaddress">
          <Button type="primary" htmlType="submit">
            Hoàn thành
          </Button>
        </Space>
      </Form>
    </>
  );
}

export default CartAddress;
