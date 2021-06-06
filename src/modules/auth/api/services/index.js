// import { $auth } from '@/modules/auth/api'
import {
  loginService,
  signupService,
  logoutService,
} from '@/modules/auth/api/mock'

export const login = async (payload) => {
  try {
    const { token, user } = await loginService(payload)

    return {
      token,
      user,
    }
  } catch (err) {
    throw err.response.message
  }
}

export const signup = async (payload) => {
  try {
    const { success } = await signupService(payload)

    return {
      success,
    }
  } catch (err) {
    throw err.response.message
  }
}

export const logout = async (payload) => {
  try {
    const { success } = await logoutService(payload)

    return {
      success,
    }
  } catch (err) {
    throw err.response.message
  }
}
