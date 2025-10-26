import logoImage from 'figma:asset/9baa03e9a8ca9749cd959c46320700fea1d7dc25.png';

export function Logo() {
  return (
    <img 
      src={logoImage} 
      alt="AFI Logo" 
      className="h-10 w-auto"
    />
  );
}
