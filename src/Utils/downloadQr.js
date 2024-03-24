import axios from 'axios'
import { useGetQrCodeQuery } from '../store/admin/qrCode'

export const DownloadQr = async (data) => {
    console.log(data)
    // const { data } = useGetQrCodeQuery()
    // console.log(data)
    try {
        // const response = data

        const url = window.URL.createObjectURL(new Blob([data]))

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download')
        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
    } catch (error) {
        console.error(error)
    }
}
