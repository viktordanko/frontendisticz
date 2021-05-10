export const iconSvg = (id) => `
<span class="icon-svg icon-svg--${id}">
	<svg class="icon-svg__svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<use xlink:href="../img/bg/icons-svg.svg#icon-${id}" x="0" y="0" width="100%" height="100%"></use>
	</svg>
</span>
`;
