import { useState } from "react";
import "/src/index.css";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

const FormularioRegistro = () => {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [pais, setPais] = useState("");
  const [genero, setGenero] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const { isAuthenticated } = useAuth();
	const goTo = useNavigate();
	
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje("");

    if (
      !correo ||
      !contrasenia ||
      !confirmarContrasenia ||
      !nombreCompleto ||
      !usuario
    ) {
      setMensaje("Por favor completa todos los campos obligatorios");
      return;
    }

    if (contrasenia !== confirmarContrasenia) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    if (contrasenia.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const datosRegistro = {
      correo,
      contrasenia,
      nombre_completo: nombreCompleto,
      usuario,
      telefono,
      fecha_nacimiento: fechaNacimiento,
      pais,
      genero,
      acepta_terminos: aceptaTerminos,
    };

    try {
      console.log("Enviando datos:", datosRegistro);

      const response = await fetch("http://localhost:3000/api/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRegistro),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        setMensaje(data.message || "Registro exitoso");
				goTo("/login");
      } else {
        setMensaje(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMensaje(
        "Error de conexión. Verifica que el servidor esté funcionando."
      );
    }
  };

  return (
    <div
      className="formulario-registro"
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5", // opcional
      }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Registrarse
        </h2>
        <form onSubmit={manejarEnvio} style={{ width: "100%" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Nombre completo:
            </label>
            <input
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Nombre de usuario:
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Correo electrónico:
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Teléfono:
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Fecha de nacimiento:
            </label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              País:
            </label>
            <input
              type="text"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Género:
            </label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Seleccione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Contraseña:
            </label>
            <input
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Confirmar contraseña:
            </label>
            <input
              type="password"
              value={confirmarContrasenia}
              onChange={(e) => setConfirmarContrasenia(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                required
              />
              Acepto los términos y condiciones
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </form>
        {mensaje && (
          <p
            className={`mensaje-formulario ${mensaje.includes("exitoso") ? "exito" : "error"}`}
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
};
export default FormularioRegistro;
