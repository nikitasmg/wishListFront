import React, {useState} from 'react';
import axios from "axios";

const AdminPanel = () => {

    const [itemId, setItemId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
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
           await axios.put(`https://wishlistbacknest.onrender.com/gifts/${itemId}`,{ isReserved: false} )
            setItemId('')
        } catch (e) {
            console.error(e)
            setError(e?.response.data.message)

        }
    }

    const addItem = async (data) => {
        try {
            await axios.post('https://wishlistbacknest.onrender.com/gifts', data)
        }
        catch (e) {
            console.error(e)
            setError(e?.response.data.message)
        }
    }

    const deleteGift = async () => {
      try {
        await axios.delete(`https://wishlistbacknest.onrender.com/gifts/${itemId}`)
          setItemId('')
      } catch (e) {
          setError(e?.response.data.message)
          console.error(e)
      }
    }
    return (
        <div className='p-10'>
            <h2 className='text-2xl mb-5'>Добавить новый подарок</h2>
            <form className='mb-10' onSubmit={(e) => handleSubmit(e)}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 mb-10'>

                    <div className='flex flex-col gap-1'>
                        <span>Имя</span>
                        <input
                            className='py-2 px-5 border-2 '
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <span>Описание</span>
                        <input
                            className='py-2 px-5 border-2 '
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <span>Ссылка</span>
                        <input
                            className='py-2 px-5 border-2 '
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            type="text"
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <span>Ссылка на картинку</span>
                        <input
                            className='py-2 px-5 border-2 '
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            type="text"
                        />
                    </div>
                </div>
                <button className='py-2 px-10 mx-auto border-2 border-black'>Submit</button>
            </form>
            <h2>Убрать из брони</h2>
            <form onSubmit={e => handleCancelReserve(e)}>
                <input placeholder='ID' type="text" value={itemId} onChange={e => setItemId(e.target.value)}/>
                <button className='py-2 px-10 mx-auto border-2 border-black ml-4'>Убрать из брони</button>
            </form>
            <button onClick={deleteGift} className='py-2 px-10 mx-auto border-2 border-black ml-4'>Удалить</button>
            <span className='text-2xl text-red-600'>{error}</span>
        </div>
    );
};

export default AdminPanel;