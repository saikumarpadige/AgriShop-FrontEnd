export const initialState = null

export const reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload
    }
    if (action.type === 'UPDATE_CART') {
        return {
            ...state,
            cartItems: action.payload
        }
    }

    return state
}