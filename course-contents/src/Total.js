import React from "react";

const Total = ({ parts }) => {
  const calcTotal = () => parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return <h4>Total of {calcTotal()} exercises</h4>;
};

export default Total;
