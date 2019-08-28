console.log(`Javascript`)

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value
    //Fetch weather
    messageOne.textContent = 'Loading'
    fetch(`/weather?address=${location}`).then((response)=> {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            }
        })
    })
})

