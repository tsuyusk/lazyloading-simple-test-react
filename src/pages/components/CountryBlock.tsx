import React from 'react'
import { Country } from '../Main'

interface CountryBlockProps {
  country: Country;
}

function CountryBlock({ country }: CountryBlockProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      <img className="" src={country.flags.png} alt={country.name.common} loading="lazy" />
      <h1 className="text-xl">{country.name.common}</h1>
    </div>
  )
}

export default CountryBlock;
