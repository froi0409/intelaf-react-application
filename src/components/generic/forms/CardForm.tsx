import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import React from 'react'


interface getProps {
    title: string,
    children: any | null
}

export const CardForm = (props: getProps) => {
  return (
    <Card>
        <CardHeader title={props.title} titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />
        <CardContent >
            <Grid container spacing={5}>
            {props.children ? props.children : null}
            </Grid>
        </CardContent>
    </Card>
  )
}
