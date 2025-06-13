import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Upload, Form, Row, Col, message, Select } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCategories } from "../../services/categoryService";
import { createProduct } from "../../services/productsService";

const { TextArea } = Input;

const AddNewProducts = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [variantFields, setVariantFields] = useState([]);
  const [variants, setVariants] = useState({});
  const [loading, setLoading] = useState(false);

  // Lấy danh sách category từ DB
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (err) {
        message.error("Không lấy được danh mục!");
      }
    }
    fetchCategories();
  }, []);

  // Khi chọn category, lấy validVariants
  useEffect(() => {
    if (!selectedCategory) {
      setVariantFields([]);
      setVariants({});
      return;
    }
    const cat = categories.find(c => c._id === selectedCategory);
    if (cat && cat.validVariants) {
      setVariantFields(cat.validVariants);
      setVariants(prev => {
        const newVariants = { ...prev };
        cat.validVariants.forEach(v => {
          if (!(v in newVariants)) newVariants[v] = "";
        });
        return newVariants;
      });
    }
  }, [selectedCategory, categories]);

  const handleGalleryChange = ({ fileList }) => setGallery(fileList);

  const handleRemoveGallery = (file) => {
    setGallery(gallery.filter(f => f.uid !== file.uid));
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      // Xử lý upload ảnh (nếu có upload lên server thì cần upload trước và lấy url)
      const images = gallery.map(f => f.url || f.name);
      const submitData = {
        ...values,
        description: values.description.filter(desc => !!desc),
        category: selectedCategory,
        images,
        variants: variantFields.length > 0 ? [variants] : [],
      };
      await createProduct(submitData);
      message.success("Thêm sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      message.error("Thêm sản phẩm thất bại!");
    }
    setLoading(false);
  };

  const handleVariantChange = (field, value) => {
    setVariants(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ padding: 24, background: "#f4f4f2", minHeight: "100vh" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Thêm sản phẩm mới</h2>
        <div style={{ color: "#888" }}>Dashboard &gt; Tất cả sản phẩm &gt; Thêm sản phẩm mới</div>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 24,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Row gutter={32}>
          <Col xs={24} md={14}>
            <Form.Item label="Tên sản phẩm" name="title" rules={[{ required: true, message: "Please enter product name" }]}>
              <Input placeholder="Type name here" />
            </Form.Item>
            <Form.Item label="Mô tả" required>
              <Form.List name="description" rules={[{ required: true, message: "Vui lòng nhập ít nhất một mô tả" }]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.length === 0 && <div style={{ color: 'red' }}>Cần ít nhất 1 mô tả</div>}
                    {fields.map((field, idx) => (
                      <div key={field.key} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                        <Form.Item
                          key={field.key}
                          {...field}
                          name={[field.name]}
                          fieldKey={[field.fieldKey]}
                          rules={[{ required: true, message: "Không được để trống mô tả" }]}
                          style={{ flex: 1, marginBottom: 0 }}
                        >
                          <TextArea
                            placeholder={`Mô tả #${idx + 1}`}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                          />
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            danger
                            type="text"
                            onClick={() => remove(field.name)}
                            style={{ marginLeft: 8 }}
                          >
                            x
                          </Button>
                        )}
                      </div>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon="+">
                        Thêm mô tả
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: "Please select category" }]}>
              <Select
                placeholder="Select category"
                value={selectedCategory}
                onChange={setSelectedCategory}
                showSearch
                optionFilterProp="children"
              >
                {categories.map(cat => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* Hiển thị các trường variant */}
            {variantFields.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <b>Thông tin sản phẩm:</b>
                <Row gutter={8} style={{ marginTop: 8 }}>
                  {variantFields.map(field => (
                    <Col span={12} key={field} style={{ marginBottom: 8 }}>
                      <Input
                        placeholder={field}
                        value={variants[field]}
                        onChange={e => handleVariantChange(field, e.target.value)}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Số lượng tồn kho" name="quantity">
                  <Input placeholder="1258" type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Giá sản phẩm" name="price">
                  <Input placeholder="₫1000" type="number" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item label="Product Gallery">
              <Upload.Dragger
                multiple
                fileList={gallery}
                beforeUpload={() => false}
                onChange={handleGalleryChange}
                onRemove={handleRemoveGallery}
                accept=".jpg,.jpeg,.png"
                style={{ background: "#fafafa" }}
                showUploadList={false}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ fontSize: 32, color: "#1890ff" }} />
                </p>
                <p>Drop your image here, or browse<br />Jpeg, png are allowed</p>
              </Upload.Dragger>
              <div style={{ marginTop: 16 }}>
                {gallery.map(file => (
                  <div key={file.uid} style={{
                    display: "flex", alignItems: "center", marginBottom: 8, background: "#fff", borderRadius: 4, padding: 8
                  }}>
                    <div style={{
                      width: 32, height: 32, background: "#eee", borderRadius: 4, marginRight: 12,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <img
                        src={file.thumbUrl || (file.originFileObj && URL.createObjectURL(file.originFileObj))}
                        alt={file.name}
                        style={{ maxWidth: 28, maxHeight: 28 }}
                      />
                    </div>
                    <span style={{ flex: 1 }}>{file.name}</span>
                    <span style={{ color: "#52c41a", marginRight: 8 }}>✔</span>
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleRemoveGallery(file)}
                    />
                  </div>
                ))}
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col>
            <Button type="primary" htmlType="submit" style={{ minWidth: 120 }} loading={loading}>
              Thêm sản phẩm
            </Button>
          </Col>
          <Col>
            <Button
              type="default"
              style={{ minWidth: 120 }}
              onClick={() => navigate("/admin/products")}
            >
              Hủy
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewProducts;