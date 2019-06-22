// const iplocation = require("iplocation").default;

// let CountryCode =''


console.log('Javascript is loaded')

function user_location() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const ip=JSON.parse(this.responseText)
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

    fetch('/weather?adress='+ location + '&ipadress=' + ip.ip).then((response)=>{
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
        
      }
    };
    xhttp.open("GET", "//api.ipify.org?format=json", true);
    xhttp.send();
  }

  user_location()

// const weatherForm = document.querySelector('form')
// const search = document.querySelector('input')
// const messageOne = document.querySelector('#message-1')
// const messageTwo = document.querySelector('#message-2')
// const messageThree = document.querySelector('#message-3')

// weatherForm.addEventListener('submit',(e)=>{
//     e.preventDefault()

//     const location=search.value

//     messageOne.textContent=''
//     messageTwo.textContent='Loading...'
//     messageThree.textContent=''

//     fetch('/weather?adress='+ location).then((response)=>{
//     response.json().then((data)=>{
//         if (data.error){
//             messageOne.textContent=data.error
//             messageTwo.textContent=''
//             messageThree.textContent=''

//         } else {
//             console.log(data)
//             messageOne.textContent=''
//             messageTwo.textContent=data.location
//             messageThree.textContent=data.summary + '. Pe moment sunt ' + data.degrees + ' grade celsius. Sansa de a ploua este de ' + data.chanceOfRain + ' %.'
//         }
//     })
// })

// })