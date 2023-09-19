import Image from "next/image";
import { Button } from "./ui/button";

interface ButtonAuthProps {
  provider: String;
  icon: String;
}

const ButtonAuth = ({ provider, icon }: ButtonAuthProps) => {
  return (
    <Button
      className="w-full text-[17px] font-medium capitalize"
      variant={"outline"}
      size={"lg"}
    >
      <Image
        src={`/assets/icons/${icon}`}
        alt={`${provider} icon`}
        width={28}
        height={28}
        className="mr-1"
      />
      Sign in with {provider}
    </Button>
  );
};

export default ButtonAuth;
