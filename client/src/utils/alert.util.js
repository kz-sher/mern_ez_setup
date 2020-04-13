import { extractLocation } from './general.util';

export const extractQueryInfoByKey = (options) => {    
    const { query: { k } } = extractLocation(); // k = key
    if(k) {
        for(let option of options){
            if(k === option.key){
                return option;
            }
        }
    }
    return {};
}