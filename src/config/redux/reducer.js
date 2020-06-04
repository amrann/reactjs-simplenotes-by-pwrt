const inisialState = {
  popup: 'false',
  isLogin: false,
  isLoading: false,
  // nama: 'Meran'
  nama: {},
  iniNotes: {}
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
    if(action.type === 'SET_NOTES'){
      return {
        ...state,  // mengopy nilai state
        iniNotes: action.value
      }
    }
    return state;
  }

  export default reduser;