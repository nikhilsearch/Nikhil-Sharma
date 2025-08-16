import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SkillCardProps = {
  id: string;
  title: string;
  description?: string;
  skills?: string[];
  variant?: 'framework' | 'category' | 'detail';
  colorScheme?: 'core' | 'advanced' | 'primary';
  className?: string;
  children?: React.ReactNode;
};

const SkillCard = forwardRef<HTMLDivElement, SkillCardProps>(
  ({ id, title, description, skills, variant = 'category', colorScheme = 'primary', className, children }, ref) => {
    const colorSchemes = {
      core: {
        bg: 'bg-card/80',
        border: 'border-emerald-500/20',
        hover: 'hover:border-emerald-500/40 hover:shadow-emerald-500/20',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        glow: 'hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]'
      },
      advanced: {
        bg: 'bg-card/80',
        border: 'border-indigo-500/20',
        hover: 'hover:border-indigo-500/40 hover:shadow-indigo-500/20',
        badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        glow: 'hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)]'
      },
      primary: {
        bg: 'bg-card/80',
        border: 'border-primary/20',
        hover: 'hover:border-primary/40 hover:shadow-primary/20',
        badge: 'bg-primary/10 text-primary border-primary/20',
        glow: 'hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)]'
      }
    };

    const sizes = {
      framework: {
        padding: 'px-6 py-4 md:px-8 md:py-6',
        title: 'text-2xl md:text-3xl',
        text: 'text-base md:text-lg'
      },
      category: {
        padding: 'px-6 py-4',
        title: 'text-xl md:text-2xl',
        text: 'text-sm md:text-base'
      },
      detail: {
        padding: 'px-4 py-3 md:px-6 md:py-4',
        title: 'text-lg md:text-xl',
        text: 'text-sm'
      }
    };

    const currentScheme = colorSchemes[colorScheme];
    const currentSize = sizes[variant];

    return (
      <motion.div
        ref={ref}
        id={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          scale: variant === 'framework' ? 1.02 : 1.03,
          y: variant === 'framework' ? -2 : -4
        }}
        className={cn(
          "relative backdrop-blur-md border-2 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer group",
          currentScheme.bg,
          currentScheme.border,
          currentScheme.hover,
          currentScheme.glow,
          currentSize.padding,
          className
        )}
        tabIndex={0}
        role="article"
        aria-describedby={description ? `${id}-description` : undefined}
      >
        <div className="relative z-10">
          <h3 className={cn(
            "font-bold text-foreground mb-2 md:mb-3",
            currentSize.title
          )}>
            {title}
          </h3>
          
          {description && (
            <p 
              id={`${id}-description`}
              className={cn(
                "text-muted-foreground leading-relaxed mb-3",
                currentSize.text
              )}
            >
              {description}
            </p>
          )}

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1 md:gap-2 mb-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={cn(
                    "text-xs px-2 py-1 rounded-full border font-medium",
                    currentScheme.badge
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {children}
        </div>

        {/* Gradient overlay on hover */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          colorScheme === 'core' && "bg-gradient-to-r from-emerald-500/5 to-teal-500/5",
          colorScheme === 'advanced' && "bg-gradient-to-r from-indigo-500/5 to-violet-500/5",
          colorScheme === 'primary' && "bg-gradient-to-r from-primary/5 to-purple-500/5"
        )} />
      </motion.div>
    );
  }
);

SkillCard.displayName = 'SkillCard';

export default SkillCard;