let uname = document.getElementById('uname')
let password = document.getElementById('pw')
let loginBtn = document.getElementById('login')
let signupBtn = document.getElementById('signup')
async function getData(){
    const api = await fetch('https://5ecfb1de16017c00165e2e6b.mockapi.io/user')
    const data = await api.json()
    let output = []
    console.log(data)
    return data
}

async function render(){
    const data = await getData()
    loginBtn.addEventListener('click', function(e){
        e.preventDefault()
        console.log(uname.value,password.value)
        let findUser = data.find(function(x){
            return ((x['username'] == uname.value) && (x['password'] == password.value))
        })
        console.log(findUser)
        let findIndex = data.findIndex(function(x){
            return ((x['username'] == uname.value) && (x['password'] == password.value))
        })
        if (findUser != undefined){
            window.location.href = 'content.html'
            sessionStorage.setItem('uname', uname.value)
            sessionStorage.setItem('password', password.value)
            sessionStorage.setItem('id', data[findIndex]['id'])
        }
        else {
            alert ('Wrong input')
        }
    })
}

render()

signupBtn.addEventListener('click', function(e){
    e.preventDefault()
    window.location.href = 'sign-up.html'
})