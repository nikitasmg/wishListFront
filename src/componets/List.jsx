import React, {useEffect, useState} from 'react';
import axios from "axios";
import Present from "./Present.jsx";

const List = () => {
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [notification, setNotification] = useState({
        error: false,
        message: ''
    })

    const doNotification = (message, error) => {
        setNotification({error, message})
        setTimeout(() => {
            setNotification({
                error: false,
                message: ''
            })
        }, 5000)
    }

    useEffect(() => {
        getList()
            .finally(() => setLoading(false))
    }, [])


    const handleAddReserve = async (id) => {
        try {
            const resp = await axios.put('https://wish-list-back.onrender.com/presents', {id, isReserved: true})
            setList(resp.data)
            doNotification('Успешно добавлено в бронь')
        } catch (e) {
            doNotification(e?.response.data.message, true)
            console.error(e)
        }
    }

    const getList = async () => {
        axios.get('https://wish-list-back.onrender.com/presents')
            .then(res => setList(res.data))
    }
    return (
        <div className='max-w-[1230px] mx-auto pb-10 relative'>
            <div className='min-h-screen px-3'>
                <div className='flex items-center lg:px-10 pt-[50px] lg:pt-[100px] mb-4 flex-col-reverse lg:flex-row'>
                    <h2 className='text-4xl leading-[1] lg:(text-[54px] leading-[64px]) font-bold text-neutral-800'>
                        Дорогие друзья, приглашаю вас на свой День Рождения c 14 на 15 января.
                    </h2>
                    <video autoPlay muted loop className="max-w-full lg:max-w-[540px] mb-10 lg:mb-0">
                        <source src="/giftsVideo.mp4" type="video/mp4"/>
                        Sorry, your browser doesn't support videos.
                    </video>
                </div>
                <div className='flex gap-4 lg:gap-1 flex-col mb-10 text-2xl text-neutral-800 '>
                    <span className='underline underline-offset-auto cursor-pointer'>
                        Место проведения - <br className='lg:hidden'/>(Уточним в скором времени)</span>
                    <span>Время проведения - <br className='lg:hidden'/> (Уточним в скором времени)</span>
                </div>
                <span className='block text-center mt-auto p-2 text-neutral-600 w-[200px] rounded-xl mx-auto'>Листай вниз <span>↓</span></span>
            </div>


            <h2 className='text-2xl lg: text-4xl text-center mb-5'>А вот и сам Wish List {loading}</h2>
            <span className='block mb-5 text-center text-red-600'>Важно! После нажатия кнопки "Беру себе", отменить выбор сможет только администратор. Если возникнут вопросы пишите <a
                className='underline text-blue-500' href="https://vk.com/id12961608" target='_blank'>Евгению Смагину</a></span>
            {
                loading
                    ? <h2 className='text-2xl text-center animate-pulse'> Подождите идет загрзука...</h2>
                    : <div className='px-2 grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5'>
                        {
                            list.length && list.map(el =>
                                <Present key={el.id} item={el} handleAddReserve={handleAddReserve} loading={loading}/>
                            )
                        }
                    </div>
            }
            {
                notification.message &&
                <div
                    className={`fixed top-5 right-5 lg:(top-10 right-10) w-[200px] py-3 text-white px-5 bg-green-300 rounded-md shadow-sm ${notification.error && 'bg-red-400'}`}>
                    {notification.message}
                </div>
            }

        </div>

    );
};

export default List;