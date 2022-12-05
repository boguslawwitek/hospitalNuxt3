const useFetchApi = async (name, path) => {
    const config = useRuntimeConfig();
    return await useAsyncData(name, () =>
        $fetch(`${config.apiUrl}${path}`, { baseURL: '', server: false })
    )
}

export default useFetchApi;