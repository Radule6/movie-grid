import React, { useEffect, useRef } from "react";
import useStore from "@stores/useStore";
import GridContainer from "@features/grid/components/GridContainer";

const App = () => {
  const containerRef = useRef(null);
  const setGridData = useStore((state) => state.setGridData);

  useEffect(() => {
    const dynamicGridData = [
      ["A", "B", "C", "D", "E", "F", "G", "H"],
      ["I", "J", "K", "L", "M"],
      ["N", "O", "P", "Q", "R", "S", "T"],
      ["U", "V", "W", "X", "Y", "Z"],
      ["1", "2", "3"],
    ];
    
    setGridData(dynamicGridData);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <GridContainer />
  );
};

export default App;
