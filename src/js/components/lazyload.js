export const init = () => {

	const items = document.querySelectorAll('[data-src], [data-srcset]');
	// Check if IntersectionObserver is supported
	if ('IntersectionObserver' in window &&
	'IntersectionObserverEntry' in window &&
	'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
		const options = {
			rootMargin: '100px',
			threshold: 0.25,
		};
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting === false) return;
				entry.target.classList.add('inview');
				entry.target.src = entry.target.dataset.src;
				observer.unobserve(entry.target);
			});
		}, options);

		[...items].forEach((img) => {
			observer.observe(img);
		});

	} else {
		[...items].forEach((img) => {
			img.classList.add('inview');
			img.src = img.dataset.src;
		});
	}
};

