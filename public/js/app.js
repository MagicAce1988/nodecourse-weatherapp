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

    fetch('/weather?adress='+ location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
            messageThree.textContent=''

        } else {
            console.log(data)
            messageOne.textContent=''
            messageTwo.textContent=data.location
            messageThree.textContent=data.summary + '. ' + data.text1 + ' ' + data.degrees + ' ' + data.text2 +'. ' + data.text3 + ' ' + data.chanceOfRain + ' %.'
        }
    })
})

})