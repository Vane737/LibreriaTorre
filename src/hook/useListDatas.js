import { useState, useEffect } from "react";
import axios from '../API/axios';

export const useListDatas = (url = '') => {
  const [listData,setListData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const [cantReg, setCantReg] = useState(0);

  const getData = async()=>{
    const {data, status} = await axios.get(url);
    setLoading(false);
    setListData(data);
    setStatus(status);
    console.log('Este es el total de registros', data.total);
//    setCantReg(data.total);
  }
  useEffect(() => {
    getData();
  }, [])
  return {
    listData,
    status,
    loading,
    cantReg
  }
}