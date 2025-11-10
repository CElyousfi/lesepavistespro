'use client';

import dynamic from 'next/dynamic';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

interface LottieIconProps {
  src: string;
  size?: number;
  className?: string;
}

// Minimalistic Lottie animation URLs
export const LOTTIE_ICONS = {
  // Stats & Numbers
  users: 'https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json', // Simple users icon
  checkmark: 'https://assets4.lottiefiles.com/packages/lf20_jbrw3hcz.json', // Checkmark
  clock: 'https://assets2.lottiefiles.com/packages/lf20_tll0j4bb.json', // Clock/time
  lightning: 'https://assets1.lottiefiles.com/packages/lf20_poqmycwy.json', // Lightning/speed
  
  // Service Icons
  car: 'https://assets5.lottiefiles.com/packages/lf20_khzniaya.json', // Car icon
  truck: 'https://assets8.lottiefiles.com/packages/lf20_w98qte06.json', // Truck/tow
  location: 'https://assets1.lottiefiles.com/packages/lf20_gkgqj2yq.json', // Location pin
  phone: 'https://assets2.lottiefiles.com/packages/lf20_u25cckyh.json', // Phone call
  
  // Process Icons
  search: 'https://assets9.lottiefiles.com/packages/lf20_zrqthn6o.json', // Search/magnify
  document: 'https://assets3.lottiefiles.com/packages/lf20_DMgKk1.json', // Document/paper
  money: 'https://assets7.lottiefiles.com/packages/lf20_06a6pf9i.json', // Money/payment
  success: 'https://assets1.lottiefiles.com/packages/lf20_lk80fpsm.json', // Success/done
  
  // UI Elements
  arrow: 'https://assets4.lottiefiles.com/packages/lf20_ydo1amjm.json', // Arrow
  star: 'https://assets5.lottiefiles.com/packages/lf20_xyadoh9h.json', // Star rating
  heart: 'https://assets2.lottiefiles.com/packages/lf20_kyu7xb1v.json', // Heart/like
  gift: 'https://assets6.lottiefiles.com/packages/lf20_xyadoh9h.json', // Gift/free
};

export default function LottieIcon({ src, size = 64, className = '' }: LottieIconProps) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <Player
        autoplay
        loop
        src={src}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
