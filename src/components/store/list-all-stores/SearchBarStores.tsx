import { Box, InputAdornment, TextField } from '@mui/material'
import { Magnify } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'

interface CDefault {
    handleSearch: (searchValue: string | null) => void
}

export const SearchBarStores = ({handleSearch}: CDefault) => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputValue(inputValue);
    }

    const handleEnterKey = (e: {key: any}) => {
        if (e.key === 'Enter') return handleSearch(inputValue)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                    id='searchIdcustomer'
                    value={inputValue ?? ""}
                    onChange={handleChange}
                    onKeyDown={handleEnterKey}
                    placeholder='Buscar por código de tienda'
                    size='small'
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
