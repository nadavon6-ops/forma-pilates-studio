'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'

// Brand colors
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.5)',
  rgb: { r: 4, g: 133, b: 178 },
}

// ============================================
// PERLIN NOISE - For organic animations
// (Impossible in WordPress - requires JS computation)
// ============================================
class PerlinNoise {
  private permutation: number[] = []

  constructor() {
    const p = []
    for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256)
    this.permutation = [...p, ...p]
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a)
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3
    const u = h < 2 ? x : y
    const v = h < 2 ? y : x
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    x -= Math.floor(x)
    y -= Math.floor(y)
    const u = this.fade(x)
    const v = this.fade(y)
    const A = this.permutation[X] + Y
    const B = this.permutation[X + 1] + Y
    return this.lerp(
      this.lerp(this.grad(this.permutation[A], x, y), this.grad(this.permutation[B], x - 1, y), u),
      this.lerp(this.grad(this.permutation[A + 1], x, y - 1), this.grad(this.permutation[B + 1], x - 1, y - 1), u),
      v
    )
  }
}

// ============================================
// WEBGL AURORA SHADER BACKGROUND
// (100% impossible in WordPress - requires WebGL shaders)
// ============================================
function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    // Fragment shader - creates aurora effect
    const fragmentShaderSource = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;

      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;

        // Multiple layers of noise for aurora waves
        float n1 = snoise(vec2(uv.x * 3.0 + time * 0.1, uv.y * 2.0 + time * 0.05));
        float n2 = snoise(vec2(uv.x * 5.0 - time * 0.15, uv.y * 3.0 + time * 0.08));
        float n3 = snoise(vec2(uv.x * 7.0 + time * 0.12, uv.y * 4.0 - time * 0.06));

        // Combine noise layers
        float noise = (n1 + n2 * 0.5 + n3 * 0.25) / 1.75;

        // Aurora color gradient
        vec3 color1 = vec3(0.016, 0.522, 0.698); // Brand primary
        vec3 color2 = vec3(0.024, 0.647, 0.851); // Brand light
        vec3 color3 = vec3(0.012, 0.427, 0.580); // Brand dark

        // Mix colors based on position and noise
        vec3 color = mix(color1, color2, uv.y + noise * 0.3);
        color = mix(color, color3, sin(uv.x * 3.14159 + time * 0.2) * 0.5 + 0.5);

        // Aurora wave intensity
        float wave = sin(uv.y * 10.0 + noise * 5.0 + time) * 0.5 + 0.5;
        wave *= smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.5, uv.y);

        // Final color with glow
        color *= wave * 0.4 + 0.1;
        color += vec3(0.02, 0.05, 0.08); // Dark base

        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Create geometry
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const timeUniform = gl.getUniformLocation(program, 'time')
    const resolutionUniform = gl.getUniformLocation(program, 'resolution')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let animationId: number
    let startTime = Date.now()

    const animate = () => {
      const time = (Date.now() - startTime) / 1000
      gl.uniform1f(timeUniform, time)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
}

// ============================================
// MAGNETIC CURSOR WITH PARTICLE EXPLOSION
// (Impossible in WordPress - requires real-time physics)
// ============================================
function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; size: number }>>([])
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Spring physics for smooth cursor movement
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const particles = particlesRef.current
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Add trail particles
      if (Math.random() > 0.7) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 4 + 2,
        })
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      // Particle explosion on click
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 / 20) * i
        const speed = Math.random() * 8 + 4
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: Math.random() * 6 + 3,
        })
      }
    }

    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], input, textarea')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    // Particle animation loop
    const animateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.vy += 0.1 // gravity
        p.life -= 0.02

        if (p.life <= 0) {
          particles.splice(i, 1)
        }
      }
      animationId = requestAnimationFrame(animateParticles)
    }
    animateParticles()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY])

  // Render particles
  const [, forceUpdate] = useState(0)
  useAnimationFrame(() => forceUpdate(n => n + 1))

  return (
    <>
      {/* Trail particles */}
      {particlesRef.current.map((p, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: BRAND.primary,
            opacity: p.life,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${p.size * 2}px ${BRAND.primary}`,
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            borderColor: isHovering ? BRAND.light : BRAND.primary,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          className="w-12 h-12 border-2 rounded-full flex items-center justify-center"
          style={{ borderColor: BRAND.primary }}
        >
          {/* Inner glow */}
          <motion.div
            animate={{ scale: isHovering ? 1 : 0 }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: BRAND.primary }}
          />
        </motion.div>

        {/* Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-px" style={{ backgroundColor: `${BRAND.primary}50` }} />
          <div className="w-px h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: `${BRAND.primary}50` }} />
        </div>
      </motion.div>
    </>
  )
}

// ============================================
// 3D MORPHING MESH GRID
// (Impossible in WordPress - requires vertex manipulation)
// ============================================
function MorphingMeshGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const noiseRef = useRef<PerlinNoise | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    noiseRef.current = new PerlinNoise()
    const noise = noiseRef.current

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let time = 0
    let animationId: number

    const animate = () => {
      time += 0.008
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = 40
      const rows = 25
      const cellWidth = canvas.width / cols
      const cellHeight = canvas.height / rows

      // Draw morphing grid
      ctx.strokeStyle = `${BRAND.primary}30`
      ctx.lineWidth = 0.5

      for (let y = 0; y <= rows; y++) {
        ctx.beginPath()
        for (let x = 0; x <= cols; x++) {
          // Calculate distance from mouse
          const dx = x / cols - mouseRef.current.x
          const dy = y / rows - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Noise-based displacement
          const noiseVal = noise.noise2D(x * 0.1 + time, y * 0.1 + time)
          const displacement = noiseVal * 30 + Math.sin(dist * 10 - time * 3) * 20 * Math.max(0, 1 - dist * 2)

          const px = x * cellWidth
          const py = y * cellHeight + displacement

          if (x === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath()
        for (let y = 0; y <= rows; y++) {
          const dx = x / cols - mouseRef.current.x
          const dy = y / rows - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const noiseVal = noise.noise2D(x * 0.1 + time, y * 0.1 + time)
          const displacement = noiseVal * 30 + Math.sin(dist * 10 - time * 3) * 20 * Math.max(0, 1 - dist * 2)

          const px = x * cellWidth
          const py = y * cellHeight + displacement

          if (y === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        ctx.stroke()
      }

      // Draw glowing nodes at intersections
      for (let y = 0; y <= rows; y += 2) {
        for (let x = 0; x <= cols; x += 2) {
          const dx = x / cols - mouseRef.current.x
          const dy = y / rows - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const noiseVal = noise.noise2D(x * 0.1 + time, y * 0.1 + time)
          const displacement = noiseVal * 30 + Math.sin(dist * 10 - time * 3) * 20 * Math.max(0, 1 - dist * 2)

          const px = x * cellWidth
          const py = y * cellHeight + displacement

          const nodeSize = 2 + Math.max(0, 1 - dist * 3) * 4

          ctx.beginPath()
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, nodeSize * 3)
          gradient.addColorStop(0, `${BRAND.primary}80`)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.arc(px, py, nodeSize * 3, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.fillStyle = '#fff'
          ctx.arc(px, py, nodeSize * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
}

// ============================================
// FLOATING HOLOGRAPHIC CARDS WITH DEPTH
// (Impossible in WordPress - requires 3D transforms + physics)
// ============================================
function HolographicDataCard({ data, index, total }: { data: { keyword: string; position: number; change: string }; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  // Calculate 3D position in a circular arrangement
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const radius = 180
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.8, type: 'spring' }}
      whileHover={{ scale: 1.1, z: 50 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
      className="absolute bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 cursor-pointer"
      style={{
        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${(mousePos.x - 0.5) * 20}deg) rotateX(${(mousePos.y - 0.5) * -20}deg)`,
        transformStyle: 'preserve-3d',
        width: '200px',
      }}
    >
      {/* Holographic shine effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        style={{
          background: `linear-gradient(${105 + (mousePos.x - 0.5) * 60}deg, transparent 40%, ${BRAND.primary}30 50%, transparent 60%)`,
        }}
      />

      {/* Prismatic edge */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(${mousePos.x * 360}deg, ${BRAND.primary}50, ${BRAND.light}50, ${BRAND.dark}50, ${BRAND.primary}50)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm"
            style={{
              background: data.position === 1
                ? `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})`
                : data.position <= 3
                  ? 'linear-gradient(135deg, #6b7280, #9ca3af)'
                  : '#4b5563'
            }}
          >
            #{data.position}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{data.keyword}</div>
            <div className="text-green-400 text-xs font-mono">{data.change}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// 3D ROTATING KEYWORD ORBIT
// (Impossible in WordPress - requires 3D CSS transforms)
// ============================================
function KeywordOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

  const keywords = [
    { keyword: 'קידום אתרים', position: 1, change: '+12' },
    { keyword: 'SEO ישראל', position: 1, change: '+8' },
    { keyword: 'בניית אתרים', position: 2, change: '+15' },
    { keyword: 'שיווק דיגיטלי', position: 3, change: '+22' },
    { keyword: 'קידום עסקים', position: 2, change: '+18' },
    { keyword: 'פרסום בגוגל', position: 4, change: '+10' },
  ]

  useAnimationFrame((time) => {
    setRotation(time / 50)
  })

  return (
    <div
      ref={containerRef}
      className="relative w-[400px] h-[400px]"
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
    >
      {/* Center orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
        <motion.div
          animate={{
            boxShadow: [
              `0 0 30px ${BRAND.primary}40`,
              `0 0 60px ${BRAND.primary}60`,
              `0 0 30px ${BRAND.primary}40`,
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` }}
        >
          <span className="text-white font-black text-2xl">#1</span>
        </motion.div>

        {/* Orbiting ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white" />
        </motion.div>
      </div>

      {/* Orbiting cards */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {keywords.map((kw, i) => (
          <HolographicDataCard key={kw.keyword} data={kw} index={i} total={keywords.length} />
        ))}
      </div>
    </div>
  )
}

// ============================================
// ANIMATED STATISTICS WITH PHYSICS
// ============================================
function PhysicsCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const spring = useSpring(0, { damping: 30, stiffness: 100 })
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString())
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          spring.set(value)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, spring])

  useEffect(() => {
    return display.on('change', (v) => setDisplayValue(v))
  }, [display])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

// ============================================
// GLITCH TEXT WITH RGB SPLIT
// (Impossible in WordPress - requires CSS clip-path animation)
// ============================================
function RGBGlitchText({ children }: { children: string }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 150)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block">
      {/* Red channel */}
      <span
        className="absolute inset-0"
        style={{
          color: '#ff0000',
          mixBlendMode: 'screen',
          transform: glitching ? 'translateX(-3px)' : 'translateX(0)',
          clipPath: glitching ? 'inset(20% 0 30% 0)' : 'inset(0)',
          transition: 'transform 0.05s, clip-path 0.05s',
        }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Blue channel */}
      <span
        className="absolute inset-0"
        style={{
          color: '#00ffff',
          mixBlendMode: 'screen',
          transform: glitching ? 'translateX(3px)' : 'translateX(0)',
          clipPath: glitching ? 'inset(60% 0 10% 0)' : 'inset(0)',
          transition: 'transform 0.05s, clip-path 0.05s',
        }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Main text */}
      <span className="relative" style={{ color: BRAND.primary }}>
        {children}
      </span>
    </span>
  )
}

// ============================================
// LIQUID BUTTON WITH MAGNETIC EFFECT
// ============================================
function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setPosition({
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovering(false)
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 150 }}
      className="relative px-10 py-5 rounded-full text-white font-bold text-lg overflow-hidden group"
      style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` }}
    >
      {/* Liquid blob effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isHovering
            ? `radial-gradient(circle at ${50 + position.x}% ${50 + position.y}%, ${BRAND.light}, ${BRAND.primary})`
            : `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})`,
        }}
      />

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isHovering
            ? `0 0 0 10px ${BRAND.primary}20, 0 0 0 20px ${BRAND.primary}10`
            : `0 0 0 0px ${BRAND.primary}00`,
        }}
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10 flex items-center gap-3">
        {children}
        <motion.svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ x: isHovering ? 5 : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>
      </span>
    </motion.button>
  )
}

// ============================================
// MAIN HERO COMPONENT
// ============================================
export default function SEOHeroUltimate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 500])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 20])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[140vh] flex items-center justify-center overflow-hidden bg-[#030308]"
      dir="rtl"
    >
      {/* Custom Cursor */}
      <MagneticCursor />

      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* WebGL Aurora */}
        <AuroraBackground />

        {/* Morphing Mesh Grid */}
        <MorphingMeshGrid />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, #030308 70%)',
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Scanning line */}
        <motion.div
          className="absolute inset-x-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${BRAND.primary}, transparent)` }}
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale, rotateX }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right Column - Text */}
          <div className="text-center lg:text-right">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8"
              style={{
                borderColor: `${BRAND.primary}40`,
                background: `linear-gradient(135deg, ${BRAND.primary}10, transparent)`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-green-500"
              />
              <span style={{ color: BRAND.light }} className="text-sm font-medium">
                #1 סוכנות SEO בישראל • 2024
              </span>
            </motion.div>

            {/* Main headline with RGB glitch */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]"
            >
              <span className="text-white">קידום אתרים</span>
              <br />
              <RGBGlitchText>שמביא תוצאות</RGBGlitchText>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-500 text-3xl md:text-4xl"
              >
                לא הבטחות
              </motion.span>
            </motion.h1>

            {/* Stats with physics animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-10 mb-10 justify-center lg:justify-start"
            >
              {[
                { value: 500, suffix: '+', label: 'מילות מפתח' },
                { value: 150, suffix: '+', label: 'לקוחות' },
                { value: 300, suffix: '%', label: 'צמיחה' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                  className="text-center"
                >
                  <div className="text-4xl font-black" style={{ color: BRAND.primary }}>
                    <PhysicsCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <MagneticButton>
                קבלו הצעת מחיר
              </MagneticButton>

              <motion.a
                href="tel:052-566-0563"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 rounded-full font-semibold text-lg flex items-center gap-3 justify-center"
                style={{ borderColor: `${BRAND.primary}60`, color: BRAND.light }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                052-566-0563
              </motion.a>
            </motion.div>
          </div>

          {/* Left Column - 3D Keyword Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <KeywordOrbit />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with trail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">גלול למטה</span>
          <div className="relative">
            <div className="w-8 h-14 rounded-full border-2" style={{ borderColor: `${BRAND.primary}50` }}>
              <motion.div
                animate={{ y: [8, 28, 8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{ backgroundColor: BRAND.primary, top: '8px' }}
              />
            </div>
            {/* Trail effect */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: BRAND.primary, opacity: 0.3 - i * 0.1 }}
                animate={{ y: [8, 28, 8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        .seo-page * {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          .seo-page * {
            cursor: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
