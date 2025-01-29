
import { forwardRef } from 'react';
import { RequestForm } from "@/components/request/front";
import { BackPage } from '@/components/request/back';

const Allpage = forwardRef<HTMLDivElement>((_props, ref) => {
    return (
        <div ref={ref}>
            <RequestForm />
            <br />
            <BackPage />
            <br />
            <BackPage />
        </div>
    );
});

Allpage.displayName = 'Allpage';
export default Allpage;
