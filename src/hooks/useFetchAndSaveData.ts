// libraires
import { useState, useEffect } from 'react';

const KEY = 'form-data';
const DELAY = 3000;

const fetchData = (key: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : null);
    }, DELAY);
  });
};

const saveData = (key: string, value: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(value);
    }, DELAY);
  });
};


export const useFetchAndSaveData = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(KEY);
      setData(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = (updatedData: any) => {
    saveData(KEY, updatedData);
  };

  return {
    data,
    loading,
    saveData: handleSave,
  };
};
