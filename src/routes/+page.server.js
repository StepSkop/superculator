import { PUBLIC_API_NINJAS_KEY } from '$env/static/public'
// @ts-ignore
export const load = async ({fetch}) => {
    const res = await fetch('https://api.api-ninjas.com/v1/bucketlist', {
        headers: {'X-Api-Key': PUBLIC_API_NINJAS_KEY}
    })
    const data = await res.json()

    return {
        bucketlist: data.item
    }
}