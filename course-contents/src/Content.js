import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const renderParts = () =>
    parts.map(part => (
      <Part key={part.id} partName={part.name} exercise={part.exercises} />
    ));

  return <>{renderParts()}</>;
};

export default Content;
