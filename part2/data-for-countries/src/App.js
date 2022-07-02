import axios from "axios";
import { useEffect, useState } from "react";
import View from './components/View'
const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = event => {
    setFilter(event.target.value)
  }

  const filterCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log(filterCountries);

  return (
    <div>
      <div>
        find countries<input value={filter} onChange={handleChange}/>
      </div>
      <View countries={filterCountries}/>
    </div>
  )
}

export default App;
