import { Box, Button, IconButton, Modal, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import DashboardBox from '../../components/DashboardBox';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { getCategories, createCategoryRequest } from '../../api/categories.api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  p: 4,
};

function createData(
  name: string,
  description: string,
  action: string,
) {
  return { name, description, action };
}

const rows = [
  createData('Gastos', 'categoria gastos', 'borrar'),
  createData('Gastos', 'categoria gastos', 'borrar'),
  createData('Gastos', 'categoria gastos', 'borrar'),
]

const Categories = () => {
  // const [categoryData, setCategoryData] = useState({
  //   tittle: '',
  //   description: '',
  // })
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");

  const { palette } = useTheme();
  const [openModal, setOpenModal] = useState(false)
  
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(tittle)
    // const { description, tittle } = e.target;
    // console.log('thinking')
    // console.log('🚀 ~ description, tittle:', description, tittle);
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCategoryData({ ...categoryData, [name]: value })
    
  //   // const { } = e.target;
  // }



  return (
  <Box
    height="100%"
    width="100%"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
  >
    {/* <div className='table-container'> */}
    <Stack alignItems='center'>
      <TableContainer 
        sx={{
          width: '50%',
        }}
      >
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableCell>Categorias</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell align="center" sx={{ width: '200px'}} >Acciones</TableCell>
          </TableHead>
          <TableBody>
            { rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align='center'>
                  <Button >Editar</Button>
                  <Button>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
    </Stack>

    {/* </div> */}
    <Stack direction='row' spacing={1} sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}> 
      <IconButton
        onClick={handleOpen}
        size="large"
        sx={{
          backgroundColor: palette.primary[100],
          "&:hover": {color: palette.primary[100]}
        }}
      >
        <AddSharpIcon fontSize="large" />
      </IconButton>
    </Stack>
    <Modal
      open={openModal}
      onClose={handleClose}
    >
      <DashboardBox sx={style}>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '90%', color: palette.grey[300] } }}
          noValidate
          autoComplete="off"
          color={ palette.grey[300] }
          onSubmit={handleSubmit}
        > 
            <TextField
              label="Titulo"
              multiline
              maxRows={4}
              variant="standard"
              value={tittle}
              type='text'
              onChange={(e) => setTittle(e.target.value)}
            />
            <TextField
              label="Descripcion"
              multiline
              maxRows={4}
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type='submit' variant='outlined'>Guardar</Button>
        </Box>
      </DashboardBox>
    </Modal>
  </Box>
  )
}

export default Categories;