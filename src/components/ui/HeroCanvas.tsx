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
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Cyber Sphere & World Group ───────────────────────
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Primary Neural Wireframe Sphere (Electric Light Blue)
    const sphereGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9, // Vivid Light Sky Blue
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    worldGroup.add(sphereMesh);

    // 2. Outer Concentric Cyber Cage (Creamy White)
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xfcf9f2, // Creamy White
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    worldGroup.add(outerMesh);

    // 3. Glowing Node Points on Vertices (Ice Cyan Blue)
    const nodePositions = sphereGeo.attributes.position.clone();
    nodePositions.needsUpdate = true;
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", nodePositions);

    const nodeMat = new THREE.PointsMaterial({
      color: 0x38bdf8, // Electric Ice Blue Nodes
      size: 0.056,
      transparent: true,
      opacity: 0.98,
      sizeAttenuation: true,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    worldGroup.add(nodePoints);

    // 4. Floating Cosmic Data Particles (Creamy White)
    const PARTICLE_COUNT = 700;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 1.8 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pPositions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0xfcf9f2, // Creamy White ambient dust
      size: 0.024,
      transparent: true,
      opacity: 0.6,
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
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = -normY * 0.3;
      targetY = normX * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Viewport Visibility Observer (Saves GPU during scroll) ───
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // ── Animation Loop ───────────────────────────────────
    let frameId: number;
    let elapsed = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = Math.min((time - lastTime) * 0.001, 0.1);
      lastTime = time;
      elapsed += delta;

      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;

      worldGroup.rotation.x = curX + Math.sin(elapsed * 0.3) * 0.05;
      worldGroup.rotation.y = curY + elapsed * 0.15;

      outerMesh.rotation.z = -elapsed * 0.08;
      outerMesh.rotation.x = elapsed * 0.05;

      // Subtle breathing pulse
      const pulse = 1 + Math.sin(elapsed * 1.5) * 0.04;
      sphereMesh.scale.setScalar(pulse);
      nodePoints.scale.setScalar(pulse);

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    // ── Resize Handler ───────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
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
