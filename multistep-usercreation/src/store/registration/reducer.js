const stepReducer = (state = {}, action) => {

  switch (action.type) {
    case "updateUserInfo":
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }

}

export default stepReducer;