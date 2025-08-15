import React from "react";
import MyForm from "././components/MyForm"; // Giả sử MyForm được lưu trong thư mục cùng với App.js

const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Dữ liệu đã gửi:", formData);
  };

  return (
    <div className="App">
      <MyForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;

