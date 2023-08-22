/**
 * @file components/atoms/Button.tsx
 * @description Reusable `Button` component
 */

/* Third Party Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const Button = (props: any) => {
    const { label, type, isLoading, onClick } = props
    return (
        <button
            type={type} 
            className={isLoading ? 'button-loading' : ''} 
            onClick={onClick}
        >
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin={true} /> : label}
        </button>
    )
}

export default Button
