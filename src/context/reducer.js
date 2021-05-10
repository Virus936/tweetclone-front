const authToken = JSON.parse(localStorage.getItem('authToken'))

export const initialState = authToken

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('authToken', JSON.stringify(action.item))
      return action.item
    case 'DISCONECT':
      localStorage.removeItem('authToken')
      return {}
    case 'REFRESH':
      state.access = action.item
      localStorage.setItem('authToken',JSON.stringify(state))
      return {...state}
    default:
      return state 
  }
}


