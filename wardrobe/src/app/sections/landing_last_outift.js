import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faDice, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { getCookie } from '../../modules/storages/cookie'
import AtomsBreakLine from '../../components/atoms/atoms_breakline'
import { convertDatetimeBasedLocal } from '../../modules/helpers/converter'
import { getLocal, storeLocal } from '../../modules/storages/local'
import MoleculesAlertBox from '../../components/molecules/molecules_alert_box'

export default function LandingSectionLastOutfit(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [todayName, setTodayName] = useState("")
    const [items, setItems] = useState(null)
    const [weather, setWeather] = useState(null)
    const tokenKey = getCookie("token_key")
    const [lastHitWeather, setLastHitWeather] = useState(null)
    const now = new Date()

    useEffect(() => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const today = new Date()
        setTodayName(daysOfWeek[today.getDay()])
        fetchLastOutfit()
        fetchWeather()
    }, [])

    const fetchWeather = () => {
        const openWeatherKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY
        const oldTimeHit = getLocal('last_hit-weather')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
        const fetchData = async () => {
            Swal.showLoading()
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherKey}`)
                    const data = await res.json()
                    const data_weather = {
                        temp: data.main.temp,
                        humidity: data.main.humidity,
                        city: data.name,
                        condition: data.weather[0].main
                    }
                    setWeather(data_weather)
                    storeLocal('weather', JSON.stringify(data_weather))
                    storeLocal('last_hit-weather', JSON.stringify(now)) 
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Weather fetch error",
                    })
                }
            })
            Swal.close()
        }

        const defineLastHitWeather = (date) => {
            const pad = (n) => n.toString().padStart(2, '0')
            const formatted = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
            setLastHitWeather(formatted)
        }
    
        if (timeDiffInSec < 600 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('weather'))
            setWeather(oldData)
            const date = new Date(oldTime)
            defineLastHitWeather(date)
        } else {
            fetchData()
            defineLastHitWeather(now)
        }
    }

    const fetchLastOutfit = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit/last`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenKey}`, 
            },
        })
        .then((res) => res.json())
        .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data)
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                setError(error)
            }
        )
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className="mx-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <AtomsBreakLine length={4}/>
                        {
                            items && (
                                <>
                                    <div className="d-inline-block mb-2">
                                        {
                                            items.clothes.map((dt, idx) => {
                                                let maxWidth = ["20%", "25%", "22%", "18%"][idx] || "15%"
                                                return (
                                                    <img key={idx} src={dt.clothes_image ?? "/images/hat_sample.jpg"} style={{ maxWidth, minWidth: "100px" }} className={`img img-fluid img-rounded mb-2 ${idx === items.clothes.length - 2 ? "me-3" : ""}`}/>
                                                )
                                            })
                                        }
                                    </div>
                                    <h5 className="text-secondary mb-0">Set at {convertDatetimeBasedLocal(items.last_used)}</h5>
                                </>
                            )
                        }
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>
                            {items ? <>Last <span className="text-main">Outfit</span></> : <span className="text-secondary">- No Outfit History Found -</span>}
                        </h1>
                        <hr/>
                        {
                            items ? (
                                <h2 className="mb-0">See more outfit history? <a className="btn btn-primary fw-bold"><FontAwesomeIcon icon={faArrowRight}/> History</a></h2>
                            ) : (
                                <h2 className="mb-0">Use your outfit right now, or create a new one? <a className="btn btn-primary fw-bold"><FontAwesomeIcon icon={faArrowRight}/> Add New Outfit</a></h2>
                            )
                        }
                        <AtomsBreakLine length={4}/>
                    </div>
                    <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
                        <AtomsBreakLine length={4}/>
                        <div className="container-generator" style={{height:"40vh", textAlign:"start"}}>
                            <div className="position-absolute text-end" style={{top:"var(--spaceXLG)", right:"var(--spaceXLG)"}}>
                                {
                                    weather && (
                                        <h5>{Math.round(weather.temp)}°C | {weather.condition} | {weather.humidity}% Humidity | <FontAwesomeIcon icon={faLocationDot}/> {weather.city}</h5>
                                    )
                                }
                                <h4 className='mb-0'>Today is {todayName}</h4>
                                <p className='mb-0 fst-italic' style={{fontSize:"var(--textXMD)"}}>Last Updated {lastHitWeather ?? '-'}</p>
                            </div>
                            <h2 className="mb-2" style={{fontWeight:"800"}}>Do you <span className="text-main">want to hangout</span>?</h2>
                            <p>We can generate your today's outfit based on your wardrobe, cleaning status, schedule, and today's weather.</p>
                            <a className="btn btn-primary fw-bold" href="/clothes/generated"><FontAwesomeIcon icon={faDice}/> Set My Outfit Now!</a>
                        </div>
                        <AtomsBreakLine length={4}/>
                    </div>
                </div>
            </div>
        )
    }
}
