const LanguagePreference = (props) => {
  const star = String.fromCharCode(9733)
  //Capitalise language names
  let name = props.language
  name = name.charAt(0).toUpperCase() + name.slice(1)
  
  return (
    <p>{name}: {star.repeat(props.skill)}</p>
  )
}

export default LanguagePreference;