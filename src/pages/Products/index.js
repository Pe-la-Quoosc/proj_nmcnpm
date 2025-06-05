import { useEffect, useState } from "react";
import { Row, Col, Pagination, Input, Button, Empty, Select } from "antd";
import { getProductList } from "../../services/productsService";
import "./Products.scss";
import ProductList from "./ProductList.js";
function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories,setCategories]=useState([]);
  const [sortBy,setSortBy]=useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  
  const prices=[
    {
      value:'',
      label:'Mac dinh'
    },
    {
      value:'priceAsc',
      label:'Gia thap den cao'
    },
    {
      value:'priceDesc',
      label:'Gia cao den thap'
    },
    {
      value:'discount',
      label:'Giam gia nhieu'
    },
    
  ]

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getProductList();
      setProducts(res);
      setFilteredProducts(res);

      const uniqueCategories=[
        "all",...new Set(res.map((item) => item.category)),
      ].map((category)=>({
        value:category,
        label: category.charAt(0).toUpperCase() + category.slice(1)
      }))
      setCategories(uniqueCategories);
    };
    fetchApi();
  }, []);

  const handleSearch = () => {
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSortChange = (e) => {
    setSortBy(e); 
    setCurrentPage(1);
  };

  const handleCategoryChange =(category)=>{
    if(category==="all"){
      setFilteredProducts(products);
    }
    else{
      const filtered=products.filter((item)=> item.category === category)
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
     
  };
  
  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceAsc") {
      return a.price - b.price; // Giá thấp đến cao
    }
    if (sortBy === "priceDesc") {
      return b.price - a.price; // Giá cao đến thấp
    }
    if (sortBy === "discount") {
      return b.discountPercentage - a.discountPercentage; // Giảm giá nhiều nhất
    }
    return 0; // Mặc định không sắp xếp
  });

  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <>
      <div className="products-page">
        <h2 className="products-page__title">Danh sach san pham</h2>
        <Row gutter={[20, 20]} className="product-page__layout">
          <Col span={4} className="products-page__filter">
            <div className="search">Tìm kiếm </div>
            <div className="products-page__search">
              <Input
                placeholder="Tim kiem"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button onClick={handleSearch}>Tim</Button>
            </div>
            <div>
              <div className="search">Phân loại:</div>
              <Select className="Select"
                showSearch
                placeholder="Phân loại:"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={categories}
                onChange={(value)=>handleCategoryChange(value)}
              />
            </div>
            <div>
              <div className="search">Sắp xếp theo:</div>
              <Select className="Select"
                showSearch
                placeholder="Giá:"
                options={prices}
                onChange={handleSortChange}
              />
            </div>
            
            
          </Col>
          <Col span={20} className="products-page__list">
            {currentProducts.length > 0 ? (
              <ProductList products={currentProducts} />
            ) : (
              <Empty />
            )}
          </Col>
        </Row>
      </div>
      <Pagination
        align="center"
        defaultCurrent={1}
        current={currentPage}
        pageSize={pageSize}
        total={filteredProducts.length}
        onChange={handlePageChange}
      />
    </>
  );
}
export default Product;
