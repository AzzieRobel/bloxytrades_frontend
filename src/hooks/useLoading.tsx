import { useContext } from 'react';

import { GlobalContext } from '../contexts/context';

const useLoading = () => {
    const { state, update }: any = useContext(GlobalContext);

    const setLoading = (isLoading: boolean) => {
        update({ isLoading });
    }

    return {
        isLoading: state.isLoading,

        setLoading,
    }
}

export default useLoading;