import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form, message, Space, Popconfirm } from "antd";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const res = await getCategories();
        setCategories(res || []);
      } catch {
        message.error("Không thể tải danh mục!");
      }
      setLoading(false);
    }
    fetchCategories();
  }, [refresh]);

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      attributes: category.attributes || [],
    });
    setModalOpen(true);
  };


  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success("Đã xóa danh mục!");
      setRefresh(r => !r);
    } catch (err) {
      // Hiển thị message lỗi trả về từ backend nếu có
      if (err && err.message) {
        message.error(err.message);
      } else {
        message.error("Xóa danh mục thất bại!");
      }
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await updateCategory(editingCategory._id, values);
        message.success("Cập nhật danh mục thành công!");
      } else {
        await createCategory(values);
        message.success("Thêm danh mục thành công!");
      }
      setModalOpen(false);
      setRefresh(r => !r);
    } catch (err) {
      // validation error
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa danh mục này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Quản lý danh mục sản phẩm</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Input.Search
            placeholder="Tìm kiếm danh mục..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />
          <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
            Thêm danh mục
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => setRefresh(r => !r)}>
            Làm mới
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredCategories}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
      <Modal
        title={editingCategory ? "Cập nhật danh mục" : "Thêm danh mục"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleModalOk}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.List name="attributes">
            {(fields, { add, remove }) => (
              <>
                <label>Thuộc tính</label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "attribute"]}
                      rules={[{ required: true, message: "Tên thuộc tính!" }]}
                    >
                      <Input placeholder="Tên thuộc tính" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[{ required: true, message: "Giá trị!" }]}
                    >
                      <Input placeholder="Giá trị" />
                    </Form.Item>
                    <Button danger onClick={() => remove(name)} type="link">
                      Xóa
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Thêm thuộc tính
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryAdmin;