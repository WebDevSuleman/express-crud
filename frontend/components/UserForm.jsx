// import { useState, useEffect } from "react";
// import "./userform.css"; // Assuming you have some CSS for styling

// const API_URL = "http://localhost:5000/api/users";

// function UserForm() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "" });
//   const [editId, setEditId] = useState(null);

//   const fetchUsers = () => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then(setUsers);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const method = editId ? "PUT" : "POST";
//     const url = editId ? `${API_URL}/${editId}` : API_URL;
//     console.log("URL", url, "Method", method, "Form", form);

//     fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     }).then(() => {
//       setForm({ name: "", email: "" });
//       setEditId(null);
//       fetchUsers();
//     });
//   };

//   const handleEdit = (user) => {
//     setForm({ name: user.name, email: user.email });
//     setEditId(user.id);
//   };

//   const handleDelete = (id) => {
//     fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(fetchUsers);
//   };

//   return (
//     <div>
//       <h2>User Form</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <button type="submit">{editId ? "Update" : "Add"} User</button>
//       </form>
//       <ul>
//         <li>Name</li>
//         <li>Email</li>
//       </ul>
//       <div>
//         {users.map((user) => (
//           <div class="main" key={user.id}>
//             {user.name}
//             {user.email}
//             <br />
//             <button onClick={() => handleEdit(user)}>Edit</button>
//             <button onClick={() => handleDelete(user.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default UserForm;
import React, { useState, useEffect } from "react";
import "./userform.css"; // We'll create this CSS file next

const API_URL = "https://express-crud-api-two.vercel.app/api/users";

function UserForm() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  const fetchUsers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please fill in all fields.");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    console.log("URL", url, "Method", method, "Form", form);

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ name: "", email: "" });
      setEditId(null);
      fetchUsers();
    });
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(fetchUsers);
  };

  return (
    <div className="crud-container">
      <h1>CRUD Database</h1>

      <div className="table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-container">
        <h2>Add/Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {editId ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
