import { Stack } from "@mantine/core"
import { FormEvent, ReactNode } from "react"
import classes from './AuthFromContainer.module.css'

type Props = {
    children: ReactNode,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function AuthFormContainer({ children, handleSubmit }: Props) {
    return (
        <Stack className={classes.root}>
            <form
                className={classes.form}
                onSubmit={handleSubmit}
            >
                {children}
            </form>
        </Stack>
    )
}