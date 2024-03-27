import React, { Fragment, useEffect, useState } from 'react';
import TableStores from 'src/components/store/list-all-stores/TableStores';

import axios from 'axios';
import { getAllStores } from 'src/utils/apiUtils/store/allStores';

const AllStoresTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllStores();
                
                setData(response.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <TableStores dataServer={data} />
        </>
    )

}

export default AllStoresTable;
