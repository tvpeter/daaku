interface Props {
  children: string
  onClick: () => void
  color?: "dodger-blue" | "mauvelous" | "orange-peel" | "dark-pastel-green" | "red" | "true-v"
}

const Button = ({ children, onClick, color = "dodger-blue" }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={'btn-fill-md text-light bg-'+color}
    >
      {children}
    </button>
  )
}

export default Button
