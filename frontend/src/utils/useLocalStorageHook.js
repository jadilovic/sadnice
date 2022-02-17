const useLocalStorageHook = () => {
	const saveSelectedProductId = (productId) => {
		localStorage.setItem('currentProductId', productId);
	};

	const saveSelectedUserId = (userId) => {
		localStorage.setItem('selectedUserId', userId);
	};

	return {
		saveSelectedProductId,
		saveSelectedUserId,
	};
};

export default useLocalStorageHook;
