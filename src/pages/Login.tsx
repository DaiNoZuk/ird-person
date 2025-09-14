import { useEffect, useState } from "react";
import { image } from "../assets/images";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

function Login() {
  const { login, user } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      return;
    }
  }, [user]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("กรุณากรอกอีเมล");
      return false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("รูปแบบอีเมลไม่ถูกต้อง");
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("กรุณากรอกรหัสผ่าน");
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateEmail() && validatePassword();
    if (isValid) {
      await new Promise((r) => setTimeout(r, 600)); // จำลอง API
      login({
        user: {
          id: "u_1",
          email,
          name: "นายศุภณัฐ เหลี่ยมเลิศ",
          role: "admin",
        },
        accessToken: "ACCESS_TOKEN_SAMPLE",
        remember,
      });
      navigate("/");
    } else {
      alert("กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน");
    }
  };

  return (
    <div className="bg-[url(assets\images\bg-login.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-[#B0BEF8]/60 flex flex-col items-center justify-center rounded-2xl px-8 py-4 gap-4 text-2xl">
        <div className="flex items-end justify-start w-full gap-2">
          <img src={image.logoRMUTT} alt="" className="w-18 h-32" />
          <img src={image.logoIRD} alt="" className="w-20 h-20" />
          <p className="text-4xl">
            ระบบฐานข้อมูลผู้ทรงคุณวุฒิ <br />
            Fundamental Fund
          </p>
        </div>
        <div className="flex flex-col w-full">
          <p>Email</p>
          <input
            type="email"
            className={`py-2 px-2 rounded-xl  ${
              emailError
                ? "bg-error-bg focus:outline-2 focus:outline-at-error-border focus:bg-at-error-bg"
                : "bg-primary-50 focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
            }`}
            placeholder="example@test.com"
            onBlur={() => validateEmail()}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="pl-2 text-lg text-error-text">{emailError}</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <p>Password</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`  py-2 px-2 rounded-xl
                      w-full pr-10 ${
                        passwordError
                          ? "bg-error-bg focus:outline-2 focus:outline-at-error-border focus:bg-at-error-bg"
                          : "bg-primary-50 focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
                      }`}
              placeholder="Your Password"
              onBlur={() => validatePassword()}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordError && (
            <p className="pl-2 text-lg text-error-text">{passwordError}</p>
          )}
        </div>
        <div className="flex justify-start w-full gap-2 items-center">
          <input
            type="checkbox"
            className="w-6 h-6 accent-primary-600"
            onClick={() => setRemember(!remember)}
          />
          <p>Remember Me</p>
        </div>
        <button
          onClick={onSubmit}
          className="rounded-2xl border border-primary-600 bg-primary-100 w-full py-2 hover:bg-primary-200 hover:border-primary-700 cursor-pointer"
        >
          Sing In
        </button>
      </div>
    </div>
  );
}

export default Login;
