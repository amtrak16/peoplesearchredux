/*
 * action types
 */
export const SELECTPERSON = 'SELECTPERSON';
export const RETURNTOSEARCH = 'RETURNTOSEARCH';
/*
 * action creators
 */
export function selectPerson(payload) {
    return { type: SELECTPERSON, payload: payload }
}
export function returnToSearch(payload) {
    return { type: RETURNTOSEARCH, payload: payload }
}