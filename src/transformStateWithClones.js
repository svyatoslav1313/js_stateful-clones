'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let currentState = { ...state };

  for (const action of actions) {
    const newState = { ...currentState };

    if (action.type === 'addProperties') {
      for (const keys in action.extraData) {
        newState[keys] = action.extraData[keys];
      }
    }

    if (action.type === 'removeProperties') {
      for (const keys of action.keysToRemove) {
        delete newState[keys];
      }
    }

    if (action.type === 'clear') {
      for (const keys in currentState) {
        delete newState[keys];
      }
    }
    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
