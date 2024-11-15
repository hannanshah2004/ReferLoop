import Image from "next/image";

// Define ButtonProps type to include onClick
type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  onClick?: () => void;  // Add onClick as an optional prop
}

const Button = ({ type, title, icon, variant, full, onClick }: ButtonProps) => {
  return (
    <button
      className={`flexCenter gap-3 rounded-full border ${variant} ${full ? 'w-full' : 'w-auto'}`}  // Apply default width if 'full' is not passed
      type={type}
      onClick={onClick}  // Attach the onClick handler to the button element
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <span className="bold-16 whitespace-nowrap cursor-pointer">{title}</span> {/* Changed <label> to <span> for better accessibility */}
    </button>
  )
}

export default Button;
