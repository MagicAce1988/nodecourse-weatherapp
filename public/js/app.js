console.log('Javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value

    messageOne.textContent=''
    messageTwo.textContent='Loading...'
    messageThree.textContent=''

    fetch('http://localhost:3000/weather?adress='+ location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
            messageThree.textContent=''

        } else {
            messageOne.textContent=''
            messageTwo.textContent=data.location
            messageThree.textContent=data.summary + '. Pe moment sunt ' + data.degrees + ' grade celsius. Sansa de a ploua este de ' + data.chanceOfRain + ' %.'
        }
    })
})

})