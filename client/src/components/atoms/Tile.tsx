/**
 * @file components/atoms/Tile.tsx
 * @description Reusable `Tile` component
 */

/* Third Party Dependencies */
import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Tile = (props: any) => {
    const { id, label, onDelete } = props

    const iFrame = useRef()

    const resizeIFrame = () => {
        let height = iFrame.current.contentWindow.document.body.scrollHeight
        if (height > 400) {
            height = 400
        }
        iFrame.current.style.height = height + 'px'
    }

    useEffect(() => {
        setInterval(() => {
            resizeIFrame()
        }, 100)
    }, [iFrame])

    return (
        <div className='tile'>
            <div className='header'>
                {label}
                <FontAwesomeIcon className='icon' icon={faTrash} onClick={() => onDelete(id)}/>
            </div>
            <iframe
                ref={iFrame}
                className='tile-iframe' 
                srcDoc={props.javascript}
                sandbox='allow-scripts allow-same-origin'
                onLoad={resizeIFrame}
            >
            </iframe>
        </div>
    )
}

export default Tile