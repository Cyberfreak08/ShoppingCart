import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../Redux/cartSlice';
import { getProducts, productSelector } from '../../Redux/productSlice';
import { Row, Col, Card, Button } from 'antd';
import ProductModal from '../ProductModal';  

const { Meta } = Card;

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productArray = useSelector(productSelector);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setModalVisible(false);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <h2>Products</h2>
      <Row gutter={[16, 16]}>
        {productArray?.map((product, index) => (
          <Col key={product?.id} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              hoverable
              cover={
                <div
                  style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.image}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    alt=""
                  />
                </div>
              }
            >
              <Meta title={product.name} description={`Price: $${product.price}`} style={{ marginBottom: '10px' }} />
              <Button type="primary" onClick={() => handleAddToCart(product)} style={{ marginTop: '10px' }}>
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          visible={modalVisible}
          onCancel={handleModalCancel}
          onAddToCart={handleAddToCart}
        />
      )}
      {productArray.length > 0 && (
        <Button
          onClick={handleGoToCart}
          type="primary"
          size="large"
          style={{ position: 'fixed', top: 16, right: 16 }}
        >
          Go to Cart
        </Button>
      )}
    </div>
  );
};

export default ProductList;
