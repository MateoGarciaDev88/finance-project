
const singOut = ( req, res ) => {
  const { username, name, password } = req.body;

  if ( !!username || !!name || !password ) {
    return res.status(400).json(jsonResponse(400, {
      error: 'Fields are requiered',
    }));
  }

  res.status(200).json({
    message: 'User signed out successfully',
  });
}

export {
  singOut,
};