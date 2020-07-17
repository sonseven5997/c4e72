let id = document.getElementById('uname')
let password = document.getElementById('pw')
let confirmPassword = document.getElementById('confirmpw')
let submitBtn = document.getElementById('submit')
let name = document.getElementById('name')
let age = document.getElementById('age')
let img1 = document.getElementById('img1')
let img2 = document.getElementById('img2')
let img3 = document.getElementById('img3')
let gender = document.getElementById('gender')

let isMale
if (gender.value == 'Male'){
    isMale = true
}
else {
    isMale = false
}

async function postData(url,data){
    await fetch(url,
    {method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
}

submitBtn.addEventListener('click',async function(e){
    e.preventDefault()
    if (confirmPassword.value == password.value){
        let data = {
            'username' : id.value,
            'password': password.value,
            'name' : name.value,
            'Age' :  age.value,
            'isMale': isMale,
            'img1' : img1.value,
            'img2' : img2.value,
            'img3' : img3.value,
        }
        await postData('https://5ecfb1de16017c00165e2e6b.mockapi.io/user',data)
        window.location.href = 'sign-in.html'
    }
    else {
        alert('Wrong input, try again')
    }
    
})