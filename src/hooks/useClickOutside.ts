import { RefObject, useEffect } from "react"
import { useAppDispatch } from "./useAppDispatch"

export const useClickOutside = (ref: RefObject<HTMLDivElement>) => {
    const {setIsModal} = useAppDispatch()

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsModal(false)
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        //eslint-disable-next-line
    }, [ref])
}