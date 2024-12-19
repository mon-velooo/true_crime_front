const Pin = ({ size = 20, color = '#313131', active }) => {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      className={`cursor-pointer stroke-none transition ease-in duration-200 ${active ? 'transform scale-170' : ''}`}
    >
      <circle cx="12" cy="12" r="12" fill={color} />
      <circle cx="12" cy="12" r="10" fill="white" />
      <circle cx="12" cy="12" r="8" fill={active ? 'red' : color} />
    </svg>
  );
};

export default Pin;
