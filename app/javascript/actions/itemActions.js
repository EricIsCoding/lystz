import { csrf }from '../helpers/helpers';
import ItemNormalizer from '../helpers/normalizer/ItemNormalizer';

export const itemAddSuccess = (item) => {
    return {
        type: "ADD_ITEM_SUCCESS",
        item
    }
}

export function addItem(item) {
    return dispatch => {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrf
            },
            body: JSON.stringify(item),
          }
        return fetch('/api/items', options)
        .then(res => res.json())
        .then(json => {          
            dispatch(itemAddSuccess(ItemNormalizer(json.data)))
        })
    }
}