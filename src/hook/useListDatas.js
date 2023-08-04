import { useState, useEffect } from "react";
import axios from '../API/axios';

export const useListDatas = (url = '', offset) => {
  const [listData,setListData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const [regTotal, setRegTotal] = useState(0);

  const getData = async()=>{
    const {data, status} = await axios.get(url);
    setLoading(false);
    setListData(data);
    setStatus(status);
   setRegTotal(data.total);
  }
  useEffect(() => {
    if (offset !== undefined) {
      getData();
    }
  }, [offset])
  return {
    listData,
    status,
    loading,
    regTotal
  }
}