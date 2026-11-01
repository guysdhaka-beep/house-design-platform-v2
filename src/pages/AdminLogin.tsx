import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("https://house-design-platform-server.vercel.app/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      alert("Login Successful");

      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert("Server Error");
      console.log(err);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
      }}
    >
      <form
        onSubmit={login}
        style={{
          width: 350,
          background: "#222",
          padding: 30,
          borderRadius: 10,
        }}
      >
        <h2
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          Admin Login
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginTop: 15,
            padding: 12,
          }}
        />

        <button
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}