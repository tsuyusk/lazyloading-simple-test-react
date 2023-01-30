import { useCallback, useEffect, useRef, useState } from "react";

const Fallback = () => {
  return (
    <div className="h-[100px] aspect-square bg-transparent"/>
  )
}

type ReturnType = (props: any) => JSX.Element;

export function LoadOnSee(importedElement: any): ReturnType {

  return (props: any) => {
    const [Component, setComponent] = useState<any>(Fallback);
    const wrapperRef = useRef<any>();

    const callback = useCallback(() => {
      importedElement()
      .then((Module: any) => {
          const Element = (
            <Module.default {...props} />
          )

          setComponent(Element);
        });
    }, []);
  
    useEffect(() => {
      const observer = new IntersectionObserver((changes) => {
        changes.forEach(change => {
          if (change.intersectionRatio >= 0.25) {
            callback();
          }
        })
      });

      observer.observe(wrapperRef.current);

      return () => {
        observer.unobserve(wrapperRef.current);
      }
    }, [callback]);
  
    return (
      <div ref={wrapperRef}>
        {Component}
      </div>
    )
  }
}