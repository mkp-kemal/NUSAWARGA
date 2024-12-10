const BaseURLAPI = (url: string) => {
    url = url.replace(/^[/]/g, '');
    const baseURL = 'https://nusaapi.vercel.app/';
    return baseURL + url;
}

export default BaseURLAPI;