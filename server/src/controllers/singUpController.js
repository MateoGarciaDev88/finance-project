import { db } from '../database/db.js';
import bcrypt from 'bcrypt';

const singUp = async (req, res) => {
    try {
        const { 
            correo, 
            contrasenia, 
            nombre_completo, 
            usuario, 
            telefono, 
            fecha_nacimiento, 
            pais, 
            genero, 
            acepta_terminos, 
        } = req.body;

        const [existeCorreo] = await db.promise().execute(
            'SELECT id FROM users WHERE correo = ?',
            [correo]
        );

        if (existeCorreo.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const [existeUsuario] = await db.promise().execute(
            'SELECT id FROM users WHERE usuario = ?',
            [usuario]
        );

        if (existeUsuario.length > 0) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);
        // console.log('🚀 ~ contraseniaEncriptada:', contraseniaEncriptada);
 
        // console.log('Insertando usuario en base de datos...');
        
        db.query(
            `INSERT INTO users (id, correo, contrasenia, nombre_completo, usuario, telefono, fecha_nacimiento, pais, genero, acepta_terminos, creado_en) 
            VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`,
            [correo, contraseniaEncriptada, nombre_completo, usuario, telefono, fecha_nacimiento, pais, genero, acepta_terminos], (err, rows) => {
                if (err) res.status(400).send(err);
                res.status(200).json({
                    message: 'Usuario registrado exitosamente',
                    userId: rows.insertId
                });
            }
        );

        console.log('Usuario insertado exitosamente, ID:', result.insertId); 
        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            userId: result.insertId 
        });

    } catch (error) {
        console.error('Error detallado en registro:', error); 
        
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ 
                message: 'Ya existe un usuario con estos datos' 
            });
        }
        
        // if (error.code === 'ECONNREFUSED') {
        //     return res.status(500).json({ 
        //         message: 'Error de conexión a la base de datos' 
        //     });
        // }

        res.status(500).json({ 
            message: 'Error interno del servidor',
        });
    }
};

export {
  singUp,
}