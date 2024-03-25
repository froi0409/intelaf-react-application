import { Grid } from '@mui/material'
import React from 'react'

export const GridItemForm = (props: any) => {
  return (
    <Grid item xs={12} md={props.md ? props.md : 6}>
        {props.children}
    </Grid>
  )
}
