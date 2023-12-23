import { useTranslation } from "react-i18next";
import SocialButton from "./FormFields/SocialButton";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function SocialLogin() {
  const { t } = useTranslation("auth");

  return (
    <div className="flex flex-col items-center">
      <p className="py-3 text-base">{t("social")}</p>
      <div className="flex gap-4">
        <SocialButton icon={faFacebookF} onClick={() => {}} />
        <SocialButton icon={faGoogle} onClick={() => {}} />
      </div>
    </div>
  );
}
