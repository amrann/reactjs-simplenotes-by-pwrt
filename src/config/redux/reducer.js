const inisialState = {
    popup: 'false',
    isLogin: false
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
    return state;
  }

  export default reduser;