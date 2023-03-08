const { LOAD_DATA } = require("../../types/TYPES")

const loadData = () => {

    return async (dispatch, gerState) => {
        dispatch({ type: LOAD_DATA.LOAD_STARTING })
        
        const getjson = await fetch('http://localhost:5000/products')
        const getres = await getjson.json()
        if (getres.length) {
            console.log(getres)

            dispatch({ type: LOAD_DATA.LOAD_FINISH, payload: getres })
        }
    }
}
export default loadData