import Button from '@/components/ui/Button';
import { useTasks } from '@/context/taskContext';
import { cn } from '@/lib/utils';
import React from 'react';
function Filters() {
    const { priority, setPriority } = useTasks();
    const priorities = ["All", "Low", "Medium", "High"];
    const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="relative flex w-full bg-muted rounded-xl p-1 overflow-hidden transition-[transform] duration-300 ease-out">
    {/* Active indicator */}
        <span 
            className="absolute top-1 bottom-1 left-1 rounded-lg bg-primary transition-all duration-300"
            style={{
                width: `calc(100% / ${priorities.length} - 2px)`,
                transform: `translateX(${activeIndex * 100}%)`,
            // className='absolute top-1 left-1 h-[calc(100%-8px)] bg-primary rounded-md shadow-sm transition-all duration-300'
            // style={{
            //     width: 'calc(100% /4 - 1px)',
            //     transform: `translate(calc(${activeIndex} * 100%))`,
            //     // transition: 'transform 300ms cubic-bezier(.95, .03, 1, 1)',
            // }}
            }}
        >
        </span>

        {priorities.map((priority, i) => (
            <Button
                type="button"
                variant="ghost"
                key={i}
                // className={cn("px-3 py-1.5 rounded-lg text-sm whitespace-nowrap bg-muted text-muted-foreground hover:bg-primary hover:text-white transition",
                //     activeIndex === i ? "text-primary-foreground" : "text-muted-foreground"
                // )}
                className={cn(
                    "relative z-10 flex-1 text-center text-xs sm:text-sm font-medium py-2 rounded-lg transition-all duration-200",
                    activeIndex === i
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => {
                    setActiveIndex(i);
                    setPriority(priority.toLowerCase());
                }}
            >
                {priority}
            </Button>
        ))}
    </div>
  )
}

export default Filters;

