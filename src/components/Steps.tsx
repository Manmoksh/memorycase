'use client'

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
const STEP=[
    {
        name:'Step 1: Upload image',
        description:'Choose an memory for your case',
        url:'/upload'
    },
    {
        name:'Step 2: Customise Design',
        description:'Personalize your case',
        url:'/design'
    },
    {
        name:'Step 3: Review & Confirm',
        description:'Review your final design',
        url:'/preview'
    }
]
const Steps = () => {

    const pathName=usePathname()

    return (
    <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-1 lg:border-r lg:border-gray-200">
        {
            STEP.map((step,i)=>{
                const isCurrent=pathName.endsWith(step.url)
                const isCompleted=STEP.slice(i+1).some((step)=>pathName.endsWith(step.url))
                const imgPath=`/step-${i+1}.png`

                return (<li key={step.name} className="overflow-hidden  lg:flex-1 relative">
                    <div>
                        <span className={cn("absolute left-0 top-0 w-1 h-full bg-zinc-400 lg:bottom-0 lg:top-auto lg:w-full lg:h-1",{
                            "bg-zinc-700":isCurrent,
                            "bg-primary":isCompleted,
                        })} aria-hidden='true'
                        />
                        <span className={cn(i !==0?'lg:pl-9 ':'','flex items-center px-6 py-4 text-sm font-medium' )}>
                            <span className="flex-shrink-0">
                                <img src={imgPath} className={cn('flex items-center justify-center h-20 w-20 object-contain',{
                                    'border-none':isCompleted,
                                    'border-zinc-700':isCurrent
                                }
                                )}/>
                            </span>

                            <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                                <span className={cn('text-sm text-zinc-700 font-semibold ',{
                                    'text-primary':isCompleted,
                                    'text-zinc-700':isCurrent
                                })}>{step.name}</span>
                                <span className="text-sm text-zinc-500">
                                    {step.description}
                                </span>
                            </span>
                        </span>
                        {/* seperator */}
                        {i !==0 ?<div className="absolute inset-0 hidden w-3 lg:block">
                            <svg
                            className="h-full w-full text-gray-300"
                            viewBox="0 0 12 82"
                            fill="none"
                            preserveAspectRatio="none"
                            >
                                <path
                                d="M0.5 0V1L10.5 41L0.5 51V82"
                                stroke="currentcolor"
                                vectorEffect='non-scaling-stroke'
                                />
                            </svg>
                        </div>:null}
                    </div>
                </li>)
            })
        }
    </ol>
  )
}

export default Steps