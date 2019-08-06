export const setAppLoaded = () => ({
  type: 'APP_LOADED_SUCCESS'
});

export const setDeviceType = (device) => ({
  type: 'DEVICE_DETECT_SUCCESS',
  device
});

export const setItems = (items) => ({
  type: 'ITEMS_FETCH_SUCCESS',
  items
});
