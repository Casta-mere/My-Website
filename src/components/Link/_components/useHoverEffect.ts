import { useRef, useState } from "react";

interface UseHoverEffectReturn {
  hover: boolean;
  leaving: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * @param enterDelay 鼠标进入后延迟显示的时间（毫秒）
 * @param leaveDelay 鼠标离开后延迟隐藏的时间（毫秒）
 * @param leavingDelay 设置 leaving 状态的延迟时间（毫秒）
 */
const useHoverEffect = (
  enterDelay: number = 500,
  leaveDelay: number = 300,
  leavingDelay: number = 350
): UseHoverEffectReturn => {
  const [hover, setHover] = useState(false);
  const [leaving, setLeaving] = useState(true);
  const timeoutId = useRef<number | null>(null);

  const onMouseEnter = () => {
    setHover(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = window.setTimeout(() => {
      timeoutId.current = null;
      setLeaving(false);
    }, enterDelay);
  };

  const onMouseLeave = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = window.setTimeout(() => {
        setHover(false);
        setLeaving(false);
      }, leaveDelay);
      window.setTimeout(() => {
        setLeaving(true);
      }, leavingDelay);
    } else {
      setHover(false);
      setLeaving(true);
    }
  };

  return {
    hover,
    leaving,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useHoverEffect;
