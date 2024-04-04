
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import React, { Fragment, useEffect, useState } from 'react';
import { getAllStores } from 'src/utils/apiUtils/store/allStores';
import { SearchBarStores } from 'src/components/store/list-all-stores/SearchBarStores';
import { StoreData } from 'src/pages/api/store/allStores';
import TableStores from 'src/components/store/list-all-stores/TableStores';

const AllStoresTable = () => {
    const [storeData, setStoreData] = useState([]);
    const [data, setData] = useState([]);

    const handleSearch = (searchValue: string | null) => {
        const findStore = data.filter((store: StoreData | any) => {
            if (searchValue) {
                return (
                    store.idStore.toLowerCase().includes(searchValue.toLowerCase()) ||
                    store.name.toLowerCase().includes(searchValue.toLowerCase())
                );
            } else {
                return true;
            }
        });
        console.log(findStore);
        setStoreData(findStore);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllStores();
                setStoreData(response.data);
                setData(response.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                <Link target='_blank'>
                    Listado de Tiendas
                </Link>
                </Typography>
                <Typography variant='body2'>Listado general de Tiendas</Typography>
            </Grid>
            <Grid item xs={12} md={6} >
                <SearchBarStores handleSearch={handleSearch} />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableStores dataServer={storeData} />
                </Card>
            </Grid>
        </Grid>
    )

}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
AllStoresTable.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default AllStoresTable;
