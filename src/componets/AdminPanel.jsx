import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {UiSelect} from '../UI/UiSelect/UiSelect.jsx'
import {mock} from './List.jsx'

const AdminPanel = () => {

    const [itemId, setItemId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('')
    const [list, setList] = useState([])

    const getList = async () => {
        axios.get('/gifts')
            .then(({data}) => setList(data))
            .catch(e => console.error(e))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = {
            name,
            description,
            url,
            imageUrl
        }
        if (!name) {
            setError('Нужно добавить имя')
            return
        }
        await addItem(form)
        setName('')
        setUrl('')
        setImageUrl('')
        setDescription('')
    }

    const handleCancelReserve = async (e) => {
        e.preventDefault()
        if (!itemId) {
            setError('ID пустой')
            return
        }
        try {
            await axios.put(`/gifts/${itemId}`, {isReserved: false})
            getList().catch(() => {
            })
            setItemId('')
        } catch (e) {
            console.error(e)
            setError(e?.response.data.message)
        }
    }

    const addItem = async (data) => {
        try {
            await axios.post('/gifts', data)
        } catch (e) {
            console.error(e)
            setError(e?.response.data.message)
        }
    }

    const deleteGift = async () => {
        try {
            await axios.delete(`/gifts/${itemId}`)
            setItemId('')
            getList().catch(e => console.error(e))
        } catch (e) {
            setError(e?.response.data.message)
            console.error(e)
        }
    }

    useEffect(() => {
        getList().catch(() => {
        })
    }, [])

    return (
        <div className="p-10 max-w-[1440px] mx-auto">
            <h2 className="text-2xl mb-5">Добавить новый подарок</h2>
            <form className="mb-10" onSubmit={(e) => handleSubmit(e)}>
                <div className="grid grid-cols-1 gap-2 lg:gap-4 mb-10">

                    <label className="flex flex-col gap-1">
                        <span>Имя</span>
                        <input
                            className="py-2 px-5 border bg-gray-50 rounded-lg border-gray-300"
                            placeholder="Название подарка"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Описание</span>
                        <textarea
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Описание для подарка"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Ссылка</span>
                        <input
                            className="py-2 px-5 border bg-gray-50 rounded-lg border-gray-300"
                            placeholder="Ссылка на подарок"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            type="text"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Ссылка на картинку</span>
                        <input
                            className="py-2 px-5 border bg-gray-50 rounded-lg border-gray-300"
                            placeholder="Ссылка на картинку"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            type="text"
                        />
                    </label>
                </div>
                <button
                    className="py-2 px-10 mx-auto rounded border-2 border-green-700 text-green-700 hover:text-white hover:bg-green-700">Добавить
                    подарок
                </button>
            </form>
            <h2 className="mb-4">Убрать из брони</h2>
            <form onSubmit={e => handleCancelReserve(e)}>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="city-select">Выберите подарок для удаления / отмены брони</label>
                    <UiSelect className='w-full md:max-w-[400px]' data={list} handleChange={setItemId}/>
                </div>
                <div className="flex flex-col gap-2 max-w-[400px]">
                    <button className="py-2 px-10 border-2 border-black rounded">Убрать из брони</button>
                    <button type="button" onClick={deleteGift}
                            className="py-2 px-10 border-2 border-red-500 text-red-500 rounded">Удалить
                    </button>
                </div>
            </form>
            <span className="text-2xl text-red-600">{error}</span>
        </div>
    )
}

export default AdminPanel