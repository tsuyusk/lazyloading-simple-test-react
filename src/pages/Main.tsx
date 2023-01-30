import { useQuery } from 'react-query';
import axios from 'axios';
import { lazy } from 'react';
import { LoadOnSee } from '../utils/LoadOnSee';
const CountryBlock = LoadOnSee(() => import('./components/CountryBlock'));

export interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  }
}

const getCountries = (): Promise<Country[]> => 
  axios.get('https://restcountries.com/v3.1/all')
    .then(res => res.data)


export default function Main() {
  const { data } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries
  });
  
  if (!data) {
    return;
  }

  return (
    <main className="w-full min-h-full bg-slate-800 text-white">
      {data.map(country => (
        <CountryBlock country={country} />
      ))}
    </main>
  )
}
