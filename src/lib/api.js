
async function login(email, password) {
  try {
    const response = await window.fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })

    const payload = await response.json()

   // this.setState({ authorization: payload.data.token })
    return payload
    window.sessionStorage.setItem('authorization', payload.data.token)
  } catch (error) {
    window.alert('Ocurrió un error al iniciar sesión')
  
    return {
      data : {
        token: ''
      }
    }
  }
}




async function Validatedtoken(token) {
  try {
    const token = window.sessionStorage.getItem('authorization')

    if (token) {
      const response = await window.fetch('http://localhost:8080/users/validate-session', {
        headers: { authorization: token }
      })

      const payload = await response.json()

      //this.setState({ authorization: payload.data.token })

      window.sessionStorage.setItem('authorization', payload.data.token)
      return payload
    } else {
      return {
        data : {
          token: ''
        }
      }
    }
  } catch (error) {
    return {
      data : {
        token: ''
      }
    }
  }
  
}

async function getPost () {
  try {
    const token = window.sessionStorage.getItem('authorization')


  const response = await window.fetch('http://localhost:8080/posts', {
    headers: { authorization: token }
  })

  const payload = await response.json()

  payload.data.posts = payload.data.posts.map((badPost) => ({
    image: badPost.imageUrl,
    title: badPost.title,
    text: badPost.description,
    readTime: badPost.readingTime,
    
  }))
  return payload
  } catch (error) {
    return {
      data : {
        posts: []
      }
    }
  }
  
}




async function newPost(post) {
  try {
    
    const token = window.sessionStorage.getItem('authorization')

    const response = await window.fetch('http://localhost:8080/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify({
      title: post.title,
      author: post.author,
      imageUrl: post.image,
      readingTime: post.readTime,
      description: post.description
    })
  })

  const payload = await response.json()

  window.alert(payload.data.posts._id)


  } catch (error) {
    return {
      data: {
        posts: {
          title:'',
          description:''
        }
      }
    }
  }
}


const api = {
  login,
  Validatedtoken,
  getPost,
  newPost
}

export default api

