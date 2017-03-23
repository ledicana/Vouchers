/**
 * Created by ALedic on 09/03/2017.
 */
export function handleFetch(response) {
    if(response.ok) {
        return response[response.status === 204 ? 'text' : 'json']();
    }
    else {
        throw new Error(response.statusText);
    }
}