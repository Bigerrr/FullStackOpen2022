const View = ({countries}) => {

    if(countries.length > 10)
        return (
            <p>Too many matches({countries.length}), specify another filter</p>
        )
    else if(countries.length > 1)
        return (
            <div>
                {countries.map((country) => <p key={country.name.common}>{country.name.common}</p>)}
            </div>
        )
    else if(countries.length === 1)
        return (
            <div>
                <h2>{countries[0].name.common}</h2>
                <p>capital{' '}{countries[0].capital}</p>
                <p>area{' '}{countries[0].area}</p>
                <b>Languages:</b>
                <ul>
                    {Object.values(countries[0].languages).map((language,index)=><li key={index+1}>{language}</li>)}
                </ul>
                <img src={countries[0].flags.png} alt='Flag'/>
            </div>
        )
}

export default View