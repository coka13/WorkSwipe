import "./Waves.css"
const Waves = ({color}) => (
  <div className="svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="none"
    viewBox="0 24 150 28"

  >
    <defs>
      <path
        id="a"
        d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
      />
    </defs>
    <g fill={color} className="waves">
      <use xlinkHref="#a" x={50} fillOpacity={0.2} />
      <use xlinkHref="#a" x={50} y={3} fillOpacity={0.5} />
      <use xlinkHref="#a" x={50} y={6} fillOpacity={0.9} />
    </g>
  </div>
)
export default Waves