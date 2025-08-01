import { useEffect, useMemo, useState } from "react";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const customPalette = [
  "#ECFDF5", "#D0FAE5", "#A4F4CF", "#5EE9B5", "#31D492",
  "#37BC7D", "#2D9966", "#1F7A55", "#116045", "#034F3B", "#012C22",
];



export default function ParticlesBackground() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    })
  }, []);


  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -10,
        },
        particles: {
          number: {
            value: 75,
            density: {
              enable: true,
            },
          },
          color: {
            value: customPalette,
          },
          shape: {
            type: ["circle", "square", "triangle", "star", "line"]
          },
          polygon: {
            sides: 5,
          },
          star: {
            sides: 5,
          },
          opacity: {
            value: 0.7,
          },
          size: {
            value: { min: 0.5, max: 5 },
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: {
              default: "bounce",
            },
          },
          links: {
            enable: true,
            distance: 130,
            color: "#A4F4CF", // uno claro de tu paleta
            opacity: 0.6,      // más visible
            width: 1.2,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            resize: {
              delay: 0,
              enable: true
            }
          },
          modes: {
            repulse: {
              distance: 80,
              duration: 0.6,
              factor: 30,
              speed: 0.5,
              maxSpeed: 2,
              easing: "ease-out-quad",
            },
          },
        },
      }}
    />
  );
}
