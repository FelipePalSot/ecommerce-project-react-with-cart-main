import "./registroClientes-style.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

export default function RegistroClientes() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      login(nombre.trim());
      navigate("/lista-productos");
    }
  };

  return (
    <main className="auth__container">
      <div className="auth__panel">
        <h1 className="page-title">Crear una cuenta</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="nombre">Nombre Completo</label>
            <input id="nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Correo Electrónico</label>
            <input id="email" type="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" required />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn">Registrarse</button>
          </div>
        </form>

        <div className="auth__alt">
          <p>¿Ya tienes una cuenta? <Link to="/inicio-sesion" className="link">Inicia Sesión</Link></p>
        </div>
      </div>
    </main>
  );
}
