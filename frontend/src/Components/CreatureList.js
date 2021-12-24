import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faHeart, faMeteor } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import React, { useState, useEffect }from 'react'

function CreatureList(){
    const [ creatures, setCreatures ] = useState([])

    const [ msg, setMsg ] = useState("")
    const [ isLoaded, setIsLoaded ] = useState(false)

    useEffect(() => {
        fetchCreatureList()
    }, []);

    const deleteCreature = (creatureId) => {
        if(window.confirm("This creature will be lost forever and cannot be recovered. Are you sure?")){
            fetch("http://localhost:8080/creatures/"+creatureId, {
                method:"DELETE"

                })
                .then(async data => {
                    if(data.ok){
                        fetchCreatureList()
                    }
                    else{
                        data = await data.json()
                        setMsg(data.message)
                    }
                })
                .catch(() => setMsg("Connection error, try again later."))
        }
    }

    const fetchCreatureList = () => {
        fetch("http://localhost:8080/creatures")
            .then(res => res.json())
            .then(
                (result) => {
                    setCreatures(result);
                    setIsLoaded(true);
                }).catch(() => setMsg("Connection error, try again later."))
    }

    if(isLoaded){
    return (
        <div>
            <p className="text-center text-red-700 py-10">{msg}</p>
            <table className="bg-gray-100 mt-5 text-xs lg:text-md">
                <thead>
                    <tr>
                        <th className="border-grey-400 border-2">Name</th>
                        <th className="border-grey-400 border-2">Type</th>
                        <th className="border-grey-400 border-2">Description</th>
                        <th className="border-grey-400 border-2">Attacks</th>
                        <th className="border-grey-400 border-2">Items</th>
                        <th className="border-grey-400 border-2">Stats</th>
                    </tr>
                </thead>
                <tbody>
                    {creatures.sort(
                        function(first, second) {
                            return first.id - second.id;
                        }).map(
                        creature => (<tr key={creature.id}><td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{creature.name}</td>
                                <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{creature.type}</td>
                                <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{creature.description}</td>
                                <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{
                                    creature.attacks.map(
                                        attack => (<p key={attack.id}>{attack.name}</p>)
                                    )
                                }</td>
                                <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{
                                    creature.items.map(
                                        item => (<p key={item.id}>{item.name}</p>)
                                    )
                                }</td>
                                <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{
                                    <div>
                                        <p>
                                            <FontAwesomeIcon icon={faHeart} className="text-green-700"/>
                                            {creature.stats.health}
                                        </p>
                                        <p>
                                            <FontAwesomeIcon icon={faMeteor} className="text-red-700"/>
                                            {creature.stats.attack}
                                        </p>
                                        <p>
                                            <FontAwesomeIcon icon={faShieldAlt} className="text-yellow-500"/>
                                            {creature.stats.defense}
                                        </p>
                                    </div>
                                }</td>
                                <td className="bg-gray-50 cursor-pointer px-2 text-lg hover:text-indigo-500" onClick={() => deleteCreature(creature.id)}><FontAwesomeIcon icon={faTrashCan}/></td>
                                </tr>
                            )
                    )}
                </tbody>
            </table>
        </div>
    )
                            }

    else {
        return (
            <div>
                <p className="text-center text-red-700 py-10">{msg}</p>
            </div>
        )
}
}

export default CreatureList
