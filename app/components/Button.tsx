'use client'

import clsx from "clsx"

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
  secondary?: boolean
  danger?: boolean
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    fullWidth,
    secondary,
    danger,
    disabled,
    type = 'button'
}) => {
  return (
    <button
      onClick={ onClick }
      type={ type }
      disabled={ disabled }
      className={clsx(`
        flex
        justify-center
        rounded-md
        px-3
        py-2.5
        text-sm
        text-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
      `,
      disabled && "opacity-50 cursor-default",
      fullWidth && "w-full",
      secondary ? "text-gray-900" : "text-white",
      danger && `
        bg-rose-500
        hover:bg-rose-700
        focus-visible:outline-rose-600
      `,
      !secondary && !danger && `
        text-gray-800
        bg-sky-500
        hover:bg-sky-600
        focus-visible:outline-sky-600
      `)}
    >
        { children }
    </button>
  )
}

export default Button
