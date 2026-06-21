import React, { useState, useEffect } from 'react';

// ❌ Code Smell #1: Magic numbers - không giải thích ý nghĩa
const x = 86400000;
const y = 7;
const z = 100;

// ❌ Code Smell #2: Biến tên quá ngắn, không mô tả
var a, b, c, d;

// ❌ Code Smell #3: Component quá lớn, làm quá nhiều việc (God Component)
function UserDashboard() {
  // ❌ Code Smell #4: Quá nhiều state trong 1 component
  const [u, setU] = useState(null);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [temp, setTemp] = useState('');
  const [tmp2, setTmp2] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // ❌ Code Smell #5: useEffect không có cleanup, dependency array sai
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setData2(d);
        setData3(d);
      });
  });

  // ❌ Code Smell #6: Hàm lồng nhau quá sâu (Deep Nesting)
  function processUserData(users) {
    if (users) {
      if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].active) {
            if (users[i].role === 'admin') {
              if (users[i].permissions) {
                if (users[i].permissions.includes('read')) {
                  if (users[i].permissions.includes('write')) {
                    console.log('full access');
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // ❌ Code Smell #7: Hàm quá dài, làm quá nhiều việc (Long Method)
  function handleSubmit(e) {
    e.preventDefault();
    // validate
    if (!temp) { alert('Name required'); return; }
    if (temp.length < 2) { alert('Name too short'); return; }
    if (temp.length > 50) { alert('Name too long'); return; }
    if (!tmp2) { alert('Email required'); return; }
    if (!tmp2.includes('@')) { alert('Invalid email'); return; }
    if (!tmp2.includes('.')) { alert('Invalid email domain'); return; }

    // process
    var n = temp.trim();
    var e2 = tmp2.trim().toLowerCase();
    var obj = { name: n, email: e2, ts: new Date().getTime() };

    // fake save
    console.log(obj);
    setData([...data, obj]);
    setData2([...data2, obj]);
    setData3([...data3, obj]);
    setTemp('');
    setTmp2('');
    setFlag1(false);
    setFlag2(false);
    setFlag3(false);
    setLoading(false);
    setLoading2(false);
    // TODO: fix this later
    // HACK: temporary workaround
    setTimeout(() => { alert('Saved!'); }, 1000);
  }

  // ❌ Code Smell #8: Code trùng lặp (Duplicate Code)
  function renderAdminList() {
    return data.map((item, index) => (
      <div key={index} style={{padding: '10px', margin: '5px', border: '1px solid black', background: 'white'}}>
        <p>{item.name}</p>
        <p>{item.email}</p>
        <p>{item.id}</p>
        <button onClick={() => { setFlag1(true); setTemp(item.name); }}>Edit</button>
        <button onClick={() => { setData(data.filter((_, i) => i !== index)); }}>Delete</button>
      </div>
    ));
  }

  function renderUserList() {
    // ❌ Gần như giống hệt renderAdminList
    return data.map((item, index) => (
      <div key={index} style={{padding: '10px', margin: '5px', border: '1px solid black', background: 'white'}}>
        <p>{item.name}</p>
        <p>{item.email}</p>
        <p>{item.id}</p>
        <button onClick={() => { setFlag2(true); setTemp(item.name); }}>Edit</button>
        <button onClick={() => { setData2(data2.filter((_, i) => i !== index)); }}>Delete</button>
      </div>
    ));
  }

  function renderGuestList() {
    // ❌ Lại giống hệt 2 hàm trên
    return data.map((item, index) => (
      <div key={index} style={{padding: '10px', margin: '5px', border: '1px solid black', background: 'white'}}>
        <p>{item.name}</p>
        <p>{item.email}</p>
        <p>{item.id}</p>
        <button onClick={() => { setFlag3(true); setTemp(item.name); }}>Edit</button>
        <button onClick={() => { setData3(data3.filter((_, i) => i !== index)); }}>Delete</button>
      </div>
    ));
  }

  // ❌ Code Smell #9: Inline style trực tiếp, không dùng CSS class
  // ❌ Code Smell #10: JSX quá phức tạp, không tách component con
  return (
    <div style={{fontFamily: 'Arial', padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh'}}>
      <h1 style={{color: '#333', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px'}}>
        User Dashboard - DO NOT USE IN PRODUCTION
      </h1>

      {/* ❌ Code Smell #11: Comment thừa, không có giá trị */}
      {/* This is a form */}
      <form onSubmit={handleSubmit} style={{background: 'white', padding: '20px', marginBottom: '20px'}}>
        {/* Input for name */}
        <input
          type="text"
          value={temp}
          onChange={(e) => setTemp(e.target.value)} // set name value
          placeholder="Name"
          style={{display: 'block', width: '100%', padding: '8px', marginBottom: '10px'}}
        />
        {/* Input for email */}
        <input
          type="text"   
          value={tmp2}
          onChange={(e) => setTmp2(e.target.value)} // set email value
          placeholder="Email"
          style={{display: 'block', width: '100%', padding: '8px', marginBottom: '10px'}}
        />
        <button type="submit" style={{padding: '8px 16px', background: 'blue', color: 'white'}}>
          Submit
        </button>
      </form>

      {/* ❌ Code Smell #12: Điều kiện render phức tạp, khó đọc */}
      {flag1 === true && flag2 === false && flag3 === false ? (
        <div>Admin mode active</div>
      ) : flag1 === false && flag2 === true && flag3 === false ? (
        <div>User mode active</div>
      ) : flag1 === false && flag2 === false && flag3 === true ? (
        <div>Guest mode active</div>
      ) : flag1 === true && flag2 === true ? (
        <div>Multiple modes - error state</div>
      ) : (
        <div>No mode selected</div>
      )}

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px'}}>
        <div>
          <h2>Admins ({data.length})</h2>
          {renderAdminList()}
        </div>
        <div>
          <h2>Users ({data2.length})</h2>
          {renderUserList()}
        </div>
        <div>
          <h2>Guests ({data3.length})</h2>
          {renderGuestList()}
        </div>
      </div>

      {/* ❌ Code Smell #13: Dead code - không bao giờ được render */}
      {false && (
        <div>
          <p>This will never show</p>
          <p>Dead code block</p>
        </div>
      )}
    </div>
  );
}

// ❌ Code Smell #14: export default ở cuối nhưng còn thêm named export trùng
export { UserDashboard };
export default UserDashboard;
