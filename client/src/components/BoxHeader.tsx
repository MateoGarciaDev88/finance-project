import React from 'react';
import FlexBetween from './FlexBetween';
import { useTheme } from '@mui/material';


const BoxHeader = () => {
  const { palette } = useTheme();

  return (
    <FlexBetween 
      color={palette.grey[400]}
      margin="1.5rem 1rem 0 1rem"
    >
       
    </FlexBetween>
  )
}

export default BoxHeader;