const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

const imgweather = document.createElement("img")
imgweather.setAttribute("class", "weather-icon")


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value.replace(/;/g, "")

    messageOne.textContent = ''
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = data.location
                let arrweather = data.weather.split(',')
                messageTwo.textContent = arrweather[0]
                switch (arrweather[0]) {
                    case ('Sunny'):
                        imgweather.src = "/img/icon-sunny.png"
                        break
                    case ('Cloudy'):
                        imgweather.src = "/img/icon-cloudy.png"
                        break
                    case ('Overcast'):
                        imgweather.src = "/img/icon-cloudy.png"
                        break
                    case ('Patchy rain possible'):
                        imgweather.src = "/img/icon-cloudy.png"
                        break
                    case ('Partly cloudy'):
                        imgweather.src = "/img/icon-partly-cloudy.png"
                        break
                    case ('Haze'):
                        imgweather.src = "/img/icon-haze-foggy.png"
                        break
                    case ('Clear'):
                        imgweather.src = "/img/icon-moon.png"
                        break
                    case ('Rain'):
                        imgweather.src = "/img/icon-raining.png"
                        break
                    case ('Light Rain'):
                        imgweather.src = "/img/icon-light-rain.png"
                        break
                    case ('Light Drizzle'):
                        imgweather.src = "/img/icon-light-rain.png"
                }
                messageTwo.appendChild(imgweather)

                messageThree.textContent = arrweather[1] + ' F'
                messageFour.textContent = 'Precipitation: ' + arrweather[2] + '%'
                messageFive.textContent = 'Wind speed: ' + arrweather[3] + ' Kmph'
            }

        })
    })
})