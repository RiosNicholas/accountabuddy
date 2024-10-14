import React, { ReactElement } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

interface PromptDisplayProps {
    prompt: string,
    response: string | ReactElement[]
}

export default function PromptDisplay(props:PromptDisplayProps) {
    const {prompt, response} = props;
    return (
        <Card className="flex-col m-4">
            <CardHeader>
                <CardTitle className="font-bold">{prompt}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="max-w-prose text-l">{response}</p>
            </CardContent>
        </Card>
    );
}