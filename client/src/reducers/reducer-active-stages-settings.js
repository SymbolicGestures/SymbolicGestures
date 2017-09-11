export default function(state=null, action) {
  const getAction = {
    'OPEN_SETTINGS': () => {return action.payload},
  }
  // if no action passed (on app start - before any click to open any stage settings)
  // return the state, this will pass null if no settings.
  return getAction[action.type] || state;
}
