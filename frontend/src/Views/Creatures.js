import React from 'react';
import CreatureList from '../Components/CreatureList';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHammer } from '@fortawesome/free-solid-svg-icons'

function Creatures(){
    return (
        <div>
            <CreatureList/>
            <div className="w-full flex justify-center py-12">
                <Link className="hover:text-indigo-400 text-2xl text-center" to="/creature-builder"><FontAwesomeIcon icon={faHammer}/></Link>
            </div>
        </div>
    )
}

export default Creatures