// sebuah function dalam function
export const aksiUserNama = () => (dispatch) => {
    setTimeout(() => {
        return dispatch ({type: 'CHANGE_NAMA', value: 'Power Ranger'})
    }, 2000)
}