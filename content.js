let name = document.getElementById('name')
let age = document.getElementById('age')
let gender = document.getElementById('gender')
let avt = document.getElementById('avatar')
let logoutBtn = document.getElementById('logout')
let nextBtn = document.getElementById('next')
let likeBtn = document.getElementById('like')
let nopeBtn = document.getElementById('nope')
let preBtn = document.getElementById('previous')
let img = document.getElementById('img')
let id = sessionStorage.getItem('id')
let objName = document.getElementById('objName')

logoutBtn.addEventListener('click', function(){
    sessionStorage.clear()
    window.location.href = 'sign-in.html'
})

sessionStorage.setItem('objectID',1)

async function getData(){
    const api = await fetch('https://5ecfb1de16017c00165e2e6b.mockapi.io/user')
    const data = await api.json()
    console.log(data)
    return data
}

async function showProfile() {
    let data = await getData()
    name.innerText += data[id-1]['name']
    age.innerText += data[id-1]['Age']
    if (data[id-1]['isMale']){
        gender.innerText += 'Male'
    }
    else {
        gender.innerText += 'Female'
    }
    avt.src = data[id-1]['img1']
}

showProfile()

async function render(i){
    let data = await getData()
    let index = 1
    sessionStorage.setItem('objectID',i+1)
    img.src = data[i][`img${index}`]
    objName.innerText += data[i]['name']
    nextBtn.addEventListener('click', function(){
        if(index<3){
            index++
            img.src = data[i][`img${index}`]    
        }
        else{
            img.src = data[i]['img3']
        }
    }) 
    preBtn.addEventListener('click', function(){
        if (index>1){
            index--
            img.src = data[i][`img${index}`]
        }
        else {
            img.src = data[i]['img1']
        }
    })
}
render(sessionStorage.getItem('objectID')-1)
async function dislike(){
    const data = await getData()
        nopeBtn.addEventListener('click', function(){
            let index = sessionStorage.getItem('objectID')
            objName.innerText = ''
            img.src = ''
            if (index<data.length+1){
                index++
                sessionStorage.setItem('objectID',index)
                render(index-1)
            }
            else {
                render(data.length-1)
            }
        })
    }

dislike()

async function like(){
    const data = await getData()
    let matchedID = []
    likeBtn.addEventListener('click', function(){
        matchedID.push(sessionStorage.getItem('objectID'))
        fetch(`https://5ecfb1de16017c00165e2e6b.mockapi.io/user/${sessionStorage.getItem('id')}`,{
        method: 'PUT',
        body: JSON.stringify({
            'matchedID' : matchedID
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        let objID = sessionStorage.getItem('objectID')
        objID++
        objName.innerText = ''
        img.src = ''
        sessionStorage.setItem('objectID',objID)
        render(objID-1)
        let check = data[sessionStorage.getItem('objectID')-1]['matchedID'].find(function(x){
            return x == sessionStorage.getItem('id')
        })
        if (check != undefined){
            alert (`Congrats! You matched with ${data[sessionStorage.getItem('objectID')-2]['name']}`)
        }
    })
    
}

like()