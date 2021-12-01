import React, { useState, useEffect } from 'react'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ItemList() {
    const [items, setItems] = useState([])

    const [msg, setMsg] = useState("")
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchItemList();
    }, []);

    const deleteItem = (itemId) => {
        if (window.confirm("This item will be removed from all creatures. Are you sure?")) {
            fetch("http://localhost:8080/items/" + itemId, {
                method: "DELETE"

            })
                .then(async data => {
                    if (data.ok) {
                        fetchItemList()
                    }
                    else {
                        data = await data.json()
                        setMsg(data.message)
                    }
                })
                .catch(() => setMsg("Connection error, try again later."))
        }
    }

    const fetchItemList = () => {
        fetch("http://localhost:8080/items")
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
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
                            <th className="border-grey-400 border-2">Item Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.sort(
                            function (first, second) {
                                return first.id - second.id;
                            }).map(
                                item => (<tr key={item.id}><td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{item.name}</td>
                                    <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{item.description}</td>
                                    <td className="border-grey-400 border-b-2 border-r-2 border-l-2 pl-2 pr-2">{item.itemType}</td>
                                    <td className="bg-gray-50 text-lg cursor-pointer px-2 hover:text-indigo-500" onClick={() => deleteItem(item.id)}><FontAwesomeIcon icon={faTrashCan} /></td>
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

export default ItemList