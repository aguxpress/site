import { cn } from "@utils/tailwind.utils";

export const getReCaptchaToken = () => {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      console.log(import.meta.env);
      const sitekey = import.meta.env.VITE_RECAPTCHA_SITEKEY;

      if (!sitekey) {
        resolve(null);
        return;
      }

      const token = await grecaptcha.execute(sitekey, { action: "contact" });
      resolve(token);
    });
  });
};

const ReCaptcha = ({ className }: { className?: string }) => (
  <div className={cn(["flex items-center gap-2", className])}>
    <img
      src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
      alt=""
      width={36}
      height={36}
    />
    <label className="text-sm leading-[1.15] text-gray-600 [&_a]:text-xs [&_a]:text-blue-800 [&_a]:hover:underline">
      Protected by ReCAPTCHA
      <br />
      <a href="https://www.google.com/intl/en/policies/privacy/">
        Privacy
      </a> - <a href="https://www.google.com/intl/en/policies/terms/">Terms</a>
    </label>
  </div>
);

export default ReCaptcha;
