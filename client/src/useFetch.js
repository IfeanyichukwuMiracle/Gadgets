import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (query, dependency) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(
    () => {
      setFetching(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(query);
          setData(response.data.data);
          setFetching(false);
        } catch (error) {
          console.log(error);
          setFetching(false);
        }
      };

      fetchData();
    },
    dependency ? [dependency] : []
  );

  return { data, fetching };
};

export default useFetch;
