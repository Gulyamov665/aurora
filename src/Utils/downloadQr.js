import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

export const DownloadQr = async (token) => {

    try {
        const response = await axios.get(
            `${baseURL}admins/download/qr`,
            {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            },

        )
        const url = window.URL.createObjectURL(new Blob([response.data]))

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `image.jpg`)
        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
    } catch (error) {
        console.error(error)
    }
}
