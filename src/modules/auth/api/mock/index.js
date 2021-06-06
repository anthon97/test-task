export const db_users = localStorage.getItem('db_users')
  ? JSON.parse(localStorage.getItem('db_users'))
  : [
      {
        id: 1,
        name: 'Иван',
        email: 'tester@tester.ru',
        password: '111111',
        token: 'secret',
      },
    ]

const findUser = (email) =>
  db_users.find((user) => user.email === email) || null

const addUser = (userData) => {
  const index = db_users.length + 1
  const user = {
    id: index,
    ...userData,
    token: `secret_${index}`,
  }

  db_users.push(user)

  localStorage.setItem('db_users', JSON.stringify(db_users))
}

export const loginService = ({ email, password }) => {
  const User = findUser(email)

  console.log('loginService -> User', User)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!User) {
        reject({
          response: {
            message: 'Такого пользователя не существует!',
          },
        })
        return
      } else if (User && User.password !== password) {
        reject({
          response: {
            message: 'Неправильный пароль',
          },
        })
        return
      } else {
        resolve({
          token: User.token,
          user: {
            id: User.id,
            name: User.name,
            email: User.email,
          },
        })
      }
    }, 3000)
  })
}

export const signupService = ({
  name,
  email,
  password,
  password_confirmation,
}) => {
  const User = findUser(email)

  console.log('signupService -> User', User)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (User) {
        reject({
          response: {
            message: 'Пользователь с таким email уже существует!',
          },
        })
        return
      } else if (password !== password_confirmation) {
        reject({
          response: {
            message: 'Пароли не совпадают',
          },
        })
        return
      } else {
        addUser({
          name,
          email,
          password,
        })

        resolve({
          success: true,
        })
      }
    }, 5000)
  })
}

export const logoutService = ({ token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token !== 'secret') {
        reject({
          response: {
            message: 'Неверный токен!',
          },
        })
        return
      } else {
        resolve({
          success: true,
        })
      }
    }, 1000)
  })
}
