import {
  Layout,
  Card,
  Avatar,
  Button,
  Input,
  Radio,
  Row,
  Col,
  Modal,
  message,
  Upload,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import "../Users.scss";
import { getUserById, updateUserField } from "../../../services/usersServices";
import { useOutletContext } from "react-router-dom";
const { Content } = Layout;
function UserProfileInfo() {

  const { user, updateUser } = useOutletContext();
  const [gender, setGender] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const userId = getCookie("id");
      const res = await getUserById(userId);
      updateUser(res);
      setGender(res.gender || "female");
      setName(res.fullname || "");
      setAvatarUrl(res.avatar || "");
    };
    fetchApi();
  }, [updateUser]);


  return (
    <>
      <Layout>
        <Content className="user-profile__content">
          <Card title="Hồ Sơ Của Tôi" className="user-profile__card">
            <Row gutter={32}>
              <Col span={16}>
                <div className="user-profile__desc">
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </div>
                <Row className="user-profile__row" align="middle">
                  <Col span={6}>Tên đăng nhập</Col>
                  <Col span={18}>
                    <b>{user.username}</b>
                  </Col>
                </Row>
                <Row className="user-profile__row" align="middle">
                  <Col span={6}>Tên</Col>
                  <Col span={18}>
                    <Input
                      placeholder="Nhập tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="user-profile__row" align="middle">
                  <Col span={6}>Email</Col>
                  <Col span={18}>
                    {user.email ? (
                      <>
                        {user.email}
                        <Button
                          type="link"
                          onClick={() => {
                            setNewEmail(user.email || "");
                            setEmailModalOpen(true);
                          }}
                        >
                          Thay Đổi
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="link"
                        onClick={() => {
                          setNewEmail("");
                          setEmailModalOpen(true);
                        }}
                      >
                        Thay Đổi
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row className="user-profile__row" align="middle">
                  <Col span={6}>Số điện thoại</Col>
                  <Col span={18}>
                    {user.phone ? (
                      <>
                        {user.phone}{" "}
                        <Button
                          type="link"
                          onClick={() => {
                            setNewPhone(user.phone || "");
                            setPhoneModalOpen(true);
                          }}
                        >
                          Thay Đổi
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="link"
                        onClick={() => {
                          setNewPhone("");
                          setPhoneModalOpen(true);
                        }}
                      >
                        Thay Đổi
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row className="user-profile__row" align="middle">
                  <Col span={6}>Giới tính</Col>
                  <Col span={18}>
                    <Radio.Group value={gender} onChange={handleUpdateGender}>
                      <Radio value="male">Nam</Radio>
                      <Radio value="female">Nữ</Radio>
                      <Radio value="other">Khác</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Button
                  type="primary"
                  className="user-profile__save-btn"
                  onClick={handleUpdate}
                >
                  Lưu
                </Button>
              </Col>
              <Col span={8} className="user-profile__avatar-col">
                <div>
                  <Avatar
                    size={120}
                    src={avatarUrl}
                    icon={<UserOutlined />}
                    className="user-profile__avatar-large"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Upload
                  showUploadList={false}
                  customRequest={handleUpload}
                  accept="image/png, image/jpeg"
                  beforeUpload={(file) => {
                    const isJpgOrPng =
                      file.type === "image/jpeg" || file.type === "image/png";
                    if (!isJpgOrPng) {
                      message.error("Chỉ nhận file JPG/PNG!");
                    }
                    const isLt1M = file.size / 1024 / 1024 < 1;
                    if (!isLt1M) {
                      message.error("Dung lượng tối đa 1MB!");
                    }
                    return isJpgOrPng && isLt1M;
                  }}
                >
                  <div>
                    <Button
                      className="user-profile__choose-img-btn"
                      loading={uploading}
                    >
                      Chọn Ảnh
                    </Button>
                  </div>
                </Upload>
                <div className="user-profile__img-note">
                  Dung lượng file tối đa 1 MB
                  <br />
                  Định dạng: JPEG, PNG
                </div>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
      <Modal
        title="Cập nhật email"
        open={emailModalOpen}
        onCancel={() => setEmailModalOpen(false)}
        onOk={handleUpdateEmail}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input
          placeholder="Nhập email mới"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </Modal>
      <Modal
        title="Cập nhật Sđt"
        open={phoneModalOpen}
        onCancel={() => setPhoneModalOpen(false)}
        onOk={handleUpdatePhone}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input
          placeholder="Nhập sdt mới"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />
      </Modal>
    </>
  );
}
export default UserProfileInfo;
