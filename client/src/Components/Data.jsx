import { createContext, useEffect, useState } from 'react';
const ApiContext = createContext();
export { ApiContext };
export default function Data({ children }) {
  const [data, setData] = useState(null);
  //   const value = useMemo(() => data, [data]);
  //   console.log(value, 'this is memoised');
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          'https://housify-ztdw.onrender.com/api/houses/houses'
        );
        const data = await res.json();
        if (!data.success) {
          console.log('error');
          return;
        }
        setData(data.data);
        console.log('this is context data', data);
      } catch (error) {
        console.log('big error', error);
      }
    }
    getData();
  }, []);

  return <ApiContext.Provider value={{ data }}>{children}</ApiContext.Provider>;
}
