import SocialButton from "./FormFields/SocialButton";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function SocialLogin() {

  return (
    <div className="flex flex-col items-center">
      <p className="py-3 text-base">Or Sign In With Social Accounts</p>
      <div className="flex gap-4">
        <SocialButton icon={faFacebookF} onClick={() => {}} />
        <SocialButton icon={faGoogle} onClick={() => {}} />
      </div>
    </div>
  );
}
