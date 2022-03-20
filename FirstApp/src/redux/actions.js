export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_UESR_AGE';
export const INCREASE_AGE = 'INCREASE_AGE';
export const GET_CITIES = 'GET_CITIES';

const API_URL = 'https://mocki.io/v1/aac8b81a-139c-4235-82e6-0dbadf33f2b7';

export const getCities = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const cities = await result.json();

      if (cities) {
        dispatch({
          type: 'GET_CITIES',
          payload: cities,
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (err) {
    console.error(err);
  }
};

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setAge = age => dispatch => {
  dispatch({
    type: SET_USER_AGE,
    payload: age,
  });
};

export const increaseAge = age => dispatch => {
  dispatch({
    type: INCREASE_AGE,
    payload: age,
  });
};
