const loginForm = document.querySelector('#loginForm')
const logoutButton = document.querySelector('#logout')
const messageForm = document.querySelector('#messageForm')
const messagesBlock = document.querySelector('#messages')

const getData = async () => {
  const token = localStorage.getItem('token')
  if(!token) {
    messageForm.classList.add('hidden')
    messagesBlock.innerHTML = 'You need to login first to see the messages (Token not stored)'
    return;
  } else {
    loginForm.classList.add('hidden')
    logoutButton.classList.remove('hidden')
    messageForm.classList.remove('hidden')
  }

  const result = await fetch('/api/v1/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  if(!result.ok) {
    messageForm.classList.add('hidden')
    messagesBlock.innerHTML = 'Token probably expired or not valid, You need to login first to see the messages'
    return;
  }

  const { user, messages } = await result.json()
  document.querySelector('#username').innerText = user.username
  messagesBlock.innerHTML = messages.map(message => `<p>${message.username}: ${message.message}</p>`).join('')
}

const sendMessage = async () => {
  const message = messageForm.querySelector('input').value
  const token = localStorage.getItem('token')
  const result = await fetch('/api/v1/dashboard', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  if(!result.ok) {
    if(result.status === 401) {
      messageForm.querySelector('.error').innerText = 'Status 401: You are not authorized to send message! (page refresh in 2 seconds)'
      setTimeout(() => {
        window.location.reload()
      }, 2000)
      return;
    } else if(result.status === 400) {
      return messageForm.querySelector('.error').innerText = 'Status 400: Please enter a message!'
    }
  }
  const messageObject = await result.json()
  messagesBlock.innerHTML += `<p>${messageObject.username}: ${message}</p>`
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const username = loginForm.querySelector('input').value
  const result = await fetch('/api/v1/login', {
    method: 'POST',
    body: JSON.stringify({ "username": username }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if(!result.ok) {
    if(result.status === 401) {
      return loginForm.querySelector('.error').innerText = 'Status 401: You are not authorized to see the messages!'
    } else if(result.status === 400) {
      return loginForm.querySelector('.error').innerText = 'Status 400: Please enter a username!'
    }
  }
  const { token } = await result.json()
  localStorage.setItem('token', token)
  window.location.reload()
})

logoutButton.addEventListener('click', async (e) => {
  e.preventDefault()
  localStorage.removeItem('token')
  window.location.reload()
})

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  await sendMessage()
})

getData()