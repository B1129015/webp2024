import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';


function Datagrid() {
    const [Data, setData] =useState([]);
    const [inputValue, setInputValue] = useState('');
    const [FilteredData, setFilteredData] = useState([]);
    useEffect(() => {
        fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
        .then(res => res.json())
        .then(json => {
            const getData = json.map((item, index) =>({
                ...item,
                id: index + 1,
                title: item.title,
                location:item.location,
                price:item.price,
            }));
            setData(getData);
        })
    },[]);


    useEffect(() => {
        const filtered = Data.filter(item =>
            item.title.toUpperCase().includes(inputValue.toUpperCase())
        );
        setFilteredData(filtered);
        console.log(filtered);
    }, [Data, inputValue]);
    
    

    const columns = [
        {field:'title', headerName:'名稱', width:200}, 
        {field:'location', headerName:'地標', width:200}, 
        {field:'price', headerName:'票價', width:150}, 
    ];

    const datarows = FilteredData.length>0 ?FilteredData.map((item) => ({
        id:item.id, 
        title:item.title,
        location: item.showInfo[0].location, 
        price:item.showInfo[0].price,
    })):Data.map((item) => ({
        id:item.id, 
        title:item.title,
        location: item.showInfo[0].location, 
        price:item.showInfo[0].price,
    }));
    
    return(
        <>
        <div>
            <h1>景點觀光展覽資訊</h1>
            搜尋相關字:
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="搜尋展覽名稱"
            />
            <div style={{height: 400, width:'100%'}}>
                <DataGrid rows = {datarows} columns={columns} initialState={{pagination: { paginationModel: { pageSize: 10 } }}} pageSizeOptions={[10]}/>
            </div>
        </div>
        </>
    )
}

export default Datagrid
