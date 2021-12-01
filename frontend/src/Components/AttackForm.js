import React, { useState } from 'react'

function AttackForm(){

    const [ name , setName ] = useState(null)
    const [ damageType , setDamageType ] = useState(null)
    const [ description , setDescription ] = useState(null)
    const [ attackType , setAttackType ] = useState(null)
    const [ damage , setDamage ] = useState(null)
    const [ area , setArea ] = useState(null)

    const [ msg, setMsg ] = useState("")

    const onSubmit = () => {
        if(fieldsNotNull()){
            fetch("http://localhost:8080/attacks", {
                method: "POST",
                body: JSON.stringify({
                        name:name,
                        damage:damage,
                        damageType:damageType, 
                        description:description, 
                        attackType:attackType, 
                        area:area
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(async (data) => {
                if (data.ok) {
                    window.open("/attacks", "_self")
                }
                else {
                    data = await data.json()
                    setMsg(data.message)
                }
            }).catch(() => setMsg("Connection error, try again later."))
        }
        else {
            setMsg("Please fill in all fields.")
        }
    }

    const fieldsNotNull = () => {
        return (name != null) & (description != null) & (damageType != null) & (attackType != null) & (damage != null)
    }

    return(
        <div className="p-10 bg-gray-100 border-2 border-gray-200 my-10 text-gray-600">
            <form className="flex flex-col space-y-10 items-left ">
                <h1 className="text-2xl text-gray-500"> Attack Builder </h1>

                <input type="text" placeholder=" Name" onChange={e => setName(e.target.value)}/>

                <textarea className="h-32" type="text" placeholder=" Description" onChange={e => setDescription(e.target.value)}/>

                <input type="number" placeholder=" Damage" onChange={e => setDamage(e.target.value)}/>

                <select onChange={e => setDamageType(e.target.value)}>
                    <option value={null}>- Select attack type -</option>
                    <option value="Piercing">Piercing</option>
                    <option value="Slashing">Slashing</option>
                    <option value="Bludgeoning">Bludgeoning</option>
                    <option value="Fire">Fire</option>
                    <option value="Water">Water</option>
                    <option value="Earth">Earth</option>
                    <option value="Electric">Electric</option>
                    <option value="Ice">Ice</option>
                </select>

                <select onChange={e => setAttackType(e.target.value)}>
                    <option value={null}>- Select damage type -</option>
                    <option value="Melee">Melee</option>
                    <option value="Ranged">Ranged</option>
                    <option value="Area">Area</option>
                </select>

                <input type="number" min="0" max="10" placeholder=" Area" onChange={e => setArea(e.target.value)}/>
            </form>
                    
            <button type="button" className="w-full text-xl text-center text-gray-500 pt-10" onClick={onSubmit}>Submit</button>
            <p className="w-full text-center text-red-700 pt-2">{msg}</p>
        </div>
    )
    
}

export default AttackForm