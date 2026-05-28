import { useId } from "react";

import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  cx?: any;
  cy?: any;
  cr?: any;
  className?: string;
  [key: string]: any;
}
export function DotPattern({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 0.5,
  cr = 0.5,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-slate-500/50 md:fill-slate-500/70",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

export default DotPattern;



// demo
// "use client";

// import DotPattern from "@/components/ui/dot-pattern-1";

// export function Quote() {
//   return (
//     <>
//       <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-20 xl:px-0">
//         <div className="relative flex flex-col items-center border border-red-500">
//           <DotPattern width={5} height={5} />

//           <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-red-500 text-white" />
//           <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-red-500 text-white" />
//           <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-red-500 text-white" />
//           <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-red-500 text-white" />

//           <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-20">
//             <p className="md:text-md text-xs text-red-500 lg:text-lg xl:text-2xl">
//               I believe
//             </p>
//             <div className="text-2xl tracking-tighter md:text-5xl lg:text-7xl xl:text-8xl">
//               <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
//                 <h1 className="font-semibold">"Design should be</h1>
//                 <p className="font-thin">easy to</p>
//               </div>
//               <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
//                 <p className="font-thin">understand</p>
//                 <h1 className="font-semibold">because</h1>
//                 <p className="font-thin">simple</p>
//               </div>
//               <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
//                 <p className="font-thin">ideas</p>
//                 <h1 className="font-semibold">are quicker to</h1>
//               </div>
//               <h1 className="font-semibold">grasp..."</h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
