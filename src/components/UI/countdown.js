import React, { useState, useEffect } from "react";
import "../../css/styles/style.css";

const Countdown = ({ endDate }) => {
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

    function getTimeLeft(endDate) {
        const totalTimeLeft = endDate - new Date();
        // const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
        const h = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
        const m = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
        const s = Math.floor((totalTimeLeft / 1000) % 60);
        return { h, m, s };
    };

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft(endDate));
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
        <div>
            {Object.entries(timeLeft).map((el) => {
                const label = el[0];
                const value = el[1];
                return (
                    <div className='box' key={label}>
                        <span>{value}</span>
                        <span>{label}</span>
                    </div>
                );
            })}
        </div>
	);
};

export default Countdown;