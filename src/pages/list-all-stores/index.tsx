import React, { Fragment, useEffect, useState } from 'react';
import TableStores from 'src/components/list-all-stores/TableStores';

import axios from 'axios';

const AllStoresTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(process.env.URL_API_BACKEND_COMPLETE);
                const response = await axios.get(`http://localhost:8080/v1/store/getAll`);
                const result = response.data;
                setData(result);
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
