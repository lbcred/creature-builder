import React, { useState, useEffect } from 'react'

function CreatureForm(){

    const [ name , setName ] = useState(null)
    const [ type , setType ] = useState(null)
    const [ description , setDescription ] = useState(null)
    const [ attacks , setAttacks ] = useState([])
    const [ stats ] = useState({health:null, attack:null, defense:null})
    const [ attackList, setAttackList ] = useState([])
    const [ attacksInput, setAttacksInput ] = useState([])

    const [ msg, setMsg ] = useState(" ")

    useEffect(() => {
        fetch("http://localhost:8080/attacks")
            .then(res => res.json())
            .then(
                (result) => {
                    setAttackList(result);
                }).catch(() => setMsg("Connection error, try again later."))
  }, []);

    const onSubmit = () => {
        if(fieldsNotNull()){
            fetch("http://localhost:8080/creatures", {
            method: "POST",
            body: JSON.stringify({
                    name:name,
                    type:type, 
                    description:description, 
                    attacks:attacks, 
                    stats:stats
                }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(async (data) => {
                if (data.ok) {
                    window.open("/creatures", "_self")
                }
                else {
                    data = await data.json()
                    setMsg(data.message)
                }
            }).catch(e => setMsg("Connection error, try again later."))
        }
        else {
            setMsg("Please fill in all fields.")
        }
    }

    const addAttack = (e) => {
        if(e.target.value != null){
            let attackToAdd = attackList.find(attack => attack.id.toString() === e.target.value)
            setAttacks([...attacks, attackToAdd]);
        }
    }

    const addAttackInput = () => {
        setAttacksInput([...attacksInput, 
            <select className="mb-10 w-full" onChange={addAttack}>
                <option value="Select an attack">- Select an attack -</option>
                {attackList.map((attack) => <option key={attack.id} value={attack.id}>{attack.name}</option>)}
            </select>
        ])
    }

    const removeAttackInput = () => {
        setAttacksInput(attacksInput.slice(0, -1))
        setAttacks(attacks.slice(0, -1))
    }

    const fieldsNotNull = () => {
        return (name != null) & (description != null) & (stats.defense != null) & (stats.attack != null) & (stats.health != null)
    }

    return(
        <div className="p-10 bg-gray-100 border-2 border-gray-200">
            <form className="flex flex-col items-left space-y-10">
                <h1 className="text-2xl text-gray-500"> Creature Builder </h1>
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Type" onChange={e => setType(e.target.value)}/>
                <textarea className="w-full h-32 align-text-top"type="text" placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                
                <div className="space-x-10 flex justify-between">
                    <input className="w-1/3" type="number" placeholder="HP" onChange={e => stats.health = e.target.value}/>
                    <input className="w-1/3" type="number" placeholder="ATT" onChange={e => stats.attack = e.target.value}/>
                    <input className="w-1/3" type="number" placeholder="DEF" onChange={e => stats.defense = e.target.value}/>
                </div>

                <p className="text-lg text-gray-500">Attacks:</p>
                <div className="flex flex-col items-center w-full">
                    {/* Return the attack inputs*/}
                    {attacksInput}
                    <div onClick={() => removeAttackInput()} className="cursor-pointer text-3xl text-red-700">-</div>
                    <div onClick={() => addAttackInput()} className="cursor-pointer text-3xl text-green-700">+</div>
                </div>
            </form>
            <button type="button" className="w-full text-xl text-gray-500 pt-10" onClick={() => onSubmit()}>Submit</button>
            <p className="w-full text-center text-red-700">{msg}</p>
        </div>
    )
    
}

export default CreatureForm