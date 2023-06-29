import React from 'react';
import { Button, Modal } from 'antd';

const ProductModal = ({ product, visible, onCancel, onAddToCart }) => {
  return (
    <Modal
      open={visible}
      title={product.name}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="addToCart" type="primary" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>,
      ]}
    >
      <div>
        <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }} />
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
      </div>
    </Modal>
  );
};

export default ProductModal;
