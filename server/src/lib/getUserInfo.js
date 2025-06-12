export const getUserInfo = ( user ) => {
  return {
    id: user.id,
    correo: user.correo,
    usuario: user.usuario,
  }
}