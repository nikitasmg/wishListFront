import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Present from './Present.jsx'
import {motion} from 'framer-motion'
import {ConfirmModal} from './ConfirmModal.jsx'

const mock = [{
    id: 1,
    name: 'Платье Авроры',
    isReserved: false,
    description: 'Я люблю переодеваться поэтому хочу его',
    imageUrl: 'https://ir.ozone.ru/s3/multimedia-2/wc1000/6725918702.jpg',
    url: 'фывфывфыв'
}, {
    id: 2,
    name: 12313,
    isReserved: false,
    description: 12312312,
    imageUrl: 'https://ouch-cdn2.icons8.com/NRFHKI8ATxaz4UJ1Ozs212gPnTwnv9z2mBo8k5RvKec/rs:fit:760:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjE0/LzczMTNmNzE0LWQ0/YzEtNDczNi1hNjAz/LWVhMTcyOThjMDQz/YS5wbmc.png'
}, {
    id: 3,
    name: 12313,
    isReserved: false,
    description: 12312312,
    imageUrl: 'https://ouch-cdn2.icons8.com/NRFHKI8ATxaz4UJ1Ozs212gPnTwnv9z2mBo8k5RvKec/rs:fit:760:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjE0/LzczMTNmNzE0LWQ0/YzEtNDczNi1hNjAz/LWVhMTcyOThjMDQz/YS5wbmc.png'
}]

const List = () => {
    const [loading, setLoading] = useState(false)
    const [presentLoading, setPresentLoading] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [currenId, setCurrentId] = useState('')

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


    const handleOpenConfirm = (id) => {
        setIsConfirmModalOpen(true)
        setCurrentId(id)
        console.log(id)
    }

    const handleCloseConfirm = () => {
        setIsConfirmModalOpen(false)
        setCurrentId('')
    }

    const handleAddReserve = async () => {
        setPresentLoading(true)
        try {
            await axios.put(`/gifts/${currenId}`, {isReserved: true})
            const newList = list.map(el => {
                if (el.id === currenId) {
                    return {
                        ...el,
                        isReserved: true
                    }
                }
                return el
            })
            setList(newList)
            doNotification('Успешно добавлено в бронь')
        } catch (e) {
            doNotification(e?.response.data.message, true)
            console.error(e)
        } finally {
            setCurrentId('')
            setIsConfirmModalOpen(false)
            setPresentLoading(false)
        }
    }

    useEffect(() => {
        getList().catch(e => console.error('ошибка при получении списка подароков', e))
    }, [])

    const getList = async () => {
        setLoading(true)
        axios.get('/gifts')
            .then(({data}) => setList(data))
            .finally(() => setLoading(false))
    }

    return (
        <div className="max-w-[1230px] mx-auto px-4 pb-10 pt-4 md:pt-0 relative">
            <div className="flex flex-col-reverse md:flex-row md:h-screen mb-10 items-center relative">
                <motion.div
                    className="md:h-full shrink-0 md:w-1/2 h-auto"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1}}
                >
                    <img className="w-full h-full object-contain" src="/images/polina.jpg" alt="polina"/>
                </motion.div>
                <motion.div
                    className="flex flex-col md:w-1/2 text-5xl md:text-8xl mb-10 md:mb-0 text-center font-bold text-pink-800 z-10"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1}}
                >
                    <div className="mb-6 md:mb-[100px] flex flex-col">
                        <div className="text-xl">★★★★★★</div>
                        <div className="mb-4 md:mb-10 font-disney"> Привет, друзья!</div>
                        <div className="text-xl">★★★★★★</div>
                    </div>
                    <div className="font-disney">Приглашаю вас на свой День Рождения!</div>
                </motion.div>
            </div>
            <div className="flex flex-col md:h-screen text-2xl md:text-5xl">
                <div className="flex flex-col gap-4 mb-5">
                    <div className="text-neutral-700 text-4xl md:text-6xl font-body text-center">
                        Я буду рада вас видеть
                    </div>
                </div>
                <div className="flex flex-col text-neutral-700 grow items-center mb-10 md:mb-0">
                    <div className="flex flex-col gap-3 mb-4 md:mb-[100px] items-center">
                        <span className="font-body">28 апреля</span>
                        <span className="font-body">c 14:00 до 17:00</span>
                        <span className="font-body">студия Чики-Брики</span>
                        <a
                            className="font-body text-pink-700 hover:text-pink-600 transition underline underline-offset-2"
                            href="https://go.2gis.com/dvnun"
                            target="_blank"
                        >
                            Родниковая, 4 1 этаж
                        </a>
                    </div>
                    <div className="font-body mb-10 text-center text-pink-600 md:w-1/2">На празднике будет фотограф,
                        лучше выбирать одежду таких тонов
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <motion.div className="w-[100px] h-[100px] bg-[#FFD1DC] rounded-xl border-2 border-pink-400"
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.2}}
                                    viewport={{once: true}}
                        />
                        <motion.div className="w-[100px] h-[100px] bg-[#FED6BC] rounded-xl border-2 border-pink-400"
                                    initial={{opacity: 0, scale: 0.8}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.2, delay: 0.2}}
                                    viewport={{once: true}}
                        />
                        <motion.div className="w-[100px] h-[100px] bg-[#FF9BAA] rounded-xl border-2 border-pink-400"
                                    initial={{opacity: 0, scale: 0.8}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.2, delay: 0.4}}
                                    viewport={{once: true}}
                        />
                        <motion.div className="w-[100px] h-[100px] bg-[#FFB28B] rounded-xl border-2 border-pink-400"
                                    initial={{opacity: 0, scale: 0.8}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.2, delay: 0.6}}
                                    viewport={{once: true}}
                        />
                        <motion.div className="w-[100px] h-[100px] bg-[#FFF0F5] rounded-xl border-2 border-pink-400"
                                    initial={{opacity: 0, scale: 0.8}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.2, delay: 0.8}}
                                    viewport={{once: true}}
                        />
                        <motion.div className="w-[100px] h-[100px] bg-[#FAE7B5] rounded-xl border-2 border-pink-400"
                                    initial={{opacity: 0, scale: 0.8}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.2, delay: 1}}
                                    viewport={{once: true}}
                        />
                    </div>
                </div>
            </div>

            <div className="text-neutral-700 text-4xl md:text-5xl font-body text-center mb-4">
                А вот и сам список подарков
            </div>

            {
                loading
                    ? <div className="w-full flex justify-center">
                        <div className="loader"/>
                    </div>
                    : <div className="px-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[40px]">
                        {
                            list.length ? list.map(el =>
                                    <Present key={el.id} item={el} handleAddReserve={handleOpenConfirm} loading={loading}/>
                                )
                                :
                                <h2>Список пуст</h2>
                        }
                    </div>
            }
            {
                notification.message &&
                <div
                    className={`fixed top-5 right-5 md:(top-10 right-10) w-[200px] py-3 text-white px-5 bg-green-300 rounded-md shadow-sm ${notification.error && 'bg-red-400'}`}>
                    {notification.message}
                </div>
            }
            <div className="text-neutral-700 text-xl md:text-3xl font-body text-center mt-4">
                PS: Если вы не нашли подарок который хотели подарить, вы всегда можете выбрать то, что вы захотели
            </div>
            <ConfirmModal isOpen={isConfirmModalOpen} onClose={handleCloseConfirm} callback={handleAddReserve}
                          loading={presentLoading}/>
        </div>

    )
}

export default List