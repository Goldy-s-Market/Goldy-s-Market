import CircularText from "./CircularText";

const CircularLogo = ({ 
  width = 256, 
  height = 288, 
  logoSize = "w-40 h-40",
  logoPath = "/goldy's-market-logo.png",
  logoAlt = "Goldy's Market Logo",
  text = "GOLDY'S * MARKET * UMN * ",
  backgroundColor = "bg-umn-gold",
  spinDuration = 20,
  onHover = "speedUp",
  className = "custom-class"
}) => {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Circular Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-48 h-48 rounded-full ${backgroundColor} shadow-lg`}></div>
      </div>
      
      {/* Circular Text Component */}
      <CircularText
        text={text}
        onHover={onHover}
        spinDuration={spinDuration}
        className={`${className} relative z-10`}
      />
      
      {/* Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <img 
          src={logoPath}
          alt={logoAlt}
          className={`${logoSize} object-contain`}
        />
      </div>
    </div>
  );
};

export default CircularLogo;
