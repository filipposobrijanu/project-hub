"use client";

import React, { useState } from "react";
import { Layers, Zap, Shield } from "lucide-react";
import "./FeatureGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Card3DProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

function Card3D({ children, title, description }: Card3DProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    setRotate({ x: -(y / 15), y: x / 15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="glass-card threed-card-shit p-4 rounded-5 text-center flex flex-col items-center gap-2 transition-all duration-200 ease-out transform-gpu [transform-style:preserve-3d] group "
    >
      {/* Kept your original rounded-full wrapper with 3D layer pop */}
      <div className="rounded-full bg-white/10 transition-all duration-300 [transform:translateZ(40px)]">
        {children}
      </div>

      <h5 className="text-xl font-bold text-white transition-transform duration-300 [transform:translateZ(30px)]">
        {title}
      </h5>

      <small
        style={{ fontSize: "0.8em" }}
        className="text-white-50 transition-transform duration-300 [transform:translateZ(20px)]"
      >
        {description}
      </small>
    </div>
  );
}

export default function FeatureGrid() {
  return (
    <div className="mt-5 grid grid-cols-3 gap-4 max-w-5xl w-full">
      {/* Feature 1: Organization */}
      <Card3D
        title="Organization"
        description="Create projects and tasks with ease. All in one place."
      >
        <Layers
          style={{ width: "40px", height: "40px" }}
          className="text-white-50 mb-2 transition-colors group-hover:text-white"
        />
      </Card3D>

      {/* Feature 2: Speed */}
      <Card3D
        title="Speed"
        description="Instant updates, drag & drop (coming soon), and real-time collaboration."
      >
        <Zap
          style={{ width: "40px", height: "40px" }}
          className="text-white-50 mb-2 transition-colors group-hover:text-white"
        />
      </Card3D>

      {/* Feature 3: Safety */}
      <Card3D
        title="Safety"
        description="Google authentication and secure payments with Stripe."
      >
        <Shield
          style={{ width: "40px", height: "40px" }}
          className="text-white-50 mb-2 transition-colors group-hover:text-white"
        />
      </Card3D>
    </div>
  );
}
