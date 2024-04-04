import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CardForm } from 'src/components/generic/forms/CardForm'
import { GridItemForm } from 'src/components/generic/forms/GridItemForm'


interface AutocompleteStore {
    label: string,
    store: any
}

const transformStore = (store: any): AutocompleteStore => {

    return {
      label: store.name,
      store: store
    }
  }

  
export const FormOrderStore = (props: any) => {
    const currentStore = props.currentStore
    const filterCurrentStore = props.stores.filter((store : any) => store.idStore !== currentStore)
    const stores = filterCurrentStore.map(transformStore)

    const [value, setValue] = useState<AutocompleteStore | null>(null)

    const handleOnChangeAutocomplete = (event: any, newValue: AutocompleteStore | null) => {
        if (newValue){
            props.handleOnUpdatesetSelectedStore(newValue.store.idStore)
            setValue(newValue)
        } else {
            props.handleOnUpdatesetSelectedStore(null)
            setValue(null)
        }
    }

    return (
        <CardForm title="Elegir la tienda" >
            <GridItemForm >
                <Autocomplete
                    value={value}
                    onChange={handleOnChangeAutocomplete}
                    disablePortal
                    id="form-order-product-combo"
                    options={stores}
                    renderInput={(params) => <TextField {...params} label="Tienda" />}
                />  
            </GridItemForm>
        </CardForm>
    )
}
