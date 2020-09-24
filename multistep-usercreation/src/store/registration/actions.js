export const addUserEssentialData = (name, lastName, email) => {
    return {
      type: "updateUserInfo",
      payload: {
        name,
        lastName,
        email
      }
    }
  }

export const addUserAddress = (country, city, street, houseNumber) => {
  return {
    type: "updateUserInfo",
    payload: {
      country,
      city,
      street,
      houseNumber
    }
  }
}

export const chooseImg = (img) => {
  return {
    type: "updateUserInfo",
    payload: {
      img
    }
  }
}

export const addPassword = (password, repeatPassword) => {
  return {
    type: "updateUserInfo",
    payload: {
      password,
      repeatPassword
    }
  }
}