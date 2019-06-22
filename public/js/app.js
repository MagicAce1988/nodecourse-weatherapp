// const iplocation = require("iplocation").default;

// let CountryCode =''

console.log('Javascript is loaded')


// window.onload = function () {
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
//     document.getElementsByTagName("head")[0].appendChild(script);
// };
// function DisplayIP(response) {
    
//     // iplocation(response.ip, [], (error, res) => {
//     //     CountryCode=res.countryCode
//     // })
//     document.getElementById("ipaddress").innerHTML = "Your IP Address is " + response.ip;
// }

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
            messageThree.textContent=data.summary + '. Pe moment sunt ' + data.degrees + ' grade celsius. Sansa de a ploua este de ' + data.chanceOfRain + ' %.'
        }
    })
})

})