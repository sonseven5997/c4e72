async function getData(){
    const api = await fetch('https://5ecfb1de16017c00165e2e6b.mockapi.io/user')
    const data = api.json()
    console.log(data)
    return data
}

async function updateData(){
    const data = await getData()
    for (let i=0; i<47; i++){
        await fetch(`https://5ecfb1de16017c00165e2e6b.mockapi.io/user/${data[i].id}`,{
            method: 'PUT',
            body: JSON.stringify({
                'facebook': `fb.com/${data[i].username}`,
                'instagram': `instagram.com/${data[i].username}`
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
}

updateData()