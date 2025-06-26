import Promo from "./Promo";
import promo_data from '../assets/promo.json'; // Adjusted relative path if needed


const Featured = () => {
    return (
      <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        {promo_data.map((promo) => (
          <Promo key={promo.id} data={promo} />
        ))}
      </div>
    );
  };

  export default Featured;
