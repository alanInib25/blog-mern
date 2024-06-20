//react-loader-spinner
import { RotatingLines } from "react-loader-spinner";
//css
import "./loader.css";

function Loader(){
  return (
    <div className="loader">
      <RotatingLines
        visible={true}
        height="46"
        width="46"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass="spinner"
        strokeColor="red"
      />
    </div>
  );
}

export default Loader;