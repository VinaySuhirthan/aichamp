"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // ── Scene Setup ──────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,          // ← big perf win
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // cap DPR
    renderer.setSize(width, height);
    renderer.setClearColor(0xfaf7f0, 0);
    mount.appendChild(renderer.domElement);

    // ── World Group ───────────────────────────────────────
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Primary Neural Wireframe Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    worldGroup.add(sphereMesh);

    // 2. Outer Concentric Cage
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    worldGroup.add(outerMesh);

    // 3. Glowing Node Points on Vertices
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", sphereGeo.attributes.position.clone());
    const nodeMat = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: 0.055,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    worldGroup.add(nodePoints);

    // 4. Flowing Silk Wave — OPTIMIZED: 24×16 instead of 48×36
    const waveSegX = 24;
    const waveSegY = 16;
    const waveGeo = new THREE.PlaneGeometry(7, 5, waveSegX, waveSegY);
    const waveVertCount = waveGeo.attributes.position.count;
    // Pre-compute initial X/Y into typed arrays (avoid per-frame getX/getY)
    const waveBaseX = new Float32Array(waveVertCount);
    const waveBaseY = new Float32Array(waveVertCount);
    const waveBaseR = new Float32Array(waveVertCount); // pre-compute radius
    for (let i = 0; i < waveVertCount; i++) {
      const x = waveGeo.attributes.position.getX(i);
      const y = waveGeo.attributes.position.getY(i);
      waveBaseX[i] = x;
      waveBaseY[i] = y;
      waveBaseR[i] = Math.sqrt(x * x + y * y);
    }
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.position.set(0, -0.15, -0.5);
    waveMesh.rotation.x = -Math.PI / 3.2;
    waveMesh.frustumCulled = false;
    worldGroup.add(waveMesh);

    // 5. Orbital Ring 1 — static geometry, no per-vertex ripple
    const ring1Geo = new THREE.TorusGeometry(1.85, 0.015, 8, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 4;
    ring1Mesh.rotation.y = Math.PI / 6;
    worldGroup.add(ring1Mesh);

    // 6. Orbital Ring 2
    const ring2Geo = new THREE.TorusGeometry(2.15, 0.012, 8, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 3.5;
    ring2Mesh.rotation.z = Math.PI / 5;
    worldGroup.add(ring2Mesh);

    // 7. Floating Particles — reduced from 650 → 300
    const PARTICLE_COUNT = 300;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 1.8 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x0284c7,
      size: 0.024,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    worldGroup.add(particles);

    // ── Mouse Parallax ───────────────────────────────────
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = -(((e.clientY / window.innerHeight) * 2 - 1)) * 0.3;
      targetY = ((e.clientX / window.innerWidth) * 2 - 1) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Viewport Visibility Observer ───
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) lastTime = performance.now();
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // ── Animation Loop — 30fps cap for smooth, consistent perf ──
    let frameId: number;
    let elapsed = 0;
    let lastTime = performance.now();
    let colorTick = 0;
    const FRAME_INTERVAL = 1000 / 30; // 30 FPS
    let accumulator = 0;

    const waveZArr = waveGeo.attributes.position.array as Float32Array;

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const rawDelta = time - lastTime;
      lastTime = time;
      accumulator += rawDelta;

      // Skip render if less than frame interval — consistent 30fps
      if (accumulator < FRAME_INTERVAL) return;
      const delta = Math.min(accumulator * 0.001, 0.1);
      accumulator = 0;
      elapsed += delta;

      // Smooth mouse lerp
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;

      worldGroup.rotation.x = curX + Math.sin(elapsed * 0.3) * 0.05;
      worldGroup.rotation.y = curY + elapsed * 0.15;

      outerMesh.rotation.z = -elapsed * 0.08;
      outerMesh.rotation.x = elapsed * 0.05;

      // Rings just rotate — no per-vertex math
      ring1Mesh.rotation.z = elapsed * 0.22;
      ring2Mesh.rotation.y = -elapsed * 0.18;

      // ── Animate wave mesh — optimized with pre-computed arrays ──
      const t1 = elapsed * 1.8;
      const t2 = elapsed * 1.3;
      const t3 = elapsed * 2.0;
      for (let i = 0; i < waveVertCount; i++) {
        const x = waveBaseX[i];
        const y = waveBaseY[i];
        const z =
          Math.sin(x * 1.4 + t1) * Math.cos(y * 1.4 + t2) * 0.26 +
          Math.sin(waveBaseR[i] * 2.2 - t3) * 0.14;
        waveZArr[i * 3 + 2] = z;
      }
      waveGeo.attributes.position.needsUpdate = true;

      // Subtle breathing pulse
      const pulse = 1 + Math.sin(elapsed * 1.5) * 0.04;
      sphereMesh.scale.setScalar(pulse);
      nodePoints.scale.setScalar(pulse);

      // Chromatic shift — only update every 3rd frame (visually identical)
      colorTick++;
      if (colorTick % 3 === 0) {
        const hue = 0.55 + Math.sin(elapsed * 0.25) * 0.08;
        nodeMat.color.setHSL(hue, 0.95, 0.58);
        outerMat.color.setHSL((hue + 0.05) % 1, 0.9, 0.62);
        waveMat.color.setHSL((hue + 0.02) % 1, 0.85, 0.65);
        ring1Mat.color.setHSL(hue, 0.92, 0.58);
        ring2Mat.color.setHSL((hue + 0.12) % 1, 0.88, 0.62);
      }

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    // ── Resize Handler (debounced) ─────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!mount) return;
        const w = mount.clientWidth || window.innerWidth;
        const h = mount.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      role="presentation"
    />
  );
}
