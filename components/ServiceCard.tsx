import { motion } from 'framer-motion';
import { Icon } from '@phosphor-icons/react';
import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: Icon;
  title: string;
  description: string;
  color?: 'red' | 'orange' | 'blue';
  className?: string;
}

export default function ServiceCard({
  icon: IconComponent,
  title,
  description,
  color = 'red', // kept as is
  className = ''
}: ServiceCardProps) {
  const colorClasses = {
    red: 'bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white',
    orange: 'bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-white',
    blue: 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-navy group-hover:text-white',
  };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white p-8 rounded-2xl border border-neutral-100 hover:border-brand-red/20 transition-colors group ${className}`}
    >
      <div className={`w-14 h-14 rounded-2xl ${colorClasses[color]} flex items-center justify-center mb-6 transition-colors duration-300`}>
        <IconComponent size={28} weight="fill" />
      </div>
      <h3 className="font-serif font-bold text-brand-navy mb-3 text-xl">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
