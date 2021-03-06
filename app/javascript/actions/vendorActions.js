import { csrf }from '../helpers/helpers';
import FetchNormalizer from '../helpers/normalizer/FetchNormalizer'
import VendorNormalizer from '../helpers/normalizer/VendorNormalizer';

export const beginFetchVendors = () => ({
    type: "FETCH_VENDORS"
})

export const apiFetchSuccess = (data) => {
    return{
        type: "API_FETCH_SUCCESS",
        data
    }
}

export const addVendorSuccess = (vendor) => {
    return{
        type: "ADD_VENDOR_SUCCESS",
        vendor
    }
}

export function fetchVendors() {
    return dispatch => {
        dispatch(beginFetchVendors)
        return fetch('/api/vendors')
        .then(res => res.json())
        .then(json => {
            dispatch(apiFetchSuccess(FetchNormalizer(json)))
        })
    }
}

export function addVendor(vendor) {
    return dispatch => {
        let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrf
            },
            body: JSON.stringify(vendor),
          }
        return fetch('/api/vendors', options)
        .then(res => res.json())
        .then(json => {            
            dispatch(addVendorSuccess(VendorNormalizer(json.data)))
        })
    }
}