let content = document.getElementById('content')
let objID = sessionStorage.getItem('objectID')
let id = sessionStorage.getItem('id')

async function getData(){
    const api = await fetch('https://5ecfb1de16017c00165e2e6b.mockapi.io/user')
    const data = await api.json()
    console.log(data)
    return data
}

async function showInfo(){
    const data = await getData()
    let matchedID = data[id-1]['matchedID']
    for (let i=0; i<matchedID.length; i++){
        let objMatchedID = data[matchedID[i]-1]['matchedID']
        let check = objMatchedID.find(function(x){
            return x == id
        })
        if (check != undefined){
            content.innerHTML += `<p>Name: ${data[matchedID[i]-1]['name']}</p><br>
            <p>Age: ${data[matchedID[i]-1]['Age']}</p><br>
            <p>Facebook: ${data[matchedID[i]-1]['facebook']}</p><br>
            <p>Instagram: ${data[matchedID[i]-1]['instagram']}</p><br>
            <p>=======================================================</p>                       
            `
        }
    }
}

showInfo()