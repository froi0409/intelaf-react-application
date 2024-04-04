import { Box, InputAdornment, TextField } from '@mui/material'
import { Magnify } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'


interface CDefault {
    handleSearch : (searchvalue: string | null) => void
}

export const SearchBarSale = ({handleSearch}: CDefault) => {
    //Traping the value
    const [inputValue, setValue] = useState('');
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    }

    const handleEnterKey = (e : {key:any}) => {
        if (e.key === 'Enter') return handleSearch(inputValue)
    }


    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                    id='searchIdProducto'
                    value={inputValue ?? ""}
                    onChange={handleChange}
                    onKeyDown={handleEnterKey}
                    placeholder='Buscar por codigo de venta'
                    size='medium'
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Magnify fontSize='small' />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        </Box>
    )
}
