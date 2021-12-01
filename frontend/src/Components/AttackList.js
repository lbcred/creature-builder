import React, { useState, useEffect } from 'react'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AttackList() {
    const [attacks, setAttacks] = useState([])

    const [msg, setMsg] = useState("")
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchAttackList();
    }, []);

    const deleteAttack = (attackId) => {
        if (window.confirm("This attack will be removed from all creatures. Are you sure?")) {
            fetch("http://localhost:8080/attacks/" + attackId, {
                method: "DELETE"

            })
                .then(async data => {
                    if (data.ok) {
                        fetchAttackList()
                    }
                    else {
                        data = await data.json()
                        setMsg(data.message)
                    }
                })
                .catch(() => setMsg("Connection error, try again later."))
        }
    }

    const fetchAttackList = () => {
        fetch("http://localhost:8080/attacks")
            .then(res => res.json())
            .then(
                (result) => {
                    setAttacks(result);
                    setIsLoaded(true);
                }).catch(() => setMsg("Connection error, try again later."))
    }

    if (isLoaded) {
        return (
            <div>
                <p className="text-center text-red-700 py-10">{msg}</p>
                <table className="bg-gray-100 mt-5 w-full text-xs lg:text-md">
                    <thead>
                        <tr>
                            <th className="border-grey-400 border-2">Name</th>
                            <th className="border-grey-400 border-2">Description</th>
                            <th className="border-grey-400 border-2">Damage</th>
                            <th className="border-grey-400 border-2">Damage Type</th>
                            <th className="border-grey-400 border-2">Attack Type</th>
                            <th className="border-grey-400 border-2">Area</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {attacks.sort(
                            function (first, second) {
                                return first.id - second.id;
                            }).map(
                                attack => (<tr key={attack.id}><td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{attack.name}</td>
                                    <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{attack.description}</td>
                                    <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{attack.damage}</td>
                                    <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{attack.damageType}</td>
                                    <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{attack.attackType}</td>
                                    <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{attack.area}</td>
                                    <td className="bg-gray-50 text-lg cursor-pointer px-2 hover:text-indigo-500" onClick={() => deleteAttack(attack.id)}><FontAwesomeIcon icon={faTrashCan} /></td>
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

export default AttackList