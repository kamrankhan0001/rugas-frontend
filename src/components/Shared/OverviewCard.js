import React from 'react';

const OverviewCard = ({ title, count }) => {
    return (
        <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-2xl">{count}</p>
        </div>
    );
};

export default OverviewCard;
