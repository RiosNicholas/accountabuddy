import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

interface PromptDisplayProps {
    prompt: string,
    response: string
}

export default function PromptDisplay(props:PromptDisplayProps) {
    const {prompt, response} = props;
    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle className="font-bold">{prompt}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="max-w-prose text-l">{response}</p>
            </CardContent>
        </Card>
    );
}