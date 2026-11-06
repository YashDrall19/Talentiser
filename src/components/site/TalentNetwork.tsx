import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Browser-only, transparent brand sculpture. The office remains the hero backdrop. */
export function TalentNetwork() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};

    void import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return; // The underlying office photograph remains visible without WebGL.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0, 0);
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(0, 0, 13);
      const group = new THREE.Group();
      scene.add(group);

      // Resolve semantic CSS colors in the browser, including modern oklch values.
      const color = (token: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d");
        if (!ctx) return new THREE.Color();
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
      };
      const primary = new THREE.MeshPhysicalMaterial({ color: color("--primary"), metalness: 0.55, roughness: 0.24, clearcoat: 1 });
      const accent = new THREE.MeshPhysicalMaterial({ color: color("--accent"), metalness: 0.45, roughness: 0.3, clearcoat: 1 });
      const lineMaterial = new THREE.LineBasicMaterial({ color: color("--primary"), transparent: true, opacity: 0.25 });

      const letter = new THREE.Shape();
      letter.moveTo(-1.35, 1.4);
      letter.lineTo(1.35, 1.4);
      letter.lineTo(1.35, 0.72);
      letter.lineTo(0.38, 0.72);
      letter.lineTo(0.38, -1.4);
      letter.lineTo(-0.38, -1.4);
      letter.lineTo(-0.38, 0.72);
      letter.lineTo(-1.35, 0.72);
      letter.closePath();
      const letterGeometry = new THREE.ExtrudeGeometry(letter, { depth: 0.38, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.09, bevelThickness: 0.09 });
      letterGeometry.center();
      const emblem = new THREE.Mesh(letterGeometry, primary);
      group.add(emblem);

      const nodeGeometry = new THREE.OctahedronGeometry(0.19, 0);
      const nodes: InstanceType<typeof THREE.Mesh>[] = [];
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const node = new THREE.Mesh(nodeGeometry, i % 3 === 0 ? accent : primary);
        node.position.set(Math.cos(angle) * 2.75, Math.sin(angle) * 2.75, Math.sin(angle * 2) * 0.8);
        nodes.push(node);
        group.add(node);
        const points = [new THREE.Vector3(0, 0, 0), node.position.clone()];
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial));
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(nodes.map((node) => node.position));
      group.add(new THREE.LineLoop(orbitGeometry, lineMaterial));
      scene.add(new THREE.HemisphereLight(color("--background"), color("--primary"), 2.5));
      const light = new THREE.DirectionalLight(color("--background"), 4);
      light.position.set(4, 5, 7);
      scene.add(light);
      const rim = new THREE.DirectionalLight(color("--accent"), 3);
      rim.position.set(-4, 0, 3);
      scene.add(rim);

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.position.z = camera.aspect < 0.8 ? 17 : 13;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const sizeObserver = new ResizeObserver(resize);
      sizeObserver.observe(container);
      const themeObserver = new MutationObserver(() => {
        primary.color.copy(color("--primary"));
        accent.color.copy(color("--accent"));
        lineMaterial.color.copy(color("--primary"));
        renderer.render(scene, camera);
      });
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      let pointerX = 0;
      let pointerY = 0;
      const move = (event: PointerEvent) => {
        if (reduced || event.pointerType === "touch") return;
        const rect = container.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
        pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.25;
      };
      const reset = () => { pointerX = 0; pointerY = 0; };
      container.addEventListener("pointermove", move);
      container.addEventListener("pointerleave", reset);
      let visible = true;
      const visibility = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
      visibility.observe(container);
      group.rotation.set(0.08, -0.3, -0.08);
      resize();
      renderer.setAnimationLoop(reduced ? null : (time) => {
        if (!visible || document.hidden) return;
        group.rotation.y += (-0.3 + pointerX + Math.sin(time * 0.0003) * 0.14 - group.rotation.y) * 0.025;
        group.rotation.x += (0.08 + pointerY - group.rotation.x) * 0.025;
        group.position.y = Math.sin(time * 0.0008) * 0.12;
        for (const node of nodes) node.rotation.y = time * 0.00025;
        renderer.render(scene, camera);
      });
      cleanup = () => {
        renderer.setAnimationLoop(null);
        sizeObserver.disconnect();
        themeObserver.disconnect();
        visibility.disconnect();
        container.removeEventListener("pointermove", move);
        container.removeEventListener("pointerleave", reset);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Line) object.geometry.dispose();
        });
        primary.dispose(); accent.dispose(); lineMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, [reduced]);

  return <div ref={host} className="hero-network" aria-hidden="true" />;
}