import React,{useEffect, useState} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';



function LocationAutocomplete({LocationData,businessLoacationData}) {
    const [value, setValue] = useState(null);

useEffect(()=>{
    LocationData(value)
 
},[value])
    console.log(value?.value.structured_formatting.main_text)
   

  return (
      <>
      
      <div>
    <GooglePlacesAutocomplete
  selectProps={{
    value,
    onChange: setValue,
    placeholder: 'Add location...',
  }}
  apiKey="AIzaSyAo1pnpFbJmFkbltD29oTeRNkewLFMlAvI"
/>
  </div>
      
      
      </>
    
  )
}

export default LocationAutocomplete