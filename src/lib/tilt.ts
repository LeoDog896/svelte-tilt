export interface TiltSettings {
  scale: number;
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
}

export type UserFacingTiltSettings = Partial<TiltSettings>

const defaultSettings: TiltSettings = { scale: 1, max: 15, reverse: false, strength: 1, transition: 300, xAxis: true, yAxis: true, recovery: true, perspective: "1000px" };

export default function tilt(node: HTMLElement, settingsObj?: UserFacingTiltSettings) {	
	const { width, height, left, top } = node.getBoundingClientRect();
	let settings: TiltSettings = { ...defaultSettings, ...settingsObj };
	
	function onMouseMove(e: MouseEvent) {
		const percX = (e.clientX - left) / width;
		const percY = (e.clientY - top) / height;
		
		const { max, scale } = settings;
		const twiceMax = max * 2;
		const tiltX = defaultSettings.xAxis ? max - percY * twiceMax : 0;
    const tiltY = defaultSettings.yAxis ? percX * twiceMax - max : 0;
		
		node.style.transform = `perspective(${defaultSettings.perspective}) `+
      `rotateX(${(settings.reverse ? 1 : -1) * tiltX * settings.strength}deg) ` +
      `rotateY(${(settings.reverse ? 1 : -1) * tiltY * settings.strength}deg) ` +
      `scale3d(${Array(3).fill(scale).join(', ')})`;
	}
	
	let transitionId: NodeJS.Timeout;
	function smoothTransition() {
		clearTimeout(transitionId);
		node.style.transition = `${settings.transition}ms`;
		transitionId = setTimeout(() => node.style.transition = '0s', settings.transition);
	}
	
	function onMouseLeave() {
    if (!settings.recovery) return;
		smoothTransition();
		node.style.transform = `perspective(${1000}px) `+
      `rotateX(0deg) ` +
      `rotateY(0deg) ` +
      `scale3d(1, 1, 1)`;
	}
	
	function onMouseEnter() {
		smoothTransition();
		node.style.willChange = "transform";
	}
	
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