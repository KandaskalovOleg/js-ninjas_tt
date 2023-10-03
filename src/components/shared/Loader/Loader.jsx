import { TailSpin } from "react-loader-spinner";

export const Loader = () => {
  
  return (
    <div className="loader-container">
      <TailSpin
        height="100"
        width="100"
        color="#B21300"
        ariaLabel="tail-spin-loading"
        radius="0"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}