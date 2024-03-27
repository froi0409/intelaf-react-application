import React, { Fragment, useEffect, useState } from 'react';
import TableStores from 'src/components/store/list-all-stores/TableStores';
import TableShippingTimes from 'src/components/shipping-time/TableShippingTimes';
import { getAllShippingTimes } from 'src/utils/apiUtils/shipping-time/allShippingTimesUtil';

const AllShippingTimesTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllShippingTimes();
                setData(response.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <TableShippingTimes dataServer={data}></TableShippingTimes>
        </>
    )

}

export default AllShippingTimesTable;

