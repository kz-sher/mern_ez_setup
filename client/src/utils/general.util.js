import qs from 'qs';

export const capitalize = string => {
    return string.replace(/\b[a-zA-Z]/g, (match) => match.toUpperCase())
}

export const getFormattedDate = (date) => {
    const datetimeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    return new Date(Date.parse(date)).toLocaleDateString('en-US', datetimeOptions)
}

export const extractLocation = () => {
    const pathname = window.location.pathname;
    const search = window.location.search;
    const query = qs.parse(search, { ignoreQueryPrefix: true });
    return { pathname, query }
}

export const translateErrorToMsg = data => {
    if(data){
        if(data instanceof Object){
            return data;
        }
        else{
            return { header: data }
        }
    }
    else{
        return { header: '[E999] Error Occured' };
    }
}

export const scrollToPoint = point => {
    window.scroll({ top: point, left: 0, behavior: 'smooth' });
};

export const scrollToRef = ref => {
    return window.scroll({ top: ref.current.offsetTop, left: 0, behavior: 'smooth' });
}