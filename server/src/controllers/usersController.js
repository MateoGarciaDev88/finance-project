import bcrypt from 'bcrypt';
import { db } from '../database/db.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'AvionArrancando$$';

const login = (req, res) => {
    try {
        const { correo, contrasenia } = req.body;

        if (!correo || !contrasenia) {
            return res.status(400).json({ 
                message: 'Correo y contraseña son obligatorios' 
            });
        }

        const [result] = db.query(
            'SELECT * FROM users WHERE correo = ?',
            [correo]
        );

        if (result.length === 0) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        const user = result[0];
        console.log('Usuario encontrado:', user.id, user.correo); 

        const contraseniaValida = bcrypt.compare(contrasenia, user.contrasenia);

        if (!contraseniaValida) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: user.id, correo: user.correo }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                correo: user.correo, 
                usuario: user.usuario, 
                nombre_completo: user.nombre_completo 
            }
        });

    } catch (error) {
        console.error('Error detallado en login:', error); 
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export {
    createUser,
    login,
};