import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Card, Space, Typography } from "antd";
import {
  cartSelector,
  removeFromCart,
  updateQuantity,
  emptyCart
} from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Cart = () => {
  const cartItems = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateQuantity({ itemId, quantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  const handleEmptyCart = () => {
    dispatch(emptyCart());
  }

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return totalPrice;
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Title level={2}>Cart</Title>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Card
            key={item.id}
            style={{ marginBottom: 16 }}
            bodyStyle={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={item.image}
              style={{ width: "120px", height: "90px", marginRight: 16 }}
              alt=""
            />
            <div>
              <Space direction="vertical">
                <Text strong>{item.name}</Text>
                <Text>Price: ${item.price}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text strong>Subtotal: ${item.price * item.quantity}</Text>
              </Space>
              <div style={{ marginTop: 16 }}>
                <Button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                >
                  Decrease Quantity
                </Button>
                <Button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  Increase Quantity
                </Button>
                <Popconfirm
                  title="Are you sure you want to remove this item from the cart?"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleRemoveItem(item.id)}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div>The cart is Empty</div>
      )}
      <div>
        {cartItems.length > 0 && (
          <Title level={3} style={{ marginTop: 16 }}>
            Total: ${calculateTotalPrice()}
          </Title>
        )}
      </div>
      <Button
        onClick={handleGoBack}
        type="primary"
        size="large"
        style={{ position: "fixed", top: 16, right: 16 }}
      >
        Go Back
      </Button>
      <Button
        onClick={handleEmptyCart}
        type="primary"
        size="large"
        style={{ position: "fixed", top: 64, right: 16 }}
      >
        Empty cart
      </Button>
    </div>
  );
};

export default Cart;
