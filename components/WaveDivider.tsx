interface WaveDividerProps {
  fill?: string
  bg?: string
  variant?: 'gentle' | 'steep' | 'layered'
  flip?: boolean
  className?: string
}

export default function WaveDivider({
  fill = '#003366',
  bg = 'transparent',
  variant = 'gentle',
  flip = false,
  className = '',
}: WaveDividerProps) {
  const paths = {
    gentle: (
      <path
        d="M0,64 C180,96 360,32 540,56 C720,80 900,24 1080,48 C1260,72 1380,40 1440,56 L1440,120 L0,120 Z"
        fill={fill}
      />
    ),
    steep: (
      <path
        d="M0,80 C240,120 360,20 600,60 C840,100 960,30 1200,70 C1320,90 1400,50 1440,65 L1440,120 L0,120 Z"
        fill={fill}
      />
    ),
    layered: (
      <>
        <path
          d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,55 1440,70 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.4"
        />
        <path
          d="M0,90 C240,110 480,50 720,80 C960,110 1200,60 1440,85 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.6"
        />
        <path
          d="M0,100 C180,115 540,70 900,95 C1100,108 1300,75 1440,92 L1440,120 L0,120 Z"
          fill={fill}
        />
      </>
    ),
  }

  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20 lg:h-24"
        fill="none"
      >
        {paths[variant]}
      </svg>
    </div>
  )
}
