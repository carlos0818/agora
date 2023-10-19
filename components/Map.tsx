import { FC, useEffect, useState } from 'react'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet'

import { overpassApi } from '@/api'

import countriesList from '@/db/countries'

export function ChangeView({ coords }: any) {
    const map = useMap()
    map.setView(coords)
    return null
}

interface Props {
    country: string
    setFlag: Function
}

const Map: FC<Props> = ({ country = '', setFlag }) => {
    const [geoData, setGeoData] = useState({ lat: 10, lng: 10 })
    const [zoom, setZoom] = useState(1)
    const center = [geoData.lat, geoData.lng]
    const [polygon, setPolygon] = useState<any>([])

    const { countries } = countriesList
    
    useEffect(() => {
        getCountryFlag()
    }, [country])

    const getCountryFlag = async() => {
        try {
            if (country !== '') {
                const query = `[out:json][timeout:25];relation["ISO3166-1:alpha3"="${ country }"]["admin_level" = 2];out tags;`
                const { data: respFlag } = await overpassApi.get(`/interpreter?data=${ query }`)
                if (country === 'AFG')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1695850857/SYSPICS/FLAGS/Afghanistan.jpg')
                else if (country === 'GBR')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736912/SYSPICS/FLAGS/Uk_hayzap.jpg')
                else if (country === 'PRI')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736911/SYSPICS/FLAGS/Puerto_x79jbg.jpg')
                else if (country === 'MUS')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736911/SYSPICS/FLAGS/Mauritius_mky5jr.jpg')
                else if (country === 'STP')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736911/SYSPICS/FLAGS/Saotome_avwnpq.jpg')
                else if (country === 'SDN')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736911/SYSPICS/FLAGS/Sudan_whgtwd.jpg')
                else if (country === 'HKG')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736911/SYSPICS/FLAGS/Hongkong_ohmpqo.jpg')
                else if (country === 'ABW')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736911/SYSPICS/FLAGS/Aruba_dgaors.jpg')
                else if (country === 'NCL')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736911/SYSPICS/FLAGS/Caledonia_djwys0.jpg')
                else if (country === 'MAC')
                    setFlag('https://res.cloudinary.com/dp779tmk6/image/upload/v1697736911/SYSPICS/FLAGS/Macao_ph4koq.jpg')
                else
                    setFlag(respFlag.elements[0].tags.flag)

                // fetch('https://www.7catsartstudio.com/archivos_envio/Agora/Map/custom.geo.json')
                fetch('/custom.geo.json')
                .then(response => response.json())
                .then(data => {
                    let noshift = 0
                    let Border = data
                    for (let i = 0; i < data.features.length; i++) {
                        if (data.features[i].properties.adm0_iso !== country) {
                            delete Border.features[i]
                        } else {
                            noshift = i
                        }
                    }
                    Border.features.splice(0, 0, Border.features.splice(noshift, 1)[0])
                    Border.features.length = 1
                    if(Border.features[0] !== undefined) {
                        const latLng = countries.filter(latlng => latlng.alpha3 === country)
                        setGeoData({ lat: latLng[0].latitude, lng: latLng[0].longitude })
                        setPolygon(Border)
                        setZoom(latLng[0].zoom)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    return (
        <MapContainer
            key={ polygon.hasOwnProperty('type') ? `map-${ polygon.features[0]?.properties?.adm0_iso }` : '' }
            center={ geoData as any }
            zoom={ zoom }
            maxZoom={ 18 }
            style={{ height: '100%' }}
            bounceAtZoomLimits
            boxZoom
            attributionControl={ false }
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* {geoData.lat && geoData.lng && (
                <Marker position={[geoData.lat, geoData.lng]} />
            )} */}
            <ChangeView coords={ center } />
            <GeoJSON
                key={ polygon.hasOwnProperty('type') ? polygon.features[0]?.properties?.adm0_iso : '' }
                data={ polygon }
            />
        </MapContainer>
    )
}

export default Map
