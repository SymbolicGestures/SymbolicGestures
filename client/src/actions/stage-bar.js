export const selectStage = (stage) => {
  console.log('You clicked on ', stage.name);

  return {
    type: "STAGE_SELECTED",
    payload: stage
  }
}
