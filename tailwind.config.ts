import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./1774948612294505559.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['Unbounded', 'sans-serif'],
				body: ['Golos Text', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				evgesha: {
					coral: '#FF6B6B',
					mint: '#4ECDC4',
					purple: '#A855F7',
					yellow: '#FFD93D',
					pink: '#FF6EB4',
					dark: '#0A0A0F',
					card: '#12121A',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'spin-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' }
				},
				'spin-reverse': {
					from: { transform: 'rotate(360deg)' },
					to: { transform: 'rotate(0deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-20px) rotate(5deg)' },
					'66%': { transform: 'translateY(-10px) rotate(-5deg)' }
				},
				'float-delayed': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-15px) rotate(-5deg)' },
					'66%': { transform: 'translateY(-25px) rotate(5deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.1)' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
					'60%': { transform: 'scale(1.15) rotate(5deg)' },
					'100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
				},
				'slide-up': {
					from: { transform: 'translateY(40px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-5deg) scale(1)' },
					'25%': { transform: 'rotate(5deg) scale(1.05)' },
					'50%': { transform: 'rotate(-3deg) scale(0.98)' },
					'75%': { transform: 'rotate(3deg) scale(1.02)' }
				},
				'orbit': {
					from: { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
					to: { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' }
				},
				'marquee': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' }
				},
				'fade-in-up': {
					from: { transform: 'translateY(30px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'spin-slow': 'spin-slow 8s linear infinite',
				'spin-reverse': 'spin-reverse 6s linear infinite',
				'float': 'float 4s ease-in-out infinite',
				'float-delayed': 'float-delayed 5s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'bounce-in': 'bounce-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
				'slide-up': 'slide-up 0.6s ease-out forwards',
				'wiggle': 'wiggle 2s ease-in-out infinite',
				'orbit': 'orbit 4s linear infinite',
				'marquee': 'marquee 20s linear infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
