/* eslint-disable no-use-before-define */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: { "0": "#fff", "1.0": "#3cff64" },
	shadowBlur: 5,
});

const TopBarProgressByLocation = () => {
	const [progress, setProgress] = useState(false);
	const [previousLocation, setPreviousLocation] = useState("");
	const location = useLocation();

	useEffect(() => {
		setProgress(true);
		setPreviousLocation(location.pathname);
		preventInfiniteProgressBar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	useEffect(() => {
		setProgress(false);
	}, [previousLocation]);

	// TODO: add event listener to stop load bar when page is loader
	// useEffect(() => {
	// 	const disableTopBar = () => {
	// 		setProgress(false);
	// 	};

	// 	document.addEventListener("pageLoaded", disableTopBar);

	// 	return () => {
	// 		document.removeEventListener("pageLoaded", disableTopBar);
	// 	};
	// }, []);

	const preventInfiniteProgressBar = () => {
		const hasClickedOnALinkToTheCurrentPage = location.pathname === previousLocation;
		if (hasClickedOnALinkToTheCurrentPage) {
			setPreviousLocation("");
			// setProgress(false);
		}
	};

	if (!progress) {
		return <></>;
	}

	return <TopBarProgress />;
};

export default TopBarProgressByLocation;
