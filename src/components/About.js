import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'


const About = () => {
  const a = useContext(noteContext);

  return (
    <div>
      This is notecontext {a.name} and {a.class};
    </div>
  )
}

export default About