import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDragon, faFistRaised, faBook} from '@fortawesome/free-solid-svg-icons'
import Header from './Header'

function Navigation(){
    return (
        <div className="flex text-indigo-500 justify-between items-center w-full text-2xl p-1 pr-5 pl-5 bg-gray-100 border-b-2 md:text-3xl">
            <Link className="hover:text-indigo-400" to="/"><FontAwesomeIcon icon={faHome}/></Link>
            <Link to="/"><Header/></Link>
            <Link className="hover:text-indigo-400" to="/creatures"><FontAwesomeIcon icon={faDragon}/></Link>
            <Link className="hover:text-indigo-400" to="/items"><FontAwesomeIcon icon={faBook}/></Link>
            <Link className="hover:text-indigo-400" to="/attacks"><FontAwesomeIcon icon={faFistRaised}/></Link>
        </div>        
    )
}

export default Navigation