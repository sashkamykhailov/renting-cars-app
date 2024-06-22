// helps Android to warm up the browser when we want to sign in with
// significally improves android performance

import { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
    useEffect(() =>
    {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}