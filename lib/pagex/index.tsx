import {
  AnimatePresence,
  MotionValue,
  useMotionValue,
  usePresence,
  useTime,
  useTransform,
} from "framer-motion";
import { clamp } from "popmotion";
import {
  Children,
  ComponentType,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { matchRoutes, RouteObject } from "react-router";
import { PageManagerState, usePageManager } from "./manager";
import { HTMLMotionProps, motion, useSpring } from "framer-motion";
import {
  keyframes as animation,
  SpringOptions,
  Animation as PopmotionAnimation,
} from "popmotion";
// @ts-ignore
import throttle from "lodash.throttle";
import { useRouter } from "next/router";

interface RouteProps {
  path: string;
  component?: ComponentType<any>;
  enterDuration?: number;
  exitDuration?: number;
}

export const Route = ({
  path,
  component,
  enterDuration,
  exitDuration,
  children,
}: any) => {
  return children;
};

const PageManagerContext = createContext<any>(null);

interface RouterProps {
  component: ComponentType<any> | null;
  children: any;
}

const getRouteKey = (route: any) => {
  return route.path;
};

interface UseDurationOptions {
  onComplete?: () => void;
  onChange?: (val: any) => void;
}

const useDuration = (
  duration: number,
  { onComplete, onChange }: UseDurationOptions = {}
) => {
  const clock = useTime();
  const progress = useTransform(clock, (time) => clamp(0, 1, time / duration));

  useEffect(() => {
    return progress.onChange((val) => {
      onChange?.(val);
      if (val >= 1) {
        clock.stop();
        onComplete?.();
      }
    });
  }, []);

  return progress;
};

const UnmountController = ({ duration, onComplete, onChange }: any) => {
  useDuration(duration, {
    onChange,
    onComplete: () => {
      console.log("exited");
      onComplete?.();
    },
  });

  return null;
};

interface PageApi {
  enterProgress: MotionValue<number>;
  exitProgress: MotionValue<number | undefined>;
}

const PageContext = createContext<PageApi | null>(null);

export const usePage = () => {
  const page = useContext(PageContext);
  if (!page) {
    throw new Error("usePage can only be used within a Page");
  }
  return page;
};

const Page = ({
  route,
  children,
  enterDuration = 700,
  exitDuration = 700,
}: any) => {
  const manager = useContext(PageManagerContext);
  const [isPresent, markSafeToRemove] = usePresence();
  const enterProgress = useDuration(enterDuration, {
    onComplete: () => {
      console.log("entered");
      manager?.dispatch({
        type: "ENTER_COMPLETE",
      });
    },
  });
  const exitProgress = useMotionValue<number | undefined>(undefined);

  return (
    <PageContext.Provider value={{ enterProgress, exitProgress }}>
      {!isPresent && (
        <UnmountController
          duration={exitDuration}
          onChange={(val: number) => {
            exitProgress.set(val);
          }}
          onComplete={() => {
            console.log("exited");
            manager?.dispatch({
              type: "EXIT_COMPLETE",
            });
            markSafeToRemove?.();
          }}
        />
      )}
      {children}
    </PageContext.Provider>
  );
};

export const Router = ({ component, children }: RouterProps) => {
  const router = useRouter();
  const childrenByRouteKey: any = {};
  Children.forEach(children, (child) => {
    if (child?.props.path) {
      childrenByRouteKey[getRouteKey(child.props)] = child;
    }
  });
  const routes: RouteObject[] = [];
  Children.forEach(children, (child) => {
    if (child?.props.path) {
      routes.push({
        path: child.props.path,
        caseSensitive: child.props.caseSensitive,
        element: child.props.children,
      });
    }
  });
  const match = matchRoutes(routes, router.asPath)?.[0];

  const manager = usePageManager();

  useEffect(() => {
    // Disables jump to top on route transition
    window.history.scrollRestoration = "manual";

    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });

    const handlers = {
      start: (path: string) => {
        manager.dispatch({
          type: "ROUTE_CHANGE",
          route: match?.route.path,
          component: null,
        });
      },
    };
    router.events.on("routeChangeStart", handlers.start);

    return () => {
      router.events.off("routeChangeStart", handlers.start);
    };
  }, []);

  useEffect(() => {
    if (match?.route.path) {
      manager.dispatch({
        type: "ROUTE_CHANGE",
        route: match?.route.path,
        component,
      });
    }
  }, [match?.route.path, component]);

  // console.log(JSON.stringify(manager.state.context, null, 2));

  return (
    <PageManagerContext.Provider value={manager}>
      <AnimatePresence>
        {manager.state.matches("stationary") &&
          manager.state.context.current &&
          (() => {
            const Comp = manager.state.context.current?.component;
            const child =
              childrenByRouteKey[manager.state.context.current?.route!];

            return (
              <Page
                key={manager.state.context.current?.route}
                route={manager.state.context.current?.route}
                enterDuration={child?.props.enterDuration}
                exitDuration={child?.props.exitDuration}
              >
                {Comp && <Comp />}
              </Page>
            );
          })()}
        {manager.state.matches("transitioning.entering") &&
          (() => {
            const Comp = manager.state.context.next?.component;
            const child =
              childrenByRouteKey[manager.state.context.next?.route!];

            return (
              <Page
                key={manager.state.context.next?.route}
                route={manager.state.context.next?.route}
                enterDuration={child?.props?.enterDuration}
                exitDuration={child?.props?.exitDuration}
              >
                {Comp && <Comp />}
              </Page>
            );
          })()}
      </AnimatePresence>
    </PageManagerContext.Provider>
  );
};

// ITEM.TSX
export type StyleObj = {
  scale?: number | string;
  scaleX?: number | string;
  scaleY?: number | string;
  scaleZ?: number | string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  skewX?: number | string;
  skewY?: number | string;
  opacity?: number | string;
};

export type KeyframesContext = {
  data?: any;
};

export type KeyframesObj = Record<number, StyleObj>;
export type KeyframesFn = (context: KeyframesContext) => KeyframesObj;
export type Keyframes = KeyframesFn | KeyframesObj;
export type KeyframesMap = Map<number, StyleObj>;

interface Animation {
  get(progress: number): any;
}

const getAnimationForProperty = (
  property: string,
  keyframesMap: KeyframesMap
): Animation | null => {
  const values: any[] = [];
  const offsets: number[] = [];
  for (const [offset, keyframe] of keyframesMap.entries()) {
    if (property in keyframe) {
      // @ts-ignore
      values.push(keyframe[property]);
      offsets.push(offset);
    }
  }
  if (!values.length) {
    return null;
  }
  let anim: PopmotionAnimation<string | number>;
  if (values.length === 1) {
    // needs at least two values to work as expected
    anim = animation({
      to: [values[0], values[0]],
      offset: [offsets[0], offsets[0] + 1],
      duration: 1,
    });
  } else {
    anim = animation({
      to: values,
      offset: offsets,
      duration: 1,
    });
  }
  return {
    get(progress: number) {
      return anim.next(progress).value;
    },
  };
};

const getKeyframesContext = (data: any): KeyframesContext => {
  return {
    data,
  };
};

const processKeyframes = (keyframes: Keyframes, data: any) => {
  let keyframesObj: KeyframesObj;
  if (typeof keyframes === "function") {
    keyframesObj = keyframes(getKeyframesContext(data));
  } else {
    keyframesObj = keyframes;
  }
  const offsets = Object.keys(keyframesObj).sort(
    (a, b) => Number(a) - Number(b)
  );
  const map = new Map<number, StyleObj>();
  offsets.forEach((offset) => {
    // @ts-ignore
    map.set(Number(offset), keyframesObj[offset]);
  });
  return map;
};

export type SpringConfigs = {
  scale?: SpringOptions;
  scaleX?: SpringOptions;
  scaleY?: SpringOptions;
  scaleZ?: SpringOptions;
  translateX?: SpringOptions;
  translateY?: SpringOptions;
  translateZ?: SpringOptions;
  rotateX?: SpringOptions;
  rotateY?: SpringOptions;
  rotateZ?: SpringOptions;
  skewX?: SpringOptions;
  skewY?: SpringOptions;
  opacity?: SpringOptions;
};

const DEFAULT_SPRING_CONFIGS: SpringConfigs = {
  translateX: {
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  translateY: {
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  translateZ: {
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  scale: {
    restDelta: 0.000000001,
    restSpeed: 0.000000001,
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  scaleX: {
    restDelta: 0.000000001,
    restSpeed: 0.000000001,
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  scaleY: {
    restDelta: 0.000000001,
    restSpeed: 0.000000001,
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  scaleZ: {
    restDelta: 0.000000001,
    restSpeed: 0.000000001,
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  skewX: {
    mass: 0.1,
    damping: 20,
  },
  skewY: {
    mass: 0.1,
    damping: 20,
  },
  rotateX: {
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  rotateY: {
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  rotateZ: {
    mass: 0.05,
    damping: 7.5,
    stiffness: 100,
  },
  opacity: {
    mass: 0.1,
    damping: 20,
  },
};

export const Item = ({
  keyframes = {},
  springConfigs,
  data,
  ...otherProps
}: any) => {
  if (!keyframes.enter) {
    keyframes.enter = {};
  }
  if (!keyframes.exit) {
    keyframes.exit = {};
  }

  const { enterProgress, exitProgress } = usePage();

  const enterKeyframes = useMemo(() => {
    return processKeyframes(keyframes.enter, data);
  }, [keyframes.enter, JSON.stringify(data)]);

  const enterAnimations = useMemo(() => {
    return {
      translateX: getAnimationForProperty("translateX", enterKeyframes),
      translateY: getAnimationForProperty("translateY", enterKeyframes),
      translateZ: getAnimationForProperty("translateZ", enterKeyframes),
      scale: getAnimationForProperty("scale", enterKeyframes),
      scaleX: getAnimationForProperty("scaleX", enterKeyframes),
      scaleY: getAnimationForProperty("scaleY", enterKeyframes),
      scaleZ: getAnimationForProperty("scaleZ", enterKeyframes),
      skewX: getAnimationForProperty("skewX", enterKeyframes),
      skewY: getAnimationForProperty("skewY", enterKeyframes),
      rotateX: getAnimationForProperty("rotateX", enterKeyframes),
      rotateY: getAnimationForProperty("rotateY", enterKeyframes),
      rotateZ: getAnimationForProperty("rotateZ", enterKeyframes),
      opacity: getAnimationForProperty("opacity", enterKeyframes),
    };
  }, [enterKeyframes]);

  const exitKeyframes = useMemo(() => {
    return processKeyframes(keyframes.exit, data);
  }, [keyframes.exit, JSON.stringify(data)]);

  const exitAnimations = useMemo(() => {
    return {
      translateX: getAnimationForProperty("translateX", exitKeyframes),
      translateY: getAnimationForProperty("translateY", exitKeyframes),
      translateZ: getAnimationForProperty("translateZ", exitKeyframes),
      scale: getAnimationForProperty("scale", exitKeyframes),
      scaleX: getAnimationForProperty("scaleX", exitKeyframes),
      scaleY: getAnimationForProperty("scaleY", exitKeyframes),
      scaleZ: getAnimationForProperty("scaleZ", exitKeyframes),
      skewX: getAnimationForProperty("skewX", exitKeyframes),
      skewY: getAnimationForProperty("skewY", exitKeyframes),
      rotateX: getAnimationForProperty("rotateX", exitKeyframes),
      rotateY: getAnimationForProperty("rotateY", exitKeyframes),
      rotateZ: getAnimationForProperty("rotateZ", exitKeyframes),
      opacity: getAnimationForProperty("opacity", exitKeyframes),
    };
  }, [exitKeyframes]);

  const mergedSpringConfigs = {
    ...DEFAULT_SPRING_CONFIGS,
    ...springConfigs,
  };

  const initialAnimations =
    enterKeyframes.size > 0 ? enterAnimations : exitAnimations;

  const springs = {
    translateX: useSpring(
      initialAnimations.translateX?.get(0) ?? "0",
      mergedSpringConfigs.translateX
    ),
    translateY: useSpring(
      initialAnimations.translateY?.get(0) ?? "0",
      mergedSpringConfigs.translateY
    ),
    translateZ: useSpring(
      initialAnimations.translateZ?.get(0) ?? "0",
      mergedSpringConfigs.translateZ
    ),
    scale: useSpring(
      initialAnimations.scale?.get(0) ?? "1",
      mergedSpringConfigs.scale
    ),
    scaleX: useSpring(
      initialAnimations.scaleX?.get(0) ?? "1",
      mergedSpringConfigs.scaleX
    ),
    scaleY: useSpring(
      initialAnimations.scaleY?.get(0) ?? "1",
      mergedSpringConfigs.scaleY
    ),
    scaleZ: useSpring(
      initialAnimations.scaleZ?.get(0) ?? "1",
      mergedSpringConfigs.scaleZ
    ),
    skewX: useSpring(
      initialAnimations.skewX?.get(0) ?? "0",
      mergedSpringConfigs.skewX
    ),
    skewY: useSpring(
      initialAnimations.skewY?.get(0) ?? "0",
      mergedSpringConfigs.skewY
    ),
    rotateX: useSpring(
      initialAnimations.rotateX?.get(0) ?? "0",
      mergedSpringConfigs.rotateX
    ),
    rotateY: useSpring(
      initialAnimations.rotateY?.get(0) ?? "0",
      mergedSpringConfigs.rotateY
    ),
    rotateZ: useSpring(
      initialAnimations.rotateZ?.get(0) ?? "0",
      mergedSpringConfigs.rotateZ
    ),
    opacity: useSpring(
      initialAnimations.opacity?.get(0) ?? "1",
      mergedSpringConfigs.opacity
    ),
  };

  useEffect(() => {
    const updateSprings = throttle(
      (progress: number, animations: any) => {
        springs.translateX.set(animations.translateX?.get(progress) ?? "0");
        springs.translateY.set(animations.translateY?.get(progress) ?? "0");
        springs.translateZ.set(animations.translateZ?.get(progress) ?? "0");
        springs.scale.set(animations.scale?.get(progress) ?? "1");
        springs.scaleX.set(animations.scaleX?.get(progress) ?? "1");
        springs.scaleY.set(animations.scaleY?.get(progress) ?? "1");
        springs.scaleZ.set(animations.scaleZ?.get(progress) ?? "1");
        springs.skewX.set(animations.skewX?.get(progress) ?? "0");
        springs.skewY.set(animations.skewY?.get(progress) ?? "0");
        springs.rotateX.set(animations.rotateX?.get(progress) ?? "0");
        springs.rotateY.set(animations.rotateY?.get(progress) ?? "0");
        springs.rotateZ.set(animations.rotateZ?.get(progress) ?? "0");
        springs.opacity.set(animations.opacity?.get(progress) ?? "1");
      },
      90,
      { leading: true, trailing: true }
    );

    const unsubscribers: Function[] = [];

    if (enterKeyframes.size > 0) {
      unsubscribers.push(
        enterProgress.onChange((val) => {
          updateSprings(val, enterAnimations);
        })
      );
    }
    if (exitKeyframes.size > 0) {
      unsubscribers.push(
        exitProgress.onChange((val) => {
          updateSprings(val, exitAnimations);
        })
      );
    }
    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [enterAnimations, exitAnimations, enterProgress, exitProgress]);

  return (
    <motion.div
      {...otherProps}
      style={{
        ...otherProps.style,
        translateX: springs.translateX,
        translateY: springs.translateY,
        translateZ: springs.translateZ,
        scale: springs.scale,
        scaleX: springs.scaleX,
        scaleY: springs.scaleY,
        scaleZ: springs.scaleZ,
        skewX: springs.skewX,
        skewY: springs.skewY,
        rotateX: springs.rotateX,
        rotateY: springs.rotateY,
        rotateZ: springs.rotateZ,
        opacity: springs.opacity,
      }}
    />
  );
};
