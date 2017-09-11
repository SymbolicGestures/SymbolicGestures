export default function(state=null, action) {
  // Check what the action is
  switch(action.type) {
    case 'OPEN_SETTINGS':
      // return the function inside of action.
      return action.payload;
      break;
  }

  // if no action passed (on app start - before any click to open any stage settings)
  // return the state, this will pass null if no settings.
  return state;
}
