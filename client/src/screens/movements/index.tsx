import { useState } from "react";
import MovimientosFinancieros from "./MovimientosFinancieros";
import { Box, Button, IconButton, MenuItem, Modal, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'
import { NumericFormat } from 'react-number-format'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import DashboardBox from "../../components/DashboardBox";

const movimientos = [
  {
    id: '1',
    categoria: 'Ingreso',
    descripcion: 'Salario mensual',
    monto: 3500000,
    fecha: '2025-05-01',
    persona: 'Carlos',
  },
  {
    id: '2',
    categoria: 'Gasto',
    descripcion: 'Arriendo',
    monto: 1200000,
    fecha: '2025-05-02',
    persona: 'Carlos',
  },
  {
    id: '3',
    categoria: 'Ahorro',
    descripcion: 'Ahorro para viaje',
    monto: 300000,
    fecha: '2025-05-03',
    persona: 'Carlos',
  },
  {
    id: '4',
    categoria: 'Inversión',
    descripcion: 'Cripto activos',
    monto: 500000,
    fecha: '2025-05-04',
    persona: 'Carlos',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  p: 4,
};

const Movement = () => {
  const { palette } = useTheme();
  const [openModal, setOpenModal] = useState(false)

  function createData(
    amount: number,
    name: string,
    description: string,
    action: string,
  ) {
    return { amount, name, description, action };
  }

  const rows = [
    createData(1000, 'Gastos1', 'categoria gastos', 'borrar'),
    createData(1000, 'Gastos2', 'categoria gastos', 'borrar'),
    createData(1000, 'Gastos3', 'categoria gastos', 'borrar'),
  ]


  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  return (
    <Box 
      height="100%"
      width="100%"
    >
      <MovimientosFinancieros movimientos={movimientos} />
      <Stack direction='column' height='65%' sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Stack alignItems='center'>
          <TableContainer 
            sx={{
              width: '60%',
            }}
          >
            <Table sx={{ minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableCell>Cantidad</TableCell>
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
                      {row.amount}
                    </TableCell>
                    <TableCell >
                      {row.name}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align='center'>
                      <Button>Editar</Button>
                      <Button>Eliminar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>  
        </Stack>
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
      </Stack>
      <Modal
        open={openModal}
        onClose={handleClose}
      >
        <DashboardBox sx={style}>
          <Box
            component='form'
            sx={{ '& .MuiTextField-root': { m: 1, width: '90%', color: palette.grey[300] } }}
            noValidate
            autoComplete="off"
            color={ palette.grey[300] }
          >
            <div>
              <NumericFormat
                label="Cantidad"
                customInput={TextField}
                thousandSeparator
                valueIsNumericString
                prefix="$"
                variant="standard"
              />
            </div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: '90%' }}>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                label="Categoria"
              >
                <MenuItem value='Ocio'>Ten</MenuItem>
                <MenuItem value='Salud'>Twenty</MenuItem>
                <MenuItem value='Ahorros'>Thirty</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Descripcion"
              multiline
              maxRows={4}
              variant="standard"
            />
            <Button>Guardar</Button>
          </Box>
        </DashboardBox>
      </Modal>
    </Box>
  );
};

export default Movement;