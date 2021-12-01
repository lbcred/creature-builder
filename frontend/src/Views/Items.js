import React from 'react'
import ItemList from '../Components/ItemList';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHammer } from '@fortawesome/free-solid-svg-icons'

function Items(){
    return (
        <div>
            <ItemList/>
            <div className="w-full flex justify-center py-12">
                <Link className="hover:text-indigo-400 text-2xl text-center" to="/item-builder"><FontAwesomeIcon icon={faHammer}/></Link>
            </div>
        </div>
    )
}

export default Items