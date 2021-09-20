import { allActions } from './../store/allActions';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useAppDispatch = () => {
    const dispatch = useDispatch()
    
    return bindActionCreators(allActions, dispatch)
}