import React, { createContext, useState, useContext, ReactNode } from 'react'
import Alert from 'react-bootstrap/Alert'

type AlertState = {
    message: string,
    visible: boolean
}

interface AlertContextType {
    showAlert: (message: string, timeout?: number) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alert, setAlert] = useState<AlertState>({ message: "", visible: false })

    const showAlert = (message: string, timeout: number = 3000) => {
        setAlert({ message, visible: true })
        setTimeout(() => {
            setAlert({ message: "", visible: false })
        }, timeout)
    }

    return (
        <AlertContext.Provider value={{ showAlert }}>
            { children }
            { alert.visible && (
                <div style={{ position: "fixed", bottom: "10px", left: "10px", zIndex: 1050 }}>
                    <Alert variant="primary" onClose={() => setAlert({ ...alert, visible: false })}>
                        { alert.message }
                    </Alert>
                </div>
            )}
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within AlertProvider")
    }
    return context
}