const step = (state = 0, action) => {
    switch (action.type) {
      case "next":
        return state + 1      
      case "prev":
        return state - 1
      default:
        return state;
    }
  }
  
  export default step;