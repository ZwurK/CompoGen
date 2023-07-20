export default function useIframeSize() {
    const iframeSize = (selectedScreenSize) => {
      switch (selectedScreenSize) {
        case "xs":
          return { width: "320px", height: "100%" };
        case "sm":
          return { width: "640px", height: "100%" };
        case "md":
          return { width: "768px", height: "100%" };
        case "lg":
          return { width: "1024px", height: "100%" };
        case "xl":
          return { width: "1280px", height: "100%" };
        default:
          return { width: "100%", height: "100%" };
      }
    };
    
    return { iframeSize };
  }
  