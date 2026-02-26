import React from 'react'
import { Spinner } from "@heroui/react";

export default function Loader() {
    return (
        <section className="py-12">
            <div className='flex justify-center items-center w-full max-w-100 md:max-w-1/2 mx-auto space-y-4'>
                <Spinner classNames={{ label: "text-foreground mt-4" }} label="loading" variant="wave" />
            </div>
        </section>
    )
}
