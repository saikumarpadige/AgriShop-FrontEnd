import React, { useReducer, createContext, useState } from 'react'
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { reducer, initialState } from '../reducers/userReducer'

export const UserContext = createContext()
export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
});

const ApplyTheme = (OriginalComponent) => {
    const NewComponent = () => {

        const [state, dispatch] = useReducer(reducer, initialState)
        const [theme, setTheme] = useState('light');

        const toggleTheme = () => {
            const nextTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(nextTheme);
        };

        return (
            <>
                <IconRegistry icons={EvaIconsPack} />
                <UserContext.Provider value={{ state, dispatch }}>
                    <ThemeContext.Provider value={{ theme, toggleTheme }}>
                        <ApplicationProvider {...eva} theme={eva[theme]}>
                            <OriginalComponent />
                        </ApplicationProvider>
                    </ThemeContext.Provider>
                </UserContext.Provider>
            </>
        )
    }
    return NewComponent
}

export default ApplyTheme