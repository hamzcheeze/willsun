
import { Check } from "lucide-react"

export const RenderStepper = ({ step }: any) => {
    return (
        <div className="flex justify-center mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step > stepNumber
                        ? 'bg-blue-500'
                        : step === stepNumber
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                        }`}>
                        {step > stepNumber ? (
                            <Check className="w-5 h-5 text-white" />
                        ) : (
                            <span className="text-white">{stepNumber}</span>
                        )}
                    </div>
                    <span className="ml-2 mr-2 hidden 2xl:inline">
                        {stepNumber === 1 ? 'ผู้ร้อง' :
                            stepNumber === 2 ? 'ผู้ตาย' :
                                stepNumber === 3 ? 'ทรัพย์มรดก' : 'เครือญาติ'}
                    </span>
                    {stepNumber < 4 && (
                        <div className={`w-6 h-0.5 ${step > stepNumber ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    )}
                </div>
            ))}
        </div>
    );
};