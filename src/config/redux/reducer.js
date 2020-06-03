const inisialState = {
  popup: 'false',
  isLogin: false,
  isLoading: false,
  // nama: 'Meran'
  nama: {}
}
  
  const reduser = (state=inisialState, action) => {
    if(action.type === 'CHANGE_POPUP'){
      return {
        ...state,  // mengopy nilai state
        popup: action.value
      }
    }
    if(action.type === 'CHANGE_ISLOGIN'){
      return {
        ...state,  // mengopy nilai state
        isLogin: action.value
      }
    }
    if(action.type === 'CHANGE_NAMA'){
      return {
        ...state,  // mengopy nilai state
        nama: action.value
      }
    }
    if(action.type === 'CHANGE_LOADING'){
      return {
        ...state,  // mengopy nilai state
        isLoading: action.value
      }
    }
    return state;
  }

  export default reduser;