const { createContext, useState } = require("react");

const ShowContext = createContext({
  show: true,
  setShow : () => {}
});

export default ShowContext;

export const ShowContextProvider = (props) => {
  const [show, setShow] = useState(false);

  const setShowHandler = () => {
    setShow(show => !show);
  }

  return (
    <ShowContext.Provider
      value={{
        show,
        setShow : setShowHandler
      }}
    >
      {props.children}
    </ShowContext.Provider>
  );
};
