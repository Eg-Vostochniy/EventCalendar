import { RefObject, useEffect } from "react"

export const useClickOutside = (ref: RefObject<HTMLDivElement>, setIsModal: (b: boolean) => void) => {
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