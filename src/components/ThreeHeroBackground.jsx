import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js 3D WebGL Background for Hero Section.
 * Features:
 * - Geometric particle field & dynamic wave topography
 * - Dual responsive point lights in Electric Indigo (#6366F1) and Emerald Neon (#10B981)
 * - Obsidian (#09090B) depth fog
 * - Parallax mouse response with smooth lerp damping
 * - Performance-optimized: pauses when offscreen, low footprint
 */
export function ThreeHeroBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 35, 95);
    camera.lookAt(0, 0, 0);

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return; // Graceful fallback if WebGL not supported
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x09090b, 0);
    container.appendChild(renderer.domElement);

    // Particle Grid / Wave Geometry
    const cols = 55;
    const rows = 45;
    const spacing = 4.2;
    const particleCount = cols * rows;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorIndigo = new THREE.Color(0x6366f1);
    const colorEmerald = new THREE.Color(0x10b981);
    const tempColor = new THREE.Color();

    let pIdx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacing;
        const z = (j - rows / 2) * spacing;
        const y = 0;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = y;
        positions[pIdx * 3 + 2] = z;

        // Gradient blend between Indigo and Emerald based on spatial coordinates
        const ratio = (i / cols + j / rows) * 0.5;
        tempColor.copy(colorIndigo).lerp(colorEmerald, ratio);

        colors[pIdx * 3] = tempColor.r;
        colors[pIdx * 3 + 1] = tempColor.g;
        colors[pIdx * 3 + 2] = tempColor.b;

        scales[pIdx] = 1.0;
        pIdx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Particle Texture via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Decorative Polygonal Wireframe Prism floating in the background
    const prismGeo = new THREE.IcosahedronGeometry(22, 1);
    const prismMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const prism = new THREE.Mesh(prismGeo, prismMat);
    prism.position.set(28, 12, -25);
    scene.add(prism);

    // Smooth Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let isVisible = true;

    // Intersection observer to pause rendering when hero is scrolled out
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.15 : 0.65;

      // Smooth camera sway following mouse
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      camera.position.x = currentMouseX * 16;
      camera.position.y = 35 + currentMouseY * 8;
      camera.lookAt(0, 0, 0);

      // Rotate decorative prism
      prism.rotation.x = elapsed * 0.08 * speed;
      prism.rotation.y = elapsed * 0.12 * speed;

      // Wave calculation on geometry vertices
      const posArr = geometry.attributes.position.array;
      let idx = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const u = i / cols;
          const v = j / rows;
          const wave1 = Math.sin(u * 8 + elapsed * 1.4 * speed) * 4.5;
          const wave2 = Math.cos(v * 6 + elapsed * 1.1 * speed) * 3.5;
          const waveMouse =
            Math.sin(u * 4 + currentMouseX * 3) * Math.cos(v * 4 + currentMouseY * 3) * 2;

          posArr[idx * 3 + 1] = wave1 + wave2 + waveMouse;
          idx++;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      prismGeo.dispose();
      prismMat.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60"
    />
  );
}
