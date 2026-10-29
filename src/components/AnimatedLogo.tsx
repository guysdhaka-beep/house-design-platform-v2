// ==========================================
// AnimatedLogo.tsx
// Premium House Animation
// Part 1
// ==========================================

import "./AnimatedLogo.css";

export default function AnimatedLogo() {
  return (
    <div className="logo-scene">

      {/* Sky */}

      <div className="sky">

        <div className="sun"></div>

        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>

      </div>

      {/* Birds */}

      <div className="bird bird1">⌒⌒</div>
      <div className="bird bird2">⌒⌒</div>

      {/* Ground */}

      <div className="ground"></div>

      {/* Road */}

      <div className="road">

        <div className="road-line line1"></div>
        <div className="road-line line2"></div>
        <div className="road-line line3"></div>
        <div className="road-line line4"></div>

      </div>

      {/* Trees */}

      <div className="tree tree-left">

        <div className="leaf leaf-big"></div>
        <div className="leaf leaf-small"></div>

        <div className="trunk"></div>

      </div>

      <div className="tree tree-right">

        <div className="leaf leaf-big"></div>
        <div className="leaf leaf-small"></div>

        <div className="trunk"></div>

      </div>

      {/* ===========================
          House
      =========================== */}

      <div className="house">

        {/* Roof */}

        <div className="roof">

          <div className="roof-shadow"></div>

        </div>

        {/* Wall */}

        <div className="wall">

          <div className="window left">
            <div className="glass"></div>
          </div>

          <div className="window right">
            <div className="glass"></div>
          </div>

          <div className="door">

            <div className="door-knob"></div>

          </div>

        </div>

        {/* Chimney */}

        <div className="chimney"></div>

      </div>

      {/* ===========================
          Car
      =========================== */}

      <div className="car">

        <div className="car-top"></div>

        <div className="car-body"></div>

        <div className="wheel wheel-left"></div>

        <div className="wheel wheel-right"></div>

      </div>

    </div>
  );
}