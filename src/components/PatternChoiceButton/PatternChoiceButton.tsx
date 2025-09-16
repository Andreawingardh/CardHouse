import style from "./PatternChoiceButton.module.css";

type ButtonShape = "clear" | "squares" | "stripes" | "circles";

type PatternChoiceButtonProps = {
  shape?: ButtonShape;
  onClick?: () => void;
};

export default function PatternChoiceButton({
  shape = "clear",
  onClick = () => {},
}: PatternChoiceButtonProps) {
  const renderShape = () => {
    switch (shape) {
      case "clear":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 39"
            className={style.icon}
          >
            <rect
              x="1"
              y="1"
              width="47"
              height="37"
              rx="8"
              fill="url(#backgroundGradient)"
              stroke="#3B3B3B"
              strokeWidth={2}
            />
            <defs>
              <linearGradient
                id="backgroundGradient"
                x1="24.5"
                y1="1"
                x2="24.5"
                y2="38"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2F3D54" />
                <stop offset="1" stopColor="#202B40" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "squares":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 39"
            className={style.icon}
          >
            <rect
              x="1"
              y="1"
              width="47"
              height="37"
              rx="8"
              fill="url(#grad)"
              stroke="#3B3B3B"
              strokeWidth={2}
            />
            <rect
              x="35.5"
              y="5.7"
              width="11"
              height="11"
              transform="rotate(45 35.5 5.7)"
              stroke="#737C89"
            />
            <rect
              x="10.3"
              y="18.7"
              width="6.4"
              height="6.4"
              transform="rotate(24.5 10.3 18.7)"
              stroke="#737C89"
            />
            <rect
              x="23.6"
              y="29.1"
              width="4.1"
              height="4.1"
              transform="rotate(-20.3 23.6 29.1)"
              stroke="#737C89"
            />
            <defs>
              <linearGradient
                id="grad"
                x1="24.5"
                y1="1"
                x2="24.5"
                y2="38"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2F3D54" />
                <stop offset="1" stopColor="#202B40" />
              </linearGradient>
            </defs>
          </svg>
        );

      case "stripes":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 39"
            className={style.icon}
          >
            <rect
              x="1"
              y="1"
              width="47"
              height="37"
              rx="8"
              fill="url(#paint0)"
              stroke="#3B3B3B"
              strokeWidth={2}
            />
            <rect x="2" y="13" width="45" height="2" fill="url(#paint1)" />
            <rect x="2" y="18" width="34" height="2" fill="url(#paint2)" />
            <rect x="2" y="23" width="24" height="2" fill="url(#paint3)" />
            <defs>
              <linearGradient
                id="paint0"
                x1="24.5"
                y1="1"
                x2="24.5"
                y2="38"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2F3D54" />
                <stop offset="1" stopColor="#202B40" />
              </linearGradient>
              <linearGradient
                id="paint1"
                x1="2"
                y1="14"
                x2="47"
                y2="14"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6B7584" />
                <stop offset="1" stopColor="#7C8390" />
              </linearGradient>
              <linearGradient
                id="paint2"
                x1="2"
                y1="19"
                x2="36"
                y2="19"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6B7584" />
                <stop offset="1" stopColor="#7C8390" />
              </linearGradient>
              <linearGradient
                id="paint3"
                x1="2"
                y1="24"
                x2="26"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6B7584" />
                <stop offset="1" stopColor="#7C8390" />
              </linearGradient>
            </defs>
          </svg>
        );

      case "circles":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 39"
            className={style.icon}
          >
            <rect
              x="1"
              y="1"
              width="47"
              height="37"
              rx="8"
              fill="url(#paint4)"
              stroke="#3B3B3B"
              strokeWidth={2}
            />
            <circle cx="7.5" cy="31.5" r="2.5" fill="#737C8A" />
            <circle cx="41.5" cy="6.5" r="2.5" fill="#737C8A" />
            <circle cx="10" cy="24" r="2" fill="#737C8A" />
            <circle cx="33" cy="8" r="2" fill="#737C8A" />
            <circle cx="42" cy="14" r="2" fill="#737C8A" />
            <circle cx="16.5" cy="26.5" r="1.5" fill="#737C8A" />
            <circle cx="36.5" cy="17.5" r="1.5" fill="#737C8A" />
            <defs>
              <linearGradient
                id="paint4"
                x1="24.5"
                y1="1"
                x2="24.5"
                y2="38"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2F3D54" />
                <stop offset="1" stopColor="#202B40" />
              </linearGradient>
            </defs>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <button className={style.button} onClick={onClick}>
      {renderShape()}
    </button>
  );
}
