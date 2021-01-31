import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="f2 fw4 washed-yellow">{`${name}, your current FRWA search count is...`}</div>
      <div className="f1 washed-yellow">{`${entries}`}</div>
    </div>
  );
};

export default Rank;
