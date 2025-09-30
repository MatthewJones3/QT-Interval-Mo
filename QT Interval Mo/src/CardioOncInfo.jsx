import "./CardioOncInfo.css";
import moffittLogo from "./assets/moffitt4.jpg";

function CardioOncInfo() {
  return (
    <div className="cardio-onc-info">
      <h2>Cardio-Oncology Resources</h2>
      <p>Please visit our website at:</p>
      <ul className="info-links">
        <li>
          <a
            href="https://www.moffitt.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.Moffitt.org
          </a>
        </li>
      </ul>
      <img src={moffittLogo} alt="Moffitt Cancer Center Logo" />
    </div>
  );
}

export default CardioOncInfo;
