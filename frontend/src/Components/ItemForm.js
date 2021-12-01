import React, { useState } from 'react'

function ItemForm(){

    const [ name , setName ] = useState(null)
    const [ description , setDescription ] = useState(null)
    const [ itemType , setItemType ] = useState(null)

    const [ msg, setMsg ] = useState("")

    const onSubmit = () => {
        if(fieldsNotNull()){
            fetch("http://localhost:8080/items", {
                method: "POST",
                body: JSON.stringify({
                        name:name,
                        description:description, 
                        itemType:itemType
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(async (data) => {
                if (data.ok) {
                    window.open("/items", "_self")
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
        return (name != null) & (description != null) & (itemType != null)
    }

    return(
        <div className="p-10 bg-gray-100 border-2 border-gray-200 my-10 text-gray-600">
            <form className="flex flex-col space-y-10 items-left ">
                <h1 className="text-2xl text-gray-500"> Item Builder </h1>

                <input type="text" placeholder=" Name" onChange={e => setName(e.target.value)}/>

                <textarea className="h-32" type="text" placeholder=" Description" onChange={e => setDescription(e.target.value)}/>

                <select onChange={e => setItemType(e.target.value)}>
                    <option value={null}>- Select item type -</option>
                    <option value="Accessory">Accessory</option>
                    <option value="Armour">Armour</option>
                    <option value="Weapon">Weapon</option>
                    <option value="Consumable">Consumable</option>
                    <option value="Misc">Misc</option>
                </select>

            </form>
                    
            <button type="button" className="w-full text-xl text-center text-gray-500 pt-10" onClick={onSubmit}>Submit</button>
            <p className="w-full text-center text-red-700 pt-2">{msg}</p>
        </div>
    )
    
}

export default ItemForm