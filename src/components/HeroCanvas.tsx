import { useEffect, useRef } from "react";

/**
 * WebGL animated gradient mesh background.
 * Pure GLSL shader — no external libs beyond OGL (already a dep).
 */
export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let mounted = true;

    (async () => {
      const { Renderer, Program, Mesh, Triangle } = await import("ogl");
      if (!mounted || !containerRef.current) return;

      const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      containerRef.current.appendChild(gl.canvas);

      const resize = () => {
        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;
        renderer.setSize(clientWidth, clientHeight);
        program.uniforms.uResolution.value = [clientWidth, clientHeight];
      };

      const vertex = /* glsl */ `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fragment = /* glsl */ `
        precision highp float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        // Simplex noise
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
        float snoise(vec2 v){
          const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
          vec2 i=floor(v+dot(v,C.yy));
          vec2 x0=v-i+dot(i,C.xx);
          vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
          vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
          i=mod289(i);
          vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
          vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
          m=m*m; m=m*m;
          vec3 x=2.0*fract(p*C.www)-1.0;
          vec3 h=abs(x)-0.5;
          vec3 ox=floor(x+0.5);
          vec3 a0=x-ox;
          m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
          vec3 g;
          g.x=a0.x*x0.x+h.x*x0.y;
          g.yz=a0.yz*x12.xz+h.yz*x12.yw;
          return 130.0*dot(m,g);
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / uResolution.y;
          vec2 p = uv;
          p.x *= aspect;

          float t = uTime * 0.08;
          float n1 = snoise(p * 1.6 + vec2(t, t * 0.7));
          float n2 = snoise(p * 2.4 - vec2(t * 0.6, t));
          float n = n1 * 0.6 + n2 * 0.4;

          // Color palette: deep ink → amber → bone
          vec3 ink   = vec3(0.039, 0.039, 0.043);
          vec3 ink2  = vec3(0.07, 0.06, 0.09);
          vec3 amber = vec3(0.91, 0.69, 0.29);
          vec3 ember = vec3(1.0, 0.48, 0.24);

          vec3 col = mix(ink, ink2, smoothstep(-0.6, 0.6, n));
          col = mix(col, amber * 0.55, smoothstep(0.2, 0.85, n));
          col = mix(col, ember * 0.4, smoothstep(0.6, 1.0, n));

          // Vignette
          float v = smoothstep(1.2, 0.2, length(uv - 0.5));
          col *= v;

          // Subtle grain
          float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
          col += (grain - 0.5) * 0.025;

          gl_FragColor = vec4(col, 1.0);
        }
      `;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [1, 1] },
          uMouse: { value: [0.5, 0.5] },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });

      resize();
      window.addEventListener("resize", resize);

      let raf = 0;
      const start = performance.now();
      const loop = () => {
        program.uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(loop);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      };
    })();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" aria-hidden="true" />;
}
