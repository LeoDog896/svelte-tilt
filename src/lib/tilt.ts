export interface TiltSettings {
  scale: number;
	/** Max tilt rotation (in degrees) */
  max: number;
  reverse: boolean;
  strength: number;
  /** The transition time in MS. */
  transition: number;
  xAxis: boolean;
  yAxis: boolean;
  /** Whether when the mouse leaves the box should recover. */
  recovery: boolean;
	/** The persepective number. Default is 1000px */
	perspective: string;
	easing: string;
}

export type UserFacingTiltSettings = Partial<TiltSettings>

const defaultSettings: TiltSettings = {
	scale: 1, max: 15, reverse: false, strength: 1,
	transition: 300, xAxis: true, yAxis: true, recovery: true,
	perspective: "1000px", easing: "cubic-bezier(.03,.98,.52,.99)"
 };

export default function tilt(node: HTMLElement, settingsObj?: UserFacingTiltSettings) {	
	let settings: TiltSettings = { ...defaultSettings, ...settingsObj };
	
	function onMouseMove(e: MouseEvent) {
		const { width, height, left, top } = node.getBoundingClientRect();
		const percentageX = Math.min(Math.max((e.clientX - left) / width, 0), 1);
		const percentageY = Math.min(Math.max((e.clientY - top) / height,  0), 1);
		
		const twiceMax = settings.max * 2;
		const reverse = settings.reverse ? 1 : -1;

		const tiltX = (settings.xAxis ? settings.max - (percentageY * twiceMax) : 0) * reverse * settings.strength;
    const tiltY = (settings.yAxis ? (percentageX * twiceMax) - settings.max : 0) * reverse * settings.strength;
		
		node.style.transform = `perspective(${settings.perspective}) `+
      `rotateX(${tiltX}deg) ` +
      `rotateY(${tiltY}deg) ` +
      `scale3d(${Array(3).fill(settings.scale).join(', ')})`;

		node.dispatchEvent(new CustomEvent("tilt", { detail: { percentageX, percentageY, tiltX, tiltY } }));
	}
	
	let transitionId: NodeJS.Timeout;
	function smoothTransition() {
		clearTimeout(transitionId);
		node.style.transition = `${settings.transition}ms ${settings.easing}`;
		transitionId = setTimeout(() => node.style.transition = '0s', settings.transition);
	}
	
	function onMouseLeave() {
    if (!settings.recovery) return;
		smoothTransition();
		node.style.transform = `perspective(${settings.perspective}) `+
      `rotateX(0deg) ` +
      `rotateY(0deg) ` +
      `scale3d(1, 1, 1)`;
	}
	
	function onMouseEnter() {
		smoothTransition();
		node.style.willChange = "transform";
	}

	node.style.transformStyle = "preserve-3d";
	
	node.addEventListener('mousemove', onMouseMove);
	node.addEventListener('mouseleave', onMouseLeave);
	node.addEventListener('mouseenter', onMouseEnter);
	
	return {
		destroy() {
			node.removeEventListener('mousemove', onMouseMove);
			node.removeEventListener('mouseleave', onMouseLeave);
			node.removeEventListener('mouseleave', onMouseEnter);
		},
		update(settingsObj: TiltSettings) {
			settings = { ...defaultSettings, ...settingsObj };
		}
	}
}