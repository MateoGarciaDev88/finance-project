import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import { jsonResponse } from "../lib/jsonResponse.js";
import { generateAccessToken, generateRefreshToken } from "../auth/generateToken.js";
import { getUserInfo } from "../lib/getUserInfo.js";

const login = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;

    if (!!!correo || !!!contrasenia) {
      return res.status(400).json({
        message: "Correo y contraseña son obligatorios",
      });
    }
		
    db.query("SELECT * FROM users WHERE correo = ?", 
			[correo],
			async (err, result) => {
				if(err) res.status(400).send(err);

				const userResult = result[0];
				
				if ( userResult ) {
					const { id, correo, usuario, nombre_completo, contrasenia: contraseniaR } = userResult;
					const user = {
						id,
						correo,
						usuario,
						nombre_completo,
						contraseniaR,
					}

					const validatePassword = await bcrypt.compare(contrasenia, user.contraseniaR);

					const createAccessToken = () => {
						return generateAccessToken(getUserInfo(user))  
					}

					const createRefreshToken = () => {
						return generateRefreshToken(getUserInfo(user))
					}
					
					if (validatePassword) {
						const accessToken = createAccessToken();
						const refreshToken = createRefreshToken();
	
						res
							.status(200)
							.json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
					} else {
						res
						.status(400)
						.json({ error: "Correo o contraseña incorrectos" });
					}
				} else {
					res
						.status(400)
						.json(jsonResponse(200, { error: "Usuario no encontrado" }));
				}
			});
		
  } catch (error) {
    console.error("Error detallado en login:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export { login };
