import React from "react";

const MoonIcon = ({
  className,
  color,
}: {
  className: string;
  color: string;
}) => {
  return (
    <svg
      width="21"
      height="16"
      viewBox="0 0 21 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      color={color}
    >
      <path
        d="M1.05 5.33333H5.25C5.25 3.91467 5.8065 2.56 6.783 1.55733C7.77 0.565333 9.1035 0 10.5 0C11.8965 0 13.23 0.565333 14.217 1.55733C15.1935 2.56 15.75 3.91467 15.75 5.33333H19.95C20.2335 5.33333 20.475 5.45067 20.6955 5.64267C20.895 5.86667 21 6.12267 21 6.4C21 6.688 20.895 6.93333 20.6955 7.15733C20.475 7.36 20.2335 7.46667 19.95 7.46667H1.05C0.777 7.46667 0.525 7.36 0.3045 7.15733C0.1155 6.93333 0 6.688 0 6.4C0 6.12267 0.1155 5.86667 0.3045 5.64267C0.525 5.45067 0.777 5.33333 1.05 5.33333ZM3.15 9.6H17.85C18.1335 9.6 18.375 9.71733 18.5955 9.90934C18.795 10.1333 18.9 10.3893 18.9 10.6667C18.9 10.9547 18.795 11.2 18.5955 11.424C18.375 11.6267 18.1335 11.7333 17.85 11.7333H3.15C2.877 11.7333 2.625 11.6267 2.4045 11.424C2.2155 11.2 2.1 10.9547 2.1 10.6667C2.1 10.3893 2.2155 10.1333 2.4045 9.90934C2.625 9.71733 2.877 9.6 3.15 9.6ZM15.75 13.8667C16.0335 13.8667 16.275 13.984 16.4955 14.176C16.695 14.4 16.8 14.656 16.8 14.9333C16.8 15.2213 16.695 15.4667 16.4955 15.6907C16.275 15.8933 16.0335 16 15.75 16H5.25C4.977 16 4.725 15.8933 4.5045 15.6907C4.3155 15.4667 4.2 15.2213 4.2 14.9333C4.2 14.656 4.3155 14.4 4.5045 14.176C4.725 13.984 4.977 13.8667 5.25 13.8667H15.75Z"
        fill={color}
      />
    </svg>
  );
};

export default MoonIcon;
